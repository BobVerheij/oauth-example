/* eslint-disable camelcase */

import jwt from "jsonwebtoken";
import { serialize } from "cookie";

import type { NextApiRequest, NextApiResponse } from "next";
import { getGoogleOauthToken } from "../../../../utils/getGoogleOAuthToken";
import { getGoogleUser } from "../../../../utils/getGoogleUser";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "GET") {
    const code = req.query.code as string;

    const pathUrl = (req.query.state as string) || "/";

    if (!code) {
      return res.status(401).json({
        status: "fail",
        message: "Authorization code not provided!",
      });
    }

    const authResult = await getGoogleOauthToken({ code });

    if (authResult?.status !== "success") {
      return res.status(401).json({
        status: authResult.status,
        message: authResult.message,
      });
    }

    const { id_token, access_token } = authResult?.token;

    const userResult = await getGoogleUser({
      id_token,
      access_token,
    });

    if (userResult.status !== "success") {
      return res.status(401).json({
        status: "fail",
        message: userResult.message,
      });
    }

    const { verified_email } = userResult.user;

    if (!verified_email) {
      return res.status(401).json({
        status: "fail",
        message: "Google account not verified",
      });
    }

    // Expiry time in minutes -> See that the JWT will not validate in the front end after 10 minutes.
    // In other words, this will only create a session of 10 minutes in which the user can use its JWT token's info.

    const expiryTime = 10;

    // Usually, the JWT is signed with a secret key, that can be used to validate the JWT on the back end.
    // This is currently not within the scope of our project.
    // See: https://medium.com/jspoint/so-what-the-heck-is-jwt-or-json-web-token-dca8bcb719a6#:~:text=JWT%20is%20created%20with%20a,key%20stored%20on%20the%20server.

    const token = jwt.sign({ sub: { user: userResult.user } }, "TOKEN_SECRET", {
      expiresIn: `${expiryTime}m`,
    });

    // This is sadly the best way to send along a cookie with the response of the API call in NEXT API ROUTES:
    res.setHeader(
      "Set-Cookie",
      serialize("hum-example-google-oauth", token, {
        expires: new Date(Date.now() + expiryTime * 60 * 1000),
        path: "/",
      }),
    );

    // Redirects the client back to the Path URL passed as a parameter for the Google Auth call.
    return res.redirect(pathUrl);
  }
  return res.end();
};

export default handler;

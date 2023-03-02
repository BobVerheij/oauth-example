/* eslint-disable import/no-extraneous-dependencies */
import cookies from "js-cookie";
import { useEffect, useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";
import { GoogleUserResult } from "../utils/getGoogleUser";
import { Button } from "../components/button/Button";
import { ProfileCard } from "../components/profile/ProfileCard";
import { ScreenLayout } from "./Styles";

// Typing what is expected in the JWT token, extending existing JWTPayload type with the user in the 'sub'
type GoogleJWT = {
  sub: { user: GoogleUserResult };
} & JwtPayload;

export const ProfileScreen = () => {
  const [user, setUser] = useState<GoogleUserResult>();

  useEffect(() => {
    // Get the set cookie from authentication.
    const googleAuthToken = cookies.get("hum-example-google-oauth");

    // Decode the token with jwt.
    const userFromCookie = jwt.decode(googleAuthToken) as GoogleJWT;

    if (userFromCookie) {
      const { sub } = userFromCookie;

      if (userFromCookie) {
        setUser(sub.user);
      }
    }
  }, []);

  return (
    <ScreenLayout>
      {user ? <ProfileCard user={user} /> : null}
      {!user ? <Button label="Back to Log In" href="/" /> : null}
    </ScreenLayout>
  );
};

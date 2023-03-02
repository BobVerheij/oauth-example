import qs from "qs";

/* eslint-disable camelcase */

interface GoogleOauthToken {
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  scope: string;
}

export const getGoogleOauthToken = async ({
  code,
}: {
  code: string;
}): Promise<{ message?: string; status: string; token?: GoogleOauthToken }> => {
  const baseUrl = "https://oauth2.googleapis.com/token";

  const options = {
    code,
    client_id: process.env.NEXT_CLIENT_ID as string,
    client_secret: process.env.NEXT_CLIENT_SECRET as string,
    redirect_uri: process.env.NEXT_REDIRECT_URL,
    grant_type: "authorization_code",
  };

  const fetchedData = await fetch(baseUrl, {
    method: "POST",
    body: qs.stringify(options),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status.toString());
      }
      return response.json();
    })
    .catch((err) => err);

  if (fetchedData instanceof Error) {
    console.log("error fetching token", fetchedData.cause, fetchedData.message, fetchedData.name);
    return {
      message: fetchedData?.message,
      status: "failed",
    };
  }

  return {
    status: "success",
    token: fetchedData,
  };
};

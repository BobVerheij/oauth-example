interface Props {
  to?: string;
}
export const getGoogleURL = ({ to = "/" }: Props) => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

  const options = {
    // This is gathered from the .env files
    redirect_uri: process.env.NEXT_REDIRECT_URL as string,
    // This is gathered from the .env files
    client_id: process.env.NEXT_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      // here you can define more scopes (see https://console.cloud.google.com/apis/credentials/consent?project=hum-oauth-example)
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    state: to,
  };

  // This a build in tool from Node to create search paramaters neatly for a url.
  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};

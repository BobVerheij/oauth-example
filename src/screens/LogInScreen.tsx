import { Button } from "../components/button/Button";
import { getGoogleURL } from "../utils/getGoogleURL";
import { ScreenLayout } from "./Styles";

export const LogInScreen = () => {
  // Util that generates the google authentication URL to log in with, passing the relative path string for the redirect
  const googleAuthHref = getGoogleURL({ to: "/profile" });

  return (
    <>
      <ScreenLayout>
        <Button label="Google Auth" href={googleAuthHref} />
      </ScreenLayout>
    </>
  );
};

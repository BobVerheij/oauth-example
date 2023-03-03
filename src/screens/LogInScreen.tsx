import cookies from "js-cookie";
import { useRouter } from "next/router";
import { Button } from "../components/button/Button";
import { getGoogleURL } from "../utils/getGoogleURL";
import { ScreenLayout } from "./Styles";

export const LogInScreen = () => {
  // Util that generates the google authentication URL to log in with, passing the relative path string for the redirect
  const googleAuthHref = getGoogleURL({ to: "/profile" });
  const googleAuthToken = cookies.get("hum-example-google-oauth");

  const router = useRouter();

  const redirectToProfile = async () => {
    await router.push("/profile");
  };

  if (googleAuthToken) {
    redirectToProfile();
  }

  return (
    <>
      <ScreenLayout>
        <Button label="Sign in with Google" href={googleAuthHref}>
          <img src="images/google_logo.webp" alt="Google Logo" width={24} height={24} />
        </Button>
      </ScreenLayout>
    </>
  );
};

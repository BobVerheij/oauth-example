/* eslint-disable camelcase */
export interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export async function getGoogleUser({
  id_token,
  access_token,
}: {
  id_token: string;
  access_token: string;
}): Promise<{ message?: string; status: string; user?: GoogleUserResult }> {
  const fetchedResult = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
    {
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch((err) => err);

  if (fetchedResult instanceof Error) {
    return { message: fetchedResult.message, status: "failed" };
  }

  return { status: "success", user: fetchedResult };
}

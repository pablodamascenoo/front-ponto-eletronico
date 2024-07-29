import HandleSession from "@/components/HandleSession";
import { getSession } from "@auth0/nextjs-auth0";
import User from "../../../@types/user";
import UserContextProvider from "@/context/UserContext";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/users/" + session?.user.sub
  );

  let user = response.status === 200 ? ((await response.json()) as User) : null;

  if (!session) {
    return;
  }

  return (
    <UserContextProvider>
      <HandleSession
        noSession={!session}
        user={user}
        userStatus={response.status}
      />
      {children}
    </UserContextProvider>
  );
}

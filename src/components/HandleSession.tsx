"use client";

import { Session } from "@auth0/nextjs-auth0";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import User from "../../@types/user";
import { UserContext } from "@/context/UserContext";

type Props = {
  noSession: boolean;
  user: User | null | undefined;
  userStatus: number;
};

export default function HandleSession({ noSession, user, userStatus }: Props) {
  console.log("teste");
  const { setUserJob, setUserTagId } = useContext(UserContext);
  const router = useRouter();

  if (noSession) router.push("/api/auth/login");
  else if (!user && userStatus && userStatus === 404) router.push("/cadastro");
  else if (!user && !userStatus) router.push("/error");

  if (user) {
    setUserJob(user.job);
    setUserTagId(user.tagId);
  }

  return <></>;
}

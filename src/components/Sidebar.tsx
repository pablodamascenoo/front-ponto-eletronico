"use client";
import { UserContext } from "@/context/UserContext";
/* eslint-disable @next/next/no-img-element */
import { useUser } from "@auth0/nextjs-auth0/client";
import { Clock, LogOut, Settings, UserRound, UsersRound } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";

export default function Sidebar() {
  const { userJob } = useContext(UserContext);
  const { user } = useUser();
  const path = usePathname();

  return (
    <aside className="w-64 h-full border-r-2 border-tertiary-color bg-secondary-color fixed left-0 top-0 bottom-0 p-2 flex-col flex gap-5">
      <div className="flex gap-4 items-center py-4 border-b-2 border-tertiary-color">
        {user ? (
          <img
            src={user.picture as string}
            alt="profile picture"
            className="rounded-full w-14 h-14"
          />
        ) : (
          <div className="rounded-full w-14 h-14 bg-gray-500"></div>
        )}
        {user ? (
          <div>
            <h2 className="text-white text-lg">{user?.nickname as string}</h2>
            <p className="text-gray-400 text-sm">{userJob}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="h-4 rounded-sm w-32 bg-gray-500"></div>
            <div className="h-4 rounded-sm w-20 bg-gray-500"></div>
          </div>
        )}
      </div>
      <div className="flex-1">
        <ul className="flex-col gap-4 flex pt-2 text-white">
          <li
            className={`hover:bg-purple p-2 rounded-md duration-200 ${
              path === "/" && "bg-purple"
            }`}
          >
            <a className="flex gap-4">
              <UserRound />
              Meu perfil
            </a>
          </li>
          <li
            className={`hover:bg-purple p-2 rounded-md duration-200 ${
              path === "/profile" && "bg-purple"
            }`}
          >
            <a className="flex gap-4">
              <Clock /> Meu ponto
            </a>
          </li>
          <li
            className={`hover:bg-purple p-2 rounded-md duration-200 ${
              path === "/team" && "bg-purple"
            }`}
          >
            <a className="flex gap-4">
              <UsersRound /> Minha equipe
            </a>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4 text-white py-4 pt-6 border-t-2 border-tertiary-color">
        <a
          className="flex gap-2 hover:bg-purple p-2 rounded-md"
          href="/api/auth/logout"
        >
          <LogOut />
          Sair
        </a>
      </div>
    </aside>
  );
}

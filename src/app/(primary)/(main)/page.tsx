/* eslint-disable @next/next/no-img-element */
import { getSession, Session } from "@auth0/nextjs-auth0";
import User from "../../../../@types/user";
import { Clock, LogOut, UserRound } from "lucide-react";

export default async function Home() {
  const session = (await getSession()) as Session;
  const authUser = session?.user;
  const userRequest = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/users/" + authUser.sub
  );
  const user = (await userRequest.json()) as User;

  return (
    <main className="bg-primary-color flex min-h-screen flex-col items-center justify-between p-24 text-white">
      <div className="w-full">
        <h2 className="text-4xl font-semibold mb-4">Meu perfil</h2>
        <div className="flex gap-5 w-full">
          <div className="bg-secondary-color w-full max-w-[600px] rounded-md h-[400px]">
            <div className="flex flex-col justify-center items-center p-4 gap-1 border-b-2 border-tertiary-color">
              <img
                src={authUser.picture}
                alt="Profile picture"
                className="rounded-full mb-2"
              />
              <p>{authUser.email}</p>
              <p className="text-gray-400">
                Carga horária estipulada: {user.workload} horas
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 p-8">
              <div className="flex gap-2 flex-col items-start">
                <div className="flex gap-4 items-center justify-center ml-1">
                  <div className="w-4 h-4 rounded-full bg-red-600" />
                  Expediente encerrado
                </div>
                <div className="flex gap-4 items-center justify-center">
                  <UserRound size={20} />
                  {user.job}
                </div>
                <div className="flex gap-4 items-center justify-center">
                  <LogOut size={20} />
                  {user.email}
                </div>
              </div>
              <div className="bg-purple rounded-md flex justify-center items-center gap-3">
                <Clock size={50} />
                <div>
                  <small className="text-sm">Saldo banco de horas</small>
                  <p className="text-3xl font-bold">04:43</p>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </main>
  );
}

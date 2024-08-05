/* eslint-disable @next/next/no-img-element */
import { getSession, Session } from "@auth0/nextjs-auth0";
import User from "../../../../@types/user";
import { Clock, LogIn, LogOut, UserRound } from "lucide-react";
import point from "../../../../@types/point";
import dayjs from "dayjs";

export default async function Home() {
  const session = (await getSession()) as Session;
  const authUser = session?.user;
  const userRequest = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/users/" + authUser.sub
  );
  const user = (await userRequest.json()) as User;

  const pointsRequest = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/getUserTodayPoint/" + user.id
  );

  const points = (await pointsRequest.json()) as point[];

  return (
    <main className="bg-primary-color flex min-h-screen flex-col items-center justify-between p-24 pb-0 text-white">
      <div className="w-full">
        <h2 className="text-4xl font-semibold mb-4">Meu perfil</h2>
        <div className="flex gap-5 w-full flex-col justify-center items-start">
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
                {/* <div className="flex gap-4 items-center justify-center ml-1">
                  <div className="w-4 h-4 rounded-full bg-red-600" />
                  Expediente encerrado
                </div> */}
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
          <div className="bg-secondary-color w-full max-w-[600px] rounded-md h-[400px] p-4">
            <h2 className="text-2xl font-bold text-center">Pontos do dia</h2>
            {points.length > 0 ? (
              <div className="overflow-x-scroll w-full my-8 flex justify-start items-center">
                <div className="flex gap-4 w-fit">
                  {points.map((point) => {
                    return (
                      <div
                        key={point.id}
                        className={`h-20 w-32 border-2 ${
                          point.type === "entrada" && "border-purple"
                        } rounded-md p-1 flex flex-col justify-center items-center`}
                      >
                        <div
                          className={`flex gap-1 font-bold text-lg ${
                            point.type === "entrada" && "text-purple"
                          }`}
                        >
                          {point.type === "entrada" ? <LogIn /> : <LogOut />}
                          {dayjs(point.date).format("HH:mm")}
                        </div>
                        {point.type === "entrada" ? "Entrada" : "Saída"}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <p className="text-2xl text-gray-400">
                  Nenhum ponto registrado
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

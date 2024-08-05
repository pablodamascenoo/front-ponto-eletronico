"use client";

import React, { useEffect } from "react";
import User from "../../../../@types/user";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { CircleCheckBig, CircleX, RotateCcw } from "lucide-react";

export default function RegisterPage() {
  const [job, setJob] = React.useState("");
  const [workload, setWorkload] = React.useState(4);
  // const [tagId, setTagId] = React.useState("");
  const [secondPage, setSecondPage] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/api/auth/login");
    }
  }, [isLoading]);

  function handleRegisterInfo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSecondPage(true);
  }

  async function createUser() {
    setSuccess(false);
    setError(false);
    try {
      const tagResponse = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/tag",
        { mode: "cors", method: "GET" }
      );

      if (!tagResponse || !tagResponse.ok) {
        setError(true);
        return;
      }

      const tagData = (await tagResponse.json()) as { id: number };

      let strId = tagData.id.toString();

      const userData: User = {
        email: user?.email as string,
        id: user?.sub as string,
        job,
        workload,
        tagId: strId,
      };

      const responseUser = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!responseUser.ok) {
        setError(true);
        return;
      }

      setSuccess(true);
      window.location.href = "/";
    } catch (e) {
      setError(true);
      return;
    }
  }

  useEffect(() => {
    if (secondPage) {
      createUser();
    }
  }, [secondPage]);

  return (
    <main className="bg-primary-color flex min-h-screen flex-col items-center justify-center p-24 text-white">
      <header className="h-10 w-full absolute top-0 flex justify-end px-10 border-b-tertiary-color border-b-2">
        <a href="/api/auth/logout" className="p-2">
          Sair
        </a>
      </header>
      {!secondPage ? (
        <>
          <div className="text-center space-y-4 my-10">
            <h1 className="text-5xl font-bold">Seja bem vindo!</h1>
            <p className="text-gray-400">
              Por favor, preencha o formulário abaixo para terminar o seu
              cadastro.
            </p>
          </div>
          <form
            onSubmit={handleRegisterInfo}
            className="flex flex-col w-[450px] p-10 rounded-md bg-secondary-color gap-4"
          >
            <h2 className="text-2xl font-bold">Informações Cadastrais</h2>
            <div className="flex flex-col gap-1">
              <label htmlFor="job">Profissão</label>
              <input
                value={job}
                onChange={(event) => setJob(event.target.value)}
                className="bg-primary-color h-10 rounded-sm pl-2"
                type="text"
                id="job"
                placeholder="Ex: Desenvolvedor"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="tagId">Carga horária diária</label>
              <input
                value={workload}
                onChange={(event) => setWorkload(Number(event.target.value))}
                className="bg-primary-color h-10 rounded-sm pl-2"
                type="number"
                id="tagId"
                min={4}
                max={8}
                required
                placeholder="Min: 4h, Max: 8h"
              />
            </div>
            <button type="submit" className="rounded-md bg-purple h-10 mt-6">
              Continuar
            </button>
          </form>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center gap-10">
          {!error && !success ? (
            <>
              <h1 className="text-4xl font-bold">
                Aproxime sua tag para cadastrá-la
              </h1>
              <img src="/puff.svg" className="h-60 w-60" />
              <small className="text-sm text-gray-400/50">
                Esperando leitura da tag...
              </small>
            </>
          ) : error ? (
            <>
              <h1 className="text-4xl font-bold">
                Ocorreu um erro ao cadastrar sua tag
              </h1>
              <CircleX size={200} />
              <button
                onClick={createUser}
                className="h-14 rounded-md bg-purple flex items-center p-2 px-4 gap-4 font-bold hover:bg-purple/80 duration-200"
              >
                {" "}
                Tentar novamente <RotateCcw />
              </button>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold">
                Tag cadastrada com sucesso!
              </h1>
              <CircleCheckBig size={200} />
              <a
                href="/"
                onClick={createUser}
                className="h-14 rounded-md bg-purple flex items-center p-2 px-4 gap-4 font-bold hover:bg-purple/80 duration-200 cursor-pointer justify-center"
              >
                {" "}
                Ir para a home
              </a>
            </>
          )}
        </div>
      )}
    </main>
  );
}

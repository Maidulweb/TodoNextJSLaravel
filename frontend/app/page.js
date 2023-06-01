import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <div className="container mx-auto w-11/12 flex items-center justify-center h-screen">
        <Link
          className="text-4xl font-extrabold underline text-blue-500"
          href="/todo"
        >
          Todo
        </Link>
      </div>
    </>
  );
}

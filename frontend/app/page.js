import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto w-11/12 flex items-center justify-center h-screen">
      <Link
        className="text-4xl font-extrabold underline text-blue-500"
        href="/todo"
      >
        Todo
      </Link>
    </div>
  );
}

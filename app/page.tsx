"use client";
import { useRouter } from "next/navigation";
export default function Home() {
  const Router = useRouter();
  return (
    <main className="flex items-center justify-center h-screen">
      <button
        onClick={() => Router.push("/dashboard")}
        className="bg-violet-500 rounded-2xl p-2 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700"
      >
        Get Started
      </button>
    </main>
  );
}

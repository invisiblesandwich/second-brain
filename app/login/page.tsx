"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/auth/login", form);

      router.push("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col p-6 items-center border w-full max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="flex items-center flex-col space-y-4 rounded-lg p-6 shadow w-full"
        >
          <h1 className="text-3xl font-bold">Login</h1>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
          <button
            className="w-full rounded bg-black p-2 text-white"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <span>Don't have an account yet? </span>
          <button
            onClick={() => router.push("/register")}
            className="text-blue-500"
          >
            register
          </button>
        </div>
      </div>
    </main>
  );
}

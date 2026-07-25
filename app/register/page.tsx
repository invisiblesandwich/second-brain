"use client";

import api from "@/lib/axios";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
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
      await api.post("/auth/register", form);

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
          <h1 className="text-3xl font-bold">Register</h1>
          <input
            type="name"
            name="name"
            placeholder="name"
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
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
            Register
          </button>
        </form>
        <div className="mt-4">
          <span>I have an account ! </span>
          <button
            onClick={() => router.push("/login")}
            className="text-blue-500"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}

import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function handleLogin(ev) {
    ev.preventDefault();

    // console.log(email, password);

    try {
      const response = await fetch("https://pdf-editor-bcknd.onrender.com/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        alert("Login successfull");
        setRedirect(true);
      } else {
        console.error("Error during login", error);
        alert("wrong credentials . Try again");
      }
    } catch (error) {
      console.error("Error during login", error);
      alert("An error occurred during login. Please try again.");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-5 items-center w-full"
    >
      <h1 className="font-bold text-xl">PDF EDITOR</h1>
      <p className="font-semibold text-md text-gray-600">
        Login to get started
      </p>

      <input
        className="px-3 py-1 rounded-lg text-sm w-full"
        type="email"
        placeholder="email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />

      <input
        className="px-3 py-1 rounded-lg text-sm w-full"
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />

      <button
        className="bg-black text-white px-4 py-2 rounded-xl w-full font-bold text-sm hover:text-black hover:bg-gray-400"
        type="onSubmit"
      >
        Login
      </button>
      <div className="flex gap-2">
        <p className="text-sm">Create a new account</p>
        <Link className="text-blue-400 font-bold text-sm" to="/register">
          Register
        </Link>
      </div>
    </form>
  );
}

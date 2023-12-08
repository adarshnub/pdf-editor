import React, { useState } from "react";
import {Link} from "react-router-dom";

export default function RegisterFormm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function register(ev) {
    ev.preventDefault();
    console.log(username, email, password);

    const response = await fetch("https://pdf-editor-bcknd.onrender.com/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("Sign Up successfull");
    } else {
      alert("Sign Up failer . Try again");
    }
  }

  return (
    <form
      onSubmit={register}
      className="flex flex-col gap-5 items-center w-full"
    >
      <h1 className="font-bold text-xl">PDF EDITOR</h1>
      <p className="font-semibold text-md text-gray-600">
        Regiter to get started
      </p>
      <input
        className="px-3 py-1 rounded-lg text-sm w-full"
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />

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
        className="bg-black text-white px-4 py-1 rounded-xl w-full font-bold text-sm hover:text-black hover:bg-gray-400"
        type="onSubmit"
      >
        Sign Up
      </button>

      <div className="flex gap-2">
          <p className="text-sm">Already have an account</p>
          <Link 
          className="text-blue-400 font-bold text-sm"
          to="/login">Login</Link>
        </div>
    </form>
  );
}

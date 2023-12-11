import React, { useState } from "react";
import {Link, Navigate} from "react-router-dom";

export default function RegisterFormm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const isValidEmail = (value) => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isValidPassword = (value) => {
    
    return value.length >= 8;
   
  };

  const isValidUsername = (value) => {
   
    return value.trim() !== "";
  };

  const validateForm = () => {
    let isValid = true;
    if (!isValidUsername(username)) {
      setUsernameError("Please enter a valid username.");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!isValidPassword(password)) {
      setPasswordError("Please enter a valid password (at least 8 characters).");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };

  async function register(ev) {
    ev.preventDefault();
    // console.log(username, email, password);

    if (!validateForm()) {
      alert("Please enter valid information in all fields.");
      return;
    }


    setLoading(true);

    try {
      const response = await fetch("https://pdf-editor-bcknd.onrender.com/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setRedirect(true);
        alert("Sign Up successful");
      } else {
        alert("Sign Up failed. Try again");
      }
    } catch (error) {
      console.error("Error during registration", error);
      alert("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
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
      {usernameError && <p className="text-red-500 text-xs">{usernameError}</p>}

      <input
        className="px-3 py-1 rounded-lg text-sm w-full"
        type="email"
        placeholder="email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      {emailError && <p className="text-red-500 text-xs">{emailError}</p>}

      <input
        className="px-3 py-1 rounded-lg text-sm w-full"
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}

      <button
        className="bg-black text-white px-4 py-1 rounded-xl w-full font-bold text-sm hover:text-black hover:bg-gray-400"
        type="submit"
        disabled={loading}      
      >
        {loading ? "Signing Up..." : "Sign Up"}
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

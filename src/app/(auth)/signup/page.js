"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { showLoadingAlert, showToast } from "@/app/components/alerts";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Button on submit
  const handleSignup = async (e) => {
    e.preventDefault();

    // Show alert process
    showLoadingAlert();

    // Fetch API Register
    try {
      const res = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      // Close alert process
      Swal.close();
      // Show alert success
      showToast({
        icon: "success",
        title: result.message,
      }).then(() => {
        router.push("/login");
      });
    } catch (error) {
      // Close alert process
      Swal.close();

      const errorStatus =
        error.status === "error" ? "Error" : "Register Failed!";

      // Show alert success
      Swal.fire({
        title: errorStatus,
        text: error.message,
        icon: "error",
      });
    }

    // Reset form
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="w-full h-full flex flex-col px-8 py-4">
        <div className="w-full text-center h-1/3 pt-4">
          <h1
            id="form-title"
            className="font-heading text-3xl font-bold text-secondary"
          >
            Sign Up
          </h1>
          <p id="form-desc" className="font-semibold text-base text-black my-2">
            Create your new account
          </p>
        </div>

        <form
          onSubmit={handleSignup}
          className="mt-6 w-full min-h-[3/4] mx-auto "
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="username"
              id="username"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label
              htmlFor="username"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Username
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 bottom-2 text-slate-800"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <button
            type="submit"
            className="text-white bg-secondary hover:bg-secondaryHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm w-full px-5 py-2.5 text-center mt-4"
          >
            Sign Up
          </button>
          <div className="flex flex-row gap-2 justify-center my-4">
            <p className="text-slate-800">Already have an account?</p>
            <Link
              href="/login"
              className="font-semibold text-red-600 hover:underline"
            >
              Login now
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

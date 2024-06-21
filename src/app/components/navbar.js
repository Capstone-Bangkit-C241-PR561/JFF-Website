"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { showToast } from "./alerts";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [profileImg, setProfileImg] = useState("/default-profile.jpg");
  const router = useRouter();
  const dropdownRef = useRef(null);

  // Get user data
  useEffect(() => {
    const uid = localStorage.getItem("uid");

    const getUserData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/users/${uid}`);
        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }

        console.log(result);
        setUserData(result.data);

        if (result.data.profileImg) {
          setProfileImg(result.data.profileImg);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (uid) {
      getUserData();
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sign out user
  const signOut = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/signout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }

      // Clear localStorage and redirect to login
      localStorage.removeItem("uid");
      localStorage.setItem("isLogin", "false");
      await showToast({
        icon: "success",
        title: result.message,
      });

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="relative bg-secondary border-gray-200 shadow-bottom">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="/jff-logo.png"
            width={40}
            height={40}
            alt="JogjaFood Finder Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            JogjaFood Finder
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-secondary "
            id="user-menu-button"
            aria-expanded={isDropdownOpen ? "true" : "false"}
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <Image
              width={32}
              height={32}
              className="rounded-full"
              src={profileImg}
              alt="user photo"
            />
          </button>

          <div
            className={`z-50 top-14 right-12 ${
              isDropdownOpen ? "absolute" : "hidden"
            } shadow-lg my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg  dark:divide-gray-600`}
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              {userData ? (
                <>
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {userData.username}
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    {userData.email}
                  </span>
                </>
              ) : (
                <span>Loading...</span>
              )}
            </div>
            <ul className="p-4" aria-labelledby="user-menu-button">
              <li>
                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Profile
                </a>
              </li>
              <li>
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  cursor-pointer"
                  onClick={signOut}
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

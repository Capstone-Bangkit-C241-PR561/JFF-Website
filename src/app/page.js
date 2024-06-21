"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/navbar";
import { FaPlusMinus } from "react-icons/fa6";
import { showLoadingAlert } from "./components/alerts";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Home() {
  // Check user isLogin
  const [isChecking, setIsChecking] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    const uid = localStorage.getItem("uid");

    if ((!isLogin || isLogin === "false") && (!uid || uid === "")) {
      router.push("/login");
    } else {
      setIsChecking(false);
    }
  }, [router]);

  useEffect(() => {
    // Get best restaurants
    const getBestRestaurants = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/restaurants/best`);
        const result = await res.json();
        console.log(result);

        const { data } = result;
        console.log(data);

        const bestRestaurants = data.sort((a, b) => b.rating - a.rating);
        console.log(bestRestaurants);

        setRestaurants(bestRestaurants);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };

    getBestRestaurants();
  }, []);

  if (isChecking) {
    return null;
  }

  return (
    <>
      <Navbar />;
      <main className="py-6 px-8 w-full min-h-screen">
        <Link
          href="/restaurants"
          type="button"
          className="block py-6 px-8 text-2xl w-full font-bold font-heading text-white bg-primary hover:bg-primaryHover focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-center"
        >
          Find Restaurant
        </Link>

        <h2 className="font-heading font-bold text-2xl text-black my-6">
          Best Restaurants
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {restaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              href={`/restaurants/${restaurant.id}`}
              className="flex items-center space-x-4 bg-paleBlue p-4 rounded-lg shadow-md hover:border hover:border-secondary"
            >
              <Image
                src="/default-restaurant.png"
                alt={restaurant.name}
                width={64}
                height={64}
                className="rounded-lg"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-lg text-gray-800">
                  {restaurant.name}
                </span>
                <span className="text-sm text-gray-600">
                  {restaurant.foodVariety}
                </span>
                <span className="text-sm text-gray-600">
                  {restaurant.diningType}
                </span>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">
                    {restaurant.rating}
                  </span>
                  <svg
                    className="w-4 h-4 text-yellow-500 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.3 3.993a1 1 0 00.95.69h4.2c.969 0 1.371 1.24.588 1.81l-3.4 2.49a1 1 0 00-.364 1.118l1.3 3.993c.3.921-.755 1.688-1.54 1.118l-3.4-2.49a1 1 0 00-1.176 0l-3.4 2.49c-.785.57-1.84-.197-1.54-1.118l1.3-3.993a1 1 0 00-.364-1.118l-3.4-2.49c-.783-.57-.381-1.81.588-1.81h4.2a1 1 0 00.95-.69l1.3-3.993z" />
                  </svg>
                </div>
                <div className="flex items-center text-base font-semibold text-gray-800">
                  <FaPlusMinus className="mr-1" />
                  {restaurant.avgPrice}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

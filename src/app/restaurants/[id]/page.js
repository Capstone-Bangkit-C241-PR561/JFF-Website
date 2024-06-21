"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "../../components/navbar";
import Swal from "sweetalert2";
import { showLoadingAlert, showToast } from "@/app/components/alerts";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function RestaurantDetailPage() {
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  const getRestaurantDetails = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/restaurants/${id}`);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setRestaurant(result.data);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to fetch restaurant details, please try again",
        icon: "error",
      });
      router.push("/restaurants");
    } finally {
      setIsLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    const uid = localStorage.getItem("uid");

    if ((!isLogin || isLogin === "false") && (!uid || uid === "")) {
      router.push("/login");
    } else {
      getRestaurantDetails();
    }
  }, [router, getRestaurantDetails]);

  if (isLoading) {
    return showLoadingAlert();
  }

  Swal.close();

  if (!restaurant) {
    return showToast({
      title: "No restaurant details available",
      icon: "error",
    });
  }

  const openMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <Navbar />
      <main className="bg-secondary py-6 px-8 w-full min-h-screen flex flex-col items-center">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-secondary mb-4">
            {restaurant.name}
          </h2>

          <div className="flex justify-center mb-6">
            <Image
              src="/default-restaurant.png"
              alt={restaurant.name}
              width={256}
              height={256}
              className="rounded-lg"
            />
          </div>

          <div className="text-center mb-6">
            <div className="flex justify-center">
              <div className="text-left">
                <div className="flex mb-2">
                  <span className="font-bold text-secondary w-40">
                    Cuisine Type
                  </span>
                  <span className="mx-2">:</span>
                  <span className="text-gray-600">
                    {restaurant.foodPreference}
                  </span>
                </div>

                <div className="flex mb-2">
                  <span className="font-bold text-secondary w-40">
                    Food Variety
                  </span>
                  <span className="mx-2">:</span>
                  <span className="text-gray-600">
                    {restaurant.foodVariety}
                  </span>
                </div>

                <div className="flex mb-2">
                  <span className="font-bold text-secondary w-40">
                    Dining Style
                  </span>
                  <span className="mx-2">:</span>
                  <span className="text-gray-600">{restaurant.diningType}</span>
                </div>

                <div className="flex mb-2">
                  <span className="font-bold text-secondary w-40">
                    Atmosphere
                  </span>
                  <span className="mx-2">:</span>
                  <span className="text-gray-600">
                    {restaurant.atmosphereType}
                  </span>
                </div>

                <div className="flex mb-2">
                  <span className="font-bold text-secondary w-40">Rating</span>
                  <span className="mx-2">:</span>
                  <span className="text-gray-600">{restaurant.rating}</span>
                </div>

                <div className="flex mb-2">
                  <span className="font-bold text-secondary w-40">
                    Kisaran Harga
                  </span>
                  <span className="mx-2">:</span>
                  <span className="text-gray-600">{restaurant.avgPrice}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={openMap}
              className="text-white bg-primary hover:bg-primaryHover focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-12 py-2 w-full"
            >
              Map
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

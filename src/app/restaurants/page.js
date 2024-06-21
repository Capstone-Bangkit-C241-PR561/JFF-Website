"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";
import { FaPlusMinus } from "react-icons/fa6";
import { showLoadingAlert, showToast } from "../components/alerts";
import Swal from "sweetalert2";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function RestaurantsPage() {
  const [isChecking, setIsChecking] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [price, setPrice] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Jumlah item per halaman
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation: ", error);
        }
      );
    }
  }, []);

  if (isChecking) {
    return null;
  }

  const handleRecommendation = async (e) => {
    e.preventDefault();
    showLoadingAlert();

    setIsFormSubmitted(true);

    try {
      const res = await fetch(`${API_BASE_URL}/recommendation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price, latitude, longitude }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      const { data } = result;
      console.log(data);
      setRestaurants(data);
      showToast({
        icon: "success",
        title: result.message,
      });
    } catch (error) {
      Swal.close();
      Swal.fire({
        title: "Error",
        text: "Recommendations error, please try again",
        icon: "error",
      });
    }

    setPrice("");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = restaurants.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(restaurants.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Navbar />
      <main className="py-6 px-8 w-full min-h-screen">
        <form onSubmit={handleRecommendation}>
          <label
            htmlFor="price"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Budget
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="number"
              name="price"
              id="price"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primaryHover outline-none"
              placeholder="Type your preference budget (ex. 30000)"
              value={price}
              onChange={(e) => setPrice(+e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-primary hover:bg-primaryHover focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-12 py-2"
            >
              Search
            </button>
          </div>
        </form>

        <h2 className="font-heading font-bold text-2xl text-black my-6">
          Recommendations
        </h2>

        {isFormSubmitted ? (
          currentItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {currentItems.map((restaurant) => (
                <Link
                  key={restaurant.id}
                  href={`/restaurants/${restaurant.id}`}
                  className="relative flex items-center space-x-4 bg-paleBlue p-4 rounded-lg shadow-md hover:border hover:border-secondary"
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
                  <div className="absolute top-2 right-2 bg-primary rounded-full px-3 py-2 text-xs font-semibold text-white">
                    {restaurant.distance} km
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-primaryHover text-center">
              No recommendations available.
            </div>
          )
        ) : (
          <div className="text-primaryHover text-center">
            Please submit your budget to see recommendations.
          </div>
        )}

        {restaurants.length > 0 && (
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`text-white bg-secondary hover:bg-secondaryHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`text-white bg-secondary hover:bg-secondaryHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </>
  );
}

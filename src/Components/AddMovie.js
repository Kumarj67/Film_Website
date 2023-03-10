import React, { useState, useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";

import { MoviesRef } from "../FireBase/Firebase";
import swal from "sweetalert";
import { AppState } from "../App";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const useAppState = useContext(AppState);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Name: "",
    Year: "",
    Description: "",
    Image: "",
    rating: 0,
    rated: 0,
  });
  const [loading, setLoading] = useState(false);
  const addMovies = async () => {
    try {
      if (useAppState.login) {
        setLoading(true);
        await addDoc(MoviesRef, form);
        swal({
          Name: "Successfully Added",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setForm({
          Name: "",
          Year: "",
          Description: "",
          Image: "",
        });
      } else {
        navigate("/login");
      }
      setLoading(false);
    } catch (err) {
      swal({
        Name: err,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
  };

  return (
    <div>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-8 mx-auto">
          <div class="flex flex-col text-center w-full mb-4">
            <h1 class="sm:text-2xl text-2xl font-medium title-font mb-4 text-white">
              Add Movie
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-300">
                    Title
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.Name}
                    onChange={(e) => setForm({ ...form, Name: e.target.value })}
                    class="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-gray-300">
                    Year
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.Year}
                    onChange={(e) => setForm({ ...form, Year: e.target.value })}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-300">
                    Image Link
                  </label>
                  <input
                    id="message"
                    name="message"
                    value={form.Image}
                    onChange={(e) =>
                      setForm({ ...form, Image: e.target.value })
                    }
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-300">
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.Description}
                    onChange={(e) =>
                      setForm({ ...form, Description: e.target.value })
                    }
                    class="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button
                  onClick={addMovies}
                  class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
                >
                  {loading ? <TailSpin height={25} color="white" /> : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddMovie;

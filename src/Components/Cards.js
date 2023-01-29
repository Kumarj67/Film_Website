import React from "react";
import ReactStars from "react-stars";
import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { getDocs } from "firebase/firestore";
import { MoviesRef } from "../FireBase/Firebase";
import { Link } from "react-router-dom";
const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const _data = await getDocs(MoviesRef);
      _data.forEach((doc) => {
        setData((prev) => [...prev, { ...doc.data(), id: doc.id }]);

        setLoading(false);
      });
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap  px-3 mt-2">
      {loading ? (
        <div className="flex w-full  justify-center items-center h-96">
          <ThreeDots height={40} color="white" />
        </div>
      ) : (
        data.map((e, i) => {
          return (
            <Link to={`/Details/${e.id}`}>
              <div
                key={i}
                className="card font-medium hover:-translate-y-4 cursor-pointer p-2 transition duration-500 shadow-lg mt-6"
              >
                <img className="h-60 md:h-72" src={e.Image} alt="Adipurush" />
                <h1>
                  <span className="text-gray-500"></span>
                  {e.Name}
                </h1>
                <h1 className="flex mr-2 items-center">
                  <span className="text-gray-500">Rating:</span>

                  <ReactStars
                    count={5}
                    edit={false}
                    value={e.rating / e.rated}
                    half={true}
                    size={24}
                    color2={"#ffd700"}
                  />
                </h1>
                <h1>
                  <span className="text-gray-500">Year:</span>
                  {e.Year}
                </h1>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Cards;

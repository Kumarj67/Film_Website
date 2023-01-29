import React from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoc } from "firebase/firestore";
// import { MoviesRef } from "../FireBase/Firebase";
import { doc } from "firebase/firestore";
import { db } from "../FireBase/Firebase";
import { ThreeCircles } from "react-loader-spinner";
import Review from "./Review";

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    Name: "",
    Year: "",
    Image: "",
    Description: "",
    rating: 0,
    rated: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db, "Movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center">
      {loading ? (
        <div className="h-96 flex w-full justify-center items-center">
          <ThreeCircles height={30} color="white" />
        </div>
      ) : (
        <>
          <img
            className="h-96 block md:sticky top-24"
            src={data.Image}
            alt=""
          />

          <div className="md:ml-4 ml-0 w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-400">
              {data.Name} <span className="text-xl">({data.Year})</span>
            </h1>

            <ReactStars
              size={20}
              half={true}
              value={data.rating / data.rated}
              edit={false}
            />

            <p className="mt-2">{data.Description}</p>

            <Review id={id} prevRating={data.rating} userRated={data.rated} />
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;

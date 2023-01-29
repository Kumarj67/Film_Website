import React, { useEffect } from "react";
import ReactStars from "react-stars";
import { useState } from "react";
import { reviewsRef, db } from "../FireBase/Firebase";
import {
  addDoc,
  doc,
  updateDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
const Review = ({ id, prevRating, userRated }) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState("");
  const [data, setData] = useState();
  const [reviewLoading, setreviewLoading] = useState(true);

  const sendReviews = async () => {
    setLoading(true);

    try {
      await addDoc(reviewsRef, {
        movieId: id,
        reviewer: "Jeetesh",
        rating: rating,
        thoughts: form,
        timestamp: new Date().getTime(),
      });
      const ref = doc(db, "Movies", id);
      await updateDoc(ref, {
        rating: prevRating + rating,
        rated: userRated + 1,
      });

      swal({
        Name: "Review Done",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
      setRating(0);
      setForm("");
    } catch (err) {
      swal({
        Name: err.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    async function getData() {
      setreviewLoading(true);
      let quer = query(reviewsRef, where("movieId", "==", id));
      const querySnapshot = await getDocs(quer);
      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });

      setreviewLoading(false);
    }
    getData();
  });

  return (
    <div className="mt-4 border-t-2 border-gray-700 w-full">
      <ReactStars
        half={true}
        size={24}
        onChange={(rate) => setRating(rate)}
        value={rating}
      />
      <input
        value={form}
        onChange={(e) => setForm(e.target.value)}
        type="text"
        placeholder="Enter your thoughts"
        className="w-full p-2 outline-none header"
        required
      />
      <button
        onClick={sendReviews}
        className="bg-green-600 w-full p-2 flex justify-center"
      >
        {loading ? <TailSpin height={25} color="white" /> : "Share"}
      </button>
      {reviewLoading ? (
        <div className="mt-6 flex justify-center ">
          <ThreeDots height={10} color="white" />
        </div>
      ) : (
        <div className="mt-4">
          {data.map((e, i) => {
            return (
              <div
                className="bg-gray-500 p-2 w-full border-b border-gray-400 mt-2"
                key={i}
              >
                <div className="flex item-center">
                  <p className="text-blue-500 ">{e.reviewer}</p>
                  <p className="text-xs ml-3">
                    {new Date(e.timestamp).toLocaleString()}
                  </p>
                </div>
                size={15}
                half={true}
                value={e.rating}
                edit={false}
                color2={"#ffd700"}
                {e.thoughts}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Review;

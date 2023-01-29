import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AppState } from "../App";

const Header = () => {
  const useAppstate = useContext(AppState);

  return (
    <div className="sticky text-3xl top-0 z-10 header text-red-500 flex justify-between items-center font-bold p-3 border-b-2 border-gray-50">
      <Link to="/">
        <span>
          Film
          <span className="text-white">Website</span>
        </span>
      </Link>
      {useAppstate.login ? (
        <Link to="/AddMovies">
          <h1 className="text-lg  flex items-center cursor-pointer ">
            <Button>
              <AddIcon className="mr-1" color="secondary" />{" "}
              <span className="text-white">Add New</span>
            </Button>
          </h1>
        </Link>
      ) : (
        <Link to="/Login">
          <h1 className="text-lg bg-green-500 flex font-medium capitalize items-center cursor-pointer ">
            <Button>
              <span className="text-white">Login</span>
            </Button>
          </h1>
        </Link>
      )}
    </div>
  );
};

export default Header;

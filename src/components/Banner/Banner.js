import React from "react";
import { useState } from "react";
import "./Banner.css";
import axios from "../axios/axios";
import { useEffect } from "react";
import requests from "../api/requests";

const Banner = () => {
  //state save movie
  const [movie, setMovie] = useState([]);

  //Hook useEffect thuc hien lenh requests API
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    };
    //goi api
    fetchData();
  }, []);
  // console.log(movie);

  function trunacate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  //render
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        {/* tieu de */}
        <h1 className="banner__title">
          {movie.title || movie.name || movie.original_name}
        </h1>
        {/* hien thi nut */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        {/* mo ta */}
        <h1 className="banner__description">
          {trunacate(movie.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
};

export default Banner;

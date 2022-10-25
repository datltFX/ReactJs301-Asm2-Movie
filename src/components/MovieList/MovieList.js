import React, { useState, useEffect } from "react";
import "./MovieList.css";
import axios from "../axios/axios";
import MovieDetail from "../MovieDetail/MovieDetail";

const MovieList = ({ title, fetchUrl, isLargePoster }) => {
  //luu mang phim tu api
  const [movies, setMovies] = useState([]);
  //an hien MovieDetail
  const [show, setShow] = useState(false);
  //lay gia tri cho MovieDeatil
  const [showData, setShowData] = useState(0);

  //lấy phim từ API
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      console.log(request.data.results);
      return request;
    };
    //goi api
    fetchData();
  }, [fetchUrl]);

  // su kien click phim
  const handleClick = (e) => {
    // console.log("click phim:", e);
    // console.log(`luc dau:${showData}`);
    // console.log("movie.id:", e.id);
    if (showData !== Number(e.id)) {
      //hiện và thêm id su kien vào state
      setShow(true);
      setShowData(Number(e.id));
    } else {
      //an
      setShow(!show);
    }
  };
  //lọc mảng lấy data cho MovieDetail
  const movieDetailTrailer = movies.filter((item) => item.id === showData);

  //render phim
  return (
    <div className="movieContainer">
      {title}
      <div className="movie__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`movie__poster ${isLargePoster && "movie__posterLarge"}`}
            src={`https://image.tmdb.org/t/p/original/${
              isLargePoster ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {show && <MovieDetail movieData={movieDetailTrailer[0]} />}
    </div>
  );
};

export default MovieList;

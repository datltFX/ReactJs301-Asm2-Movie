import { useState, useEffect } from "react";
import MovieDetail from "../MovieDetail/MovieDetail";
import "./ResultList.css";

const ResultList = ({ query }) => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showData, setShowData] = useState(0);

  //xu ly api
  useEffect(() => {
    const fetchDataSearch = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=143bebe5e619280a37d188e20fe3a5ad&language=en-US&query=${query}&include_adult=false`
        );
        const dataSearch = await res.json();
        if (dataSearch.results.length === 0) {
          throw new Error("Không có kết quả phù hợp!");
        } else {
          setData(dataSearch.results);
        }
      } catch (error) {
        console.error(error);
      }
    };
    //lay api
    fetchDataSearch();
  }, [query]);

  // console.log(data);

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
  const movieDetailTrailer = data.filter((item) => item.id === showData);

  //render
  return (
    <div className="search__result">
      <h2>Search Result</h2>
      <div className="search__posters">
        {data.map((movie) => (
          <img
            className="search__posterLarge"
            key={movie.id}
            onClick={() => handleClick(movie)}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                : "https://wp.hrc.com.vn/wp-content/uploads/2020/12/winner-successful-concept_51195-3797-e1631452513463.png"
            }
            alt={movie.name}
          />
        ))}
      </div>
      {show && <MovieDetail movieData={movieDetailTrailer[0]} />}
    </div>
  );
};
export default ResultList;

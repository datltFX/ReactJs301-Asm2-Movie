import "./SearchForm.css";
import SearchLogo from "../Navbar/SearchLogo.svg";
import ResultList from "../ResultList/ResultList";
import { useState } from "react";
const SearchForm = () => {
  const [input, setInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [show, setShow] = useState(false);

  //su kien btnSearch
  const handleSearch = (e) => {
    setShow(true);
    setValueInput(input);
  };

  //su kien reset
  const handleReset = (e) => {
    setShow(false);
    setInput("");
  };

  //render
  return (
    <div>
      <div className=" search__form">
        <div className=" input__search">
          <input
            type="text"
            className="inputValue__Search"
            placeholder="Name of movie"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <span>
            <img className="icon__search" src={SearchLogo} alt="" />
          </span>
        </div>
        <div className="action__search">
          <button className="btnReset" onClick={handleReset}>
            RESET
          </button>
          <button className="btnSearch" onClick={handleSearch}>
            SEARCH
          </button>
        </div>
      </div>
      {show && <ResultList query={valueInput} />}
    </div>
  );
};

export default SearchForm;

import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Gears from "./assets/gears.svg";
import dummy from "./dummy";

function App() {
  const [state, setState] = useState({ isLoaded: false, items: [] });
  const [category, setCategory] = useState("all");
  const [allCategories, setAllCategories] = useState([
    "all",
    "national",
    "business",
    "sports",
    "world",
    "politics",
    "technology",
    "startup",
    "entertainment",
    "miscellaneous",
    "hatke",
    "science",
    "automobile",
  ]);

  const formatdate = (dt) => {
    let today = new Date(dt.split(",")[0]);
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear().toString();
    today = mm + "/" + dd + "/" + yyyy;
    return today;
  };

  const handleCategorySelection = (params) => {
    if (allCategories.includes(params.target.innerText)) {
      setCategory(params.target.innerText);
    }
  };

  const handleBoxClick = (e) => {
    if (e.target.className === "title") {
      window.open(e.target.getAttribute("data-url"), "_blank");
    }
  };

  useEffect(() => {
    if (allCategories.includes(category)) {
      fetch(`https://inshortsapi.vercel.app/news?category=${category}`)
        .then((res) => res.json())
        .then(
          (result) => {
            setState({
              isLoaded: true,
              items: result.data,
            });
          },
          (error) => {
            setState({
              isLoaded: true,
              items: dummy.data,
            });
          }
        );
    }
  }, [category]);

  if (state.isLoaded)
    return (
      <>
        <h1>One News</h1>
        <div className="categories-strip" onClick={handleCategorySelection}>
          {allCategories.map((_category, index) => {
            return (
              <div
                key={`categories-${index}`}
                className={`category ${_category === category ? "active" : ""}`}
              >
                {_category}
              </div>
            );
          })}
        </div>

        <div className="container" onClick={handleBoxClick}>
          {state.items.map((news, index) => {
            return (
              <div key={`box-${index}`} className="box">
                <div className="lhs">
                  <img src={news.imageUrl} alt="" />
                </div>
                <div className="rhs">
                  <div className="title" data-url={news.readMoreUrl}>
                    {news.title}
                  </div>
                  <div className="main-content-container">
                    <div className="main-content">{news.content}</div>
                  </div>
                  <div className="footer">
                    <div className="author">{news.author}</div>
                    <div className="separator"></div>
                    <div className="date">
                      {formatdate(news.date)} {news.time.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  else
    return (
      <div className="loading">
        <img src={Gears} alt="" />
      </div>
    );
}

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/News.css";

const NEWS_API_URL = "https://openapi.naver.com/v1/search/news.json";
const CLIENT_ID = "YOUR_CLIENT_ID";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET";

const News = () => {
  const [category, setCategory] = useState(`축구`);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNews = async (query) => {
    try {
      const response = await axios.get(
        `https://openapi.naver.com/v1/search/news.json`,
        {
          headers: {
            "X-Naver-Client-Id": "9ZbDqI2lLaSoFtSkc_Am",
            "X-Naver-Client-Secret": "TbZNMXr2R_",
          },
          params: {
            query,
            display: 10,
            start: 1,
            sort: "date",
          },
        }
      );
      setNewsList(response.data.items);
    } catch (err) {
      console.error("뉴스 데이터를 가져오는 중 오류가 발생했습니다.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews(category);
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="news-container">
      <h1>스포츠 뉴스</h1>
      <div className="news-categories">
        {[`축구`, `야구`, `농구`, `배구`].map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>
      <ul className="news-list">
        {newsList.map((news, index) => (
          <li key={index} className="news-item">
            <a href={news.link} target="_blank" rel="noopener noreferrer">
              {news.title.replace(/<[^>]*>?/gm, "")}
            </a>
            <p>{news.description.replace(/<[^>]*>?/gm, "")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;

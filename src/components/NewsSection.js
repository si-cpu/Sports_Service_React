import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewsSection.css"; // CSS 파일을 별도로 작성

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines",
          {
            params: {
              country: "kr",
              category: "sports",
              apiKey: "5d59319d3a1c4f6a94c6ba32da7135f6",
            },
          }
        );
        console.log(response.data.articles); // 데이터를 콘솔에 출력
        setNews(response.data.articles); // items가 아닌 articles 사용
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="news-section">
      <h2>스포츠 뉴스</h2>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NewsSection;

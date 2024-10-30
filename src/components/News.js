import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/News.css";

const News = ({ teamId }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/api/v1/search/news.json", {
          headers: {
            "X-Naver-Client-Id": `9ZbDqI2lLaSoFtSkc_Am`,
            "X-Naver-Client-Secret": `TbZNMXr2R_`,
          },
          params: {
            query: `${teamId} 스포츠`,
            display: 10,
            start: 1,
            sort: "date",
          },
        });

        // HTML 태그 제거 함수
        const removeHtmlTags = (str) => str.replace(/<[^>]*>/g, "");

        // 뉴스 데이터 정제
        const processedNews = response.data.items.map((item) => ({
          ...item,
          title: removeHtmlTags(item.title),
          description: removeHtmlTags(item.description),
        }));

        setNews(processedNews);
        setLoading(false);
      } catch (err) {
        setError("뉴스를 불러오는데 실패했습니다.");
        setLoading(false);
        console.error("News fetching error:", err);
      }
    };

    if (teamId) {
      fetchNews();
    }
  }, [teamId]);

  if (loading) return <div className="news-loading">뉴스를 불러오는 중...</div>;
  if (error) return <div className="news-error">{error}</div>;

  return (
    <div className="news-container">
      <h2>{teamId} 관련 뉴스</h2>
      <div className="news-list">
        {news.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="news-item"
          >
            <article>
              <h3>{item.title}</h3>
              <p className="news-description">{item.description}</p>
              <div className="news-meta">
                <span className="news-date">
                  {new Date(item.pubDate).toLocaleDateString()}
                </span>
              </div>
            </article>
          </a>
        ))}
      </div>
    </div>
  );
};

export default News;

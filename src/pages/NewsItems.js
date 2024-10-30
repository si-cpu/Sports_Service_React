import React from "react";
import styled from "styled-components";

const NewsItemBlock = styled.div`
  display: flex;
  .thumbnail {
    margin-right: 1rem;
    img {
      display: block;
      width: 160px;
      height: 100px;
      object-fit: cover;
    }
  }
  .contents {
    h2 {
      margin: 0;
      a {
        color: black;
      }
    }
    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: normal;
    }
  }
  & + & {
    margin-top: 3rem;
  }
`;

const NewsItem = ({ article }) => {
  const { title, description, link, thumbnail } = article;

  const newDescription = description
    .replace(/<[^>]*>?/g, "")
    .replace(/&quot;/, "")
    .replace(/\n/, "")
    .replace(/&amp;/g, "");
  const newTitle = title
    .replace(/<[^>]*>?/g, "")
    .replace(/&quot;/, "")
    .replace(/\n/, "")
    .replace(/&amp;/g, "");

  return (
    <NewsItemBlock>
      {thumbnail && (
        <div className="thumbnail">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <img src={thumbnail} alt="thumbnail" />
          </a>
        </div>
      )}
      <div className="contents">
        <h2>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {newTitle}
          </a>
        </h2>
        <p>{newDescription}</p>
      </div>
    </NewsItemBlock>
  );
};

export default NewsItem;

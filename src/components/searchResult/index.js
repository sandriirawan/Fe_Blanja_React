import React from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";

function SearchResult({ data }) {
  const navigate = useNavigate();
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  return (
    <div className="search-results">
      {data.map((item) => (
        <div
          className="result"
          key={item.id}
          onClick={() => handleProductClick(item.id)}
        >
          <img className="image" src={item.photo_product}></img>
          <p className="name">{item.product_name}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchResult;

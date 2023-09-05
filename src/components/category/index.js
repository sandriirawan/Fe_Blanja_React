import React, { useEffect, useState } from "react";
import { Carousel, Spinner } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

const CategoryComponent = () => {
  const [dataCategory, setDataCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/category`)
      .then((response) => {
        setDataCategory(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const itemsPerGroup = 5;
  const groupedData = [];
  for (let i = 0; i < dataCategory.length; i += itemsPerGroup) {
    groupedData.push(dataCategory.slice(i, i + itemsPerGroup));
  }

  return (
    <div className="container">
      <div className="title" style={{ marginTop: 30, marginBottom: 30 }}>
        <h1 style={{ fontWeight: "bold" }}>Category</h1>
        <section style={{ color: "#9B9B9B" }}>
          What are you currently looking for
        </section>
      </div>
      {loading ? (
        <Spinner animation="grow" variant="danger" />
      ) : (
        <Carousel
        nextIcon={
          <FaArrowRight
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              backgroundColor: "white",
              color: "#9B9B9B",
              position: "absolute",
              top: "50%",
              right: -20,
              transform: "translateY(-50%)",
            }}
          />
        }
        prevIcon={
          <FaArrowLeft
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              backgroundColor: "white",
              color: "#9B9B9B",
              position: "absolute",
              top: "50%",
              left: -20,
              transform: "translateY(-50%)",
            }}
          />

          }
          indicators={false}
        >
          {groupedData.map((group, groupIndex) => (
            <Carousel.Item key={groupIndex}>
              <div className="row" style={{ justifyContent: "space-between" }}>
                {group.map((item) => (
                  <div
                    className="col-lg-3 col-md-4 col-sm-6 col-6 mb-4 "
                    style={{ width: 222 }}
                    key={item.id}
                  >
                    <div className="border rounded product">
                      <img
                        className="img-fluid"
                        src={item.category_photo}
                        crossOrigin="anonymous"
                        alt="cloth"
                        style={{ width: 206, height: 220 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default CategoryComponent;
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import "./Carousel.css"; // Buat file ini untuk mengatur tampilan carousel jika diperlukan

const CarouselComponent = () => {
  return (
       <div className="container" style={{width:500,maxWidth:"100%"}}>
    <Carousel autoPlay interval={3000} infiniteLoop  showStatus={false} showThumbs={false} >
      <div className="container">
        <img src={require("../../assets/Card Promotion.png")} alt="Gambar 1" />
      </div>
      <div>
        <img src={require("../../assets/Card Promotion 2.png")} alt="Gambar 2" />
      </div>
            <div className="container">
        <img src={require("../../assets/Card Promotion.png")} alt="Gambar 1" />
      </div>
      <div>
        <img src={require("../../assets/Card Promotion 2.png")} alt="Gambar 2" />
      </div>
    </Carousel>
    </div>
  );
};

export default CarouselComponent;

import React, { useEffect } from "react";
import Navbar from "../../components/navbar";
import NavbarLogin from "../../components/navbarLogin";
import CarouselComponent from "../../components/corousel/index";
import CategoryComponent from "../../components/category";
import Card from "../../components/card/imdex";
import PopularCard from "../../components/popularCard";

function Home() {
  const [showNavbarLogin, setShowNavbarLogin] = React.useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      setShowNavbarLogin(true);
    } else {
      setShowNavbarLogin(false);
    }
  }, []);
  

  return (
    <div>
      {showNavbarLogin ? <NavbarLogin /> : <Navbar />}
      <div className="container" style={{ marginTop: 100 }}>
        <CarouselComponent />
        <CategoryComponent />
        <Card />
        <PopularCard />
      </div>
    </div>
  );
}

export default Home;

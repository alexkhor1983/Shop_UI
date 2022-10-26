import React from "react";
import Announcement from "../../../components/User/announcement/Announcement";
import Categories from "../../../components/User/categories/Categories";
import Footer from "../../../components/User/footer/Footer";
import Navbar from "../../../components/User/navbar/Navbar";
import Products from "../../../components/User/products/Products";
import Slider from "../../../components/User/slider/Slider";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products/>
      <Footer/>
    </div>
  );
};

export default Home;

import { useState } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/About/About";
import Dastafka from "./pages/delivery/Delivery";
import Conditions from "./pages/conditions/Conditions";
import Contact from "./pages/contacts/Contacts";
import Product from "./components/product/Product";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Каталог" element={<About />} />
        <Route path="/Доставка" element={<Dastafka />} />
        <Route path="*" element={<Conditions />} />
        <Route path="/Контакты" element={<Contact />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

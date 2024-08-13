import { useState } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/About/About";
import Dastafka from "./pages/dastafka/Dastafka";
import Uslovenne from "./pages/uslovenne/Uslovenne";
import Contact from "./pages/contact/Contact";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Каталог" element={<About />} />
        <Route path="/Доставка" element={<Dastafka />} />
        <Route path="*" element={<Uslovenne />} />
        <Route path="/Контакты" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { useSelector } from "react-redux";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              amazonian
            </Link>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/" exact element={<HomePage />} />
          </Routes>
        </main>
        <footer className="row center">All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

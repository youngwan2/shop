import React from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/component/Header";
import Banner from "./components/component/Banner";
import Products from "./components/component/Products";
import Electronics from "./pages/category/Electronics";
import Jewelry from "./pages/category/Jewelry";
import MenClothing from "./pages/category/MenClothing";
import WomenClothing from "./pages/category/WomenClothing";
import Cart from "./pages/cart/Cart";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";
import Detail from "./pages/detail/Detail";
import { itemsType } from "./components/component/Products";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";



function App() {
  type StateType = {
    category: {
      value: string[];
    };
  };

  //카테고리별 상품 정보
  const productByCategory = useSelector<StateType>((state) => {
    return state.category.value;
  }) as itemsType;

  const [products, setProducts] = useState<any>();
  const getProductsAPI = () => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProductsAPI();
  }, []);

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Banner />}></Route>
        <Route
          path="/products"
          element={<Products products={products} />}
        ></Route>
        <Route
          path="/electronics"
          element={<Electronics productByCategory={productByCategory} />}
        ></Route>
        <Route
          path="/jewelery"
          element={<Jewelry productByCategory={productByCategory} />}
        ></Route>
        <Route
          path="/men's clothing"
          element={<MenClothing productByCategory={productByCategory} />}
        ></Route>
        <Route
          path="/women's clothing"
          element={<WomenClothing productByCategory={productByCategory} />}
        ></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/component/Header';
import Banner from './components/component/Banner';
import Products from './components/component/Products';
import Electronics from './pages/Electronics';
import Jewelry from './pages/Jewelry';
import MenClothing from './pages/MenClothing';
import WomenClothing from './pages/WomenClothing';
import Cart from './pages/Cart';
import Login from './pages/Login';
import { itemsType } from './components/component/Products';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignUp from './pages/SignUp'
import Detail from "./pages/Detail";

function App() {

  type StateType = {
    category: {
      value: string[]
    }
  }

  const productByCategory = useSelector<StateType>((state) => { return (state.category.value) }) as itemsType
  const [products, setProducts] = useState<any>()
  const getProductsAPI = () => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data)
      )
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getProductsAPI()
  }, [])


  return (
    <div className="App">

      <Header />

      <Routes>
        <Route path='/' element={<Banner />}></Route>
        <Route path='/products' element={<Products products={products} />}></Route>
        <Route path='/electronics' element={<Electronics productByCategory={productByCategory} />}></Route>
        <Route path='/jewelery' element={<Jewelry productByCategory={productByCategory} />}></Route>
        <Route path="/men's clothing" element={<MenClothing productByCategory={productByCategory} />}></Route>
        <Route path="/women's clothing" element={<WomenClothing productByCategory={productByCategory} />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/sign_up' element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}


export default App;

import React, { useEffect, useState } from "react";
import { api_products } from "../api/Api";
import { useParams } from "react-router-dom";
import "../scss/products.scss";
import Header from "../components/Header";

function Products() {
  let { category } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    try {
      const request = async () => {
        await fetch(api_products)
          .then((res) => res.json())
          .then((json) => setProducts(json));
      };
      request();
    } catch (error) {
      console.log("mistake");
    }
  }, []);

  const goods = products.map((product, index) => {
    const rating = product.rating.rate;
    const totalRating = 5;
    const realRating = (rating / totalRating) * 100;

    function addProduct() {
      console.log(product.id);
      const item = {
        id: product.id,
        img: product.image,
        title: product.title,
        price: product.price,
        quantity: 1,
        commonPrice: product.price,
      };
      const arrayItem = JSON.parse(localStorage.getItem("basketItem")) || [];
      arrayItem.push(item);
      localStorage.setItem("basketItem", JSON.stringify(arrayItem));
    }
    if (product.category === category) {
      return (
        <div className="product">
          <h2>{product.title}</h2>
          <div className="product__picture">
            <img
              className="product__picture-img"
              src={product.image}
              alt={product.title}
            ></img>
          </div>
          <div className="rating">
            <div className="stars"></div>
            <div className="color__stars" style={{ width: realRating }}></div>
            <p>{product.rating.rate}</p>
          </div>
          <div className="details">
            <p className="price">{product.price}$</p>
            <button className="btn" onClick={addProduct}>
              add
            </button>
          </div>
        </div>
      );
    }
  });

  return (
    <>
      <Header />
      <div className="goods">{goods}</div>
    </>
  );
}
export default Products;

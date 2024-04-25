import React, { useState } from "react";
import Header from "../components/Header";
import "../scss/basket.scss";
import { BasketData, viewItem } from "../controllers/BasketData";

function Basket() {
  const getProduct = localStorage.getItem("basketItem");
  const itemResult = JSON.parse(getProduct);
  const totalPrice = itemResult?.reduce((first, last) => {
    return first + last.commonPrice;
  }, 0);
  return (
    <>
      <Header />
      <div>
        <div className="item">
          <div className="total__price">
            <p>
              Total price: <b>{totalPrice} $</b>
            </p>
          </div>
          <BasketData />
        </div>
      </div>
    </>
  );
}

export default Basket;

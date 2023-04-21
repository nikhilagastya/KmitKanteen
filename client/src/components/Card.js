import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatchCart, useCart } from "./ContextReducer";
// import { Dropdown, DropdownButton } from 'react-bootstrap';
export default function Card(props) {
  let data = useCart();

  let navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();
  const handleClick = () => {
    if (!localStorage.getItem("User")) {
      navigate("/login");
    }
  };
  const handleQty = (e) => {
    setQty(e.target.value);
  };
  const handleOptions = (e) => {
    setSize(e.target.value);
  };
  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food);
    console.log(new Date());
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  let finalPrice = qty * parseInt(options[size]);

  return (
    <div>
      <div
        className="card mt-3 mainCard"
        style={{
          width: "16rem",
          maxHeight: "360px",

          backgroundColor: "rgb(242, 241, 241)",
        }}
      >
        <img
          src={props.ImgSrc}
          className="card-img-top"
          alt="..."
          style={{
            height: "120px",
            objectFit: "fill",
            borderBlockColor: "black",
          }}
        />
        <div className="card-body font-text text-dark ">
          <h5 className="card-title text-dark ">{props.foodName}</h5>

          <div
            className="font-text container w-100 p-0"
            style={{ height: "38px" }}
          >
            <select
              className=" h-100 w-20 btn-warning text-dark rounded"
              style={{ select: "#FF0000" }}
              onClick={handleClick}
              onChange={handleQty}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 w-20 text-dark btn-warning text-black rounded"
              style={{ select: "#FF0000" }}
              ref={priceRef}
              onClick={handleClick}
              onChange={handleOptions}
            >
              {priceOptions.map((i) => {
                return (
                  <option key={i} value={i}>
                    {i}
                  </option>
                );
              })}
            </select>
            <div className="text-dark d-inline h-100 w-20 fs-5">
              ₹{finalPrice}/-
            </div>
          </div>
          <hr></hr>
          <button
            className={`btn btn-color  text-dark btn-success marginer justify-content-center  `}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          {/* <button className={`btn btn-color justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
        </div>
      </div>
    </div>
  );
}
//

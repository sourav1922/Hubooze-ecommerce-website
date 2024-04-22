import React, { useEffect, useState } from "react";
import "./Populer.css";
import Item from "../Item/item";
// import data_product from "../Assets/data";
const Populer = () => {
  const [populerproduct,setPOPularproduct]=useState([]);
  useEffect(()=>{
      fetch ('http://localhost:4000/popularinwoman')
      .then((respones)=>respones.json()).then((data)=>setPOPularproduct(data))
  },[])
  
  return (
    <div className="populer">
      <h1>POPULER IN WOMEN</h1>
      <hr />
      <div className="populer-item">
        {populerproduct.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Populer;

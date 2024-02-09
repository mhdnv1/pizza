import React from "react";
import { IoMdBasket } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDeleteProductMutation, usePathProductsMutation } from "../../store/products";
import { addItem } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
const Card = (props) => {
  const [deleteProduct] = useDeleteProductMutation()
  const dispatch = useDispatch()
  const hendleDelete= async(id)=>{
     await deleteProduct(id)
  }
  const handleAddToCart = (product) => {
    // Добавить товар в корзину
    dispatch(addItem({ product, quantity: 1 }));
  };
  return (
    <div className="card">
      <div
        className="head"
        style={{ backgroundImage: `url('${props.image}')` }}
      >
        <div className="price">
          {props.price}
          <span>₽</span>
        </div>
        <button onClick={() => handleAddToCart(props)} className="add__to__card">
          <IoMdBasket />
        </button>
        <div className="rating">
          {props.rating}
          <span>
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.75095 10.0934L5.58045 8.42735L2.40873 10.0934L3.01588 6.56221L0.447662 4.062L3.99338 3.54714L5.58045 0.285568L7.16752 3.54714L10.7132 4.062L8.14502 6.56343L8.75095 10.0934Z"
                fill="#FFC529"
              />
            </svg>
          </span>
        </div>
      </div>
      <div className="footer">
        <Link to={`/product/${props.id}`}>
          <div className="title">{props.title}</div>
        </Link>
        <div style={{textAlign:"center"}} className="description">
            {props.description}
          </div>
      <button className="btn" onClick={()=> hendleDelete(props.id)}>delete</button>
      <button className="btn" ><Link to={'/add_product'}>path</Link></button>
      </div>
    </div>
  );
};

export default Card;

import React from "react";
import Title from "../../components/Title/Title";
import img from "../../assets/pizza1.png";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  removeItem,
  updateItemQuantity,
  clearCart,
} from "../../store/cartSlice";
import { useUpdateUserCartMutation } from "../../store/cart";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  console.log(cartItems);
  const dispatch = useDispatch();
  const [updateCart] = useUpdateUserCartMutation();
  
  const handleAddToCart = (productId) => {
    // Добавить товар в корзину
    dispatch(addItem({ productId, quantity: 1 }));
    updateCart({
      userId: "user_id",
      cart: [...cartItems, { productId, quantity: 1 }],
    });
  };

  const handleRemoveFromCart = (productId) => {
    // Удалить товар из корзины
    dispatch(removeItem(productId));
    updateCart({
      userId: "user_id",
      cart: cartItems.filter((item) => item.productId !== productId),
    });
  };

  const handleDecreaseQuantity = (productId) => {
    // Уменьшить количество товара в корзине
    const quantity = cartItems.find(
      (item) => item.productId === productId
    ).quantity;
    if (quantity > 1) {
      dispatch(updateItemQuantity({ productId, quantity: quantity - 1 }));
      const updatedCart = cartItems.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      updateCart({ userId: "user_id", cart: updatedCart });
    }
  };

  const handleClearCart = () => {
    // Очистить корзину
    dispatch(clearCart());
    updateCart({ userId: "user_id", cart: [] });
  };

  const handleCheckout = () => {
    if (user && cartItems.length > 0) {
      const updatedCart = [...user.cart, ...cartItems]; // Объединяем текущую корзину пользователя с товарами из корзины
      dispatch(setUserCart(updatedCart)); // Обновляем состояние корзины в Redux-хранилище

      // Отправляем обновленные данные о пользователе на сервер
      updateCart({ userId: user.id, cart: updatedCart });
    }
  };

  return (
    <div className="cart">
      <Title title="Корзина" />
      <div className="cart__products">
        {cartItems.map((item) => (
          <div className="cart__product">
            <div className="cart__product__content">
              <div className="cart__product__left">
                <img src={img} alt="" />
              </div>
              <div className="cart__product__right">
                <h4>Аццки острая</h4>
                <p>320 ₽</p>
              </div>
            </div>
            <div className="cart__product__count">
              <button className="dec" onClick={() => handleDecreaseQuantity(item.productId)}>-</button>
              <span>{item.quantity}</span>
              <button className="btn inc" onClick={() => handleAddToCart(item.productId)}>+</button>
              <span  onClick={() => handleRemoveFromCart(item.productId)} className="del">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.19185 4.19318L12.5768 12.5782"
                    stroke="#FF3600"
                    stroke-linecap="round"
                  />
                  <path
                    d="M4.19342 12.5784L12.5784 4.19343"
                    stroke="#FF3600"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        ))}
         <button className="btn" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;

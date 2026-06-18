import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useScrollToTop from "../../../hooks/useScrollToTop";
import cartAction from "../../../store/actions/cart";
import cartSelector from "../../../store/selectors/cartSelector";
import numberWithCommas from "../../display";
import SecondaryText from "../../secondary-text";
import Title from "../../section-title";
import "./body.css";
import CartCard from "./cart-card";
const ShoppingCart = () => {
  useScrollToTop();
  const cartList = useSelector(cartSelector.cartProducts);
  const dispatch = useDispatch();

  const HandleClear = () => {
    dispatch(cartAction.clearProduct());
  };

  return (
    <>
      <main className="primary-body center grid">
        <section className="grid">
          <SecondaryText text="Your Cart" />
          <Title title="Shopping cart" />
          <button
            className="btn priamry-btn fs-300 background-clrs border-btn"
            style={{ "--width": "8rem" }}
            onClick={() => HandleClear()}
          >
            <strong>Clear All</strong>
          </button>
        </section>
        <section className="grid cart-layout">
          <div className="grid cart-items">
            {cartList.length ? (
              cartList.map((item) => (
                <CartCard key={item.id} product={item} />
              ))
            ) : (
              <div className="empty-cart grid">
                <h3 className="font-clrs">Your cart is empty</h3>
                <p className="font-clrs">Browse products and add your favorites.</p>
                <Link className="btn primary-bg fs-300" to="/product">
                  Shop products
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default ShoppingCart;

import { Link } from "react-router-dom";

const CartEmpty = () => {
    return (
        <section className="empty-cart">
            <div className="empty-cart__wrapper">
                <h1>Корзина пустая <img src={require("../../assets/images/not-found-smile.png")} alt="" /></h1>
                <p>
                Вероятней всего, вы не заказывали ещё пиццу. <br />
                Для того, чтобы заказать пиццу, перейдите на главную страницу.
                </p>
                <img src={require("../../assets/images/not-found-img.png")} alt="" />
                <Link to="/">
                    <button>Вернуться назад</button>
                </Link>
            </div>
        </section>
    );
}
 
export default CartEmpty;
import { useSelector } from "react-redux";
import HeaderLogo from "../header-logo/HeaderLogo";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
    const {price, items} = useSelector(state => state.cart);

    return (
        <>
            <div className="container">
                <header className="header">
                    <div className="header__wrapper">
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <HeaderLogo />
                        </Link>
                        <Link to="/cart" style={{ textDecoration: 'none', display : "block"}}>
                            <button className="header__cart">
                                <div className="header__cart-inner">
                                    <div>{price} <img src={require("../../assets/images/rub.svg").default} alt="" /></div>
                                    <span className="border"></span>
                                    <div><img src={require("../../assets/images/cart.svg").default} alt="" /> <span>{items}</span></div>
                                </div>
                            </button>
                        </Link>
                    </div>
                </header>
            </div>
            <hr className="header-hr"/>
        </>
    );
}
 
export default Header;
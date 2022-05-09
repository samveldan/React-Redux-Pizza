import { useSelector } from "react-redux";
import CartEmpty from "../components/cart-empty/CartEmpty";
import CartFull from "../components/cart-full/CartFull";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setBoughtItems} from "../redux/actions/pizzas";
import axios from "axios";
import "./scss/cart.scss";

const Cart = () => {
    const dispatch = useDispatch();
    const {boughtItems, loading} = useSelector(state => state.pizzas);

    useEffect(() => {
        axios.get("https://62735f30a6522e24ac468c83.mockapi.io/bought").then((items) => {
            dispatch(setBoughtItems(items.data));
        })
    }, []);

    return (
        <div className="container">
            {(boughtItems.length > 0 && !loading) && <CartFull />}
            {(boughtItems.length == 0 && !loading) && <CartEmpty />}
        </div>
    );
}
 
export default Cart;
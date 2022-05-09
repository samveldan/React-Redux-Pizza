import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeItems, minusItems, minusPrice, plusItems, plusPrice } from "../../redux/actions/cart";
import { setBoughtItems } from "../../redux/actions/pizzas";
import "./cartFullItem.scss";

const CartFullItem = ({item}) => {
    const dispatch = useDispatch();
    const {pizzas : {boughtItems}} = useSelector(state => state);

    const sizes = ["26", "30", "40"];

    const deleteItem = (e) => {
        let newBought = boughtItems.filter(i => {
            if(i.id != item.id) return i;
        })
        axios.delete(`https://62735f30a6522e24ac468c83.mockapi.io/bought/${item.id}`)
        dispatch(minusPrice(item.amount * item.itemPrice))
        dispatch(setBoughtItems(newBought));
        dispatch(minusItems(1))
    };

    const minusPizza = () => {
        if(item.amount > 1) {
            axios.put(`https://62735f30a6522e24ac468c83.mockapi.io/bought/${item.id}`, {
                amount : item.amount - 1
            })
            dispatch(minusItems(1))
            dispatch(minusPrice(item.itemPrice))
            item.amount = item.amount - 1;
        }
    }

    const addPizza = () => {
        axios.put(`https://62735f30a6522e24ac468c83.mockapi.io/bought/${item.id}`, {
            amount : item.amount + 1
        })
        dispatch(plusItems(1))
        dispatch(plusPrice(item.itemPrice))
        item.amount = item.amount + 1;
    }

    return (
        <>
        <hr />
        <div className="cart-full__pizza">
            <div className="cart-full__pizza-header">
                <img src={require(`../../assets/images/${item.src}`)} alt="" className="cart-item"/>
                <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>
                        <span>{item.category == 0 ? "тонкое" : "толстое"} тесто, </span>
                        <span>{sizes[item.size]} см.</span>
                    </p>
                </div>
            </div>
            <div className="cart-item-controls">
                    <button onClick={minusPizza}><img src={require("../../assets/images/minus.svg").default} alt="" /></button>
                    <span>{item.amount}</span>
                    <button onClick={addPizza}><img src={require("../../assets/images/plus.svg").default} alt="" /></button>
            </div>
            <div className="cart-item-price">
                {item.amount * item.itemPrice} 
                <svg viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.44 12V0.575999H5.088C6.56 0.575999 7.632 0.874666 8.304 1.472C8.98667 2.06933 9.328 2.89067 9.328 3.936C9.328 4.55467 9.18933 5.136 8.912 5.68C8.63467 6.224 8.17067 6.66133 7.52 6.992C6.88 7.32267 6.00533 7.488 4.896 7.488H3.856V12H1.44ZM0.16 10.288V8.736H6.32V10.288H0.16ZM0.16 7.488V5.504H4.848V7.488H0.16ZM4.656 5.504C5.11467 5.504 5.50933 5.456 5.84 5.36C6.17067 5.25333 6.42667 5.088 6.608 4.864C6.78933 4.64 6.88 4.35733 6.88 4.016C6.88 3.52533 6.72533 3.16267 6.416 2.928C6.10667 2.68267 5.62133 2.56 4.96 2.56H3.856V5.504H4.656Z" fill="white"/>
                </svg>
            </div>
            <button className="cart-item-close" onClick={deleteItem}>
                <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.84019 4.04001H5.96019V1.16001C5.96019 0.629852 5.53035 0.200012 5.00019 0.200012C4.47003 0.200012 4.04019 0.629852 4.04019 1.16001V4.04001H1.1602C0.630035 4.04001 0.200195 4.46985 0.200195 5.00001C0.200195 5.53017 0.630035 5.96001 1.1602 5.96001H4.04019V8.84001C4.04019 9.37017 4.47003 9.80001 5.00019 9.80001C5.53035 9.80001 5.96019 9.37017 5.96019 8.84001V5.96001H8.84019C9.37035 5.96001 9.80019 5.53017 9.80019 5.00001C9.80019 4.46985 9.37035 4.04001 8.84019 4.04001Z" fill="#EB5A1E"/>
                </svg>
            </button>
        </div>
        </>
    );
}
 
export default CartFullItem;
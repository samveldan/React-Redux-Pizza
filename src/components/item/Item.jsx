import React from "react";
import { useEffect, useState } from "react";
import MyLoader from "../my-loader/MyLoader";
import { useDispatch, useSelector } from "react-redux";
import { changeItems, changePrice } from "../../redux/actions/cart";
import axios from "axios";
import "./item.scss";
import { useRef } from "react";

const Item = ({item}) => {
    const dispatch = useDispatch();
    const {menu : {typeItems}, pizzas : {boughtItems}} = useSelector(state => state);
    
    const [currentAmount, setCurrentAmount] = useState(0);
    const [itemPrice, setItemPrice] = useState();
    const [category, setCategory] = useState(0);
    const [size, setSize] = useState(0);
    const [available, setAvailable] = useState([{category : 0, sizes : []},{category : 1, sizes : []}]);
    const addRef = useRef();

    if(currentAmount > 0 && addRef.current) addRef.current.classList.add("show");
    else if(currentAmount == 0 && addRef.current) addRef.current.classList.remove("show");

    useEffect(() => {
        if(typeItems.length > 0) {
            boughtItems.forEach(element => {
                if(element.name == item.name && element.src == item.src && element.current == item.current) {
                    setCurrentAmount(prev => prev += element.amount);
                }
            });

            let newCategory = [{category : 0, sizes : []}, {category : 1, sizes : []}];

            item.options.map(i => {
                if(i.category == 0) newCategory[0].sizes.push(i.size);
                if(i.category == 1) newCategory[1].sizes.push(i.size);
            })
    
            setAvailable(newCategory);
        }
    }, [typeItems.length])

    useEffect(() => {
        if(typeItems.length > 0) {
            for(let i = 0; i < item.options.length; i++) {
                if(item.options[i].category == category && item.options[i].size == available[category].sizes[0]) {
                    setSize(available[category].sizes[0]);
                    setItemPrice(item.options[i].price);
                    break;
                } 
            }
        }
    }, [available])

    useEffect(() => {
        if(typeItems.length > 0) {
            for(let i = 0; i < item.options.length; i++) {
                if(item.options[i].category == category && item.options[i].size == size) {
                    setItemPrice(item.options[i].price);
                    break;
                } 
            }
        }
    }, [size, category])

    useEffect(() => {
        if(typeItems.length > 0) {
            const hasSize = available[category].sizes.includes(parseInt(size));

            if(!hasSize) setSize(available[category].sizes[0])
        }
    }, [category])

    const toggleBtns = e => {
        const categoryBlock = e.target.closest(".category");
        const sizeBlock = e.target.closest(".size");

        if(categoryBlock || sizeBlock) {
            if(categoryBlock) {
                Array.from(categoryBlock.children).forEach(c => c.classList.remove("active"));
                e.target.closest("button").classList.add("active");
                setCategory(categoryBlock.querySelector(".active").dataset.category)
            }
            else {
                Array.from(sizeBlock.children).forEach(s => s.classList.remove("active"))
                e.target.closest("button").classList.add("active");
                setSize(sizeBlock.querySelector(".active").dataset.size)
            }
        }
    };
    
    const buyItem = (e) => {
        const amount = e.target.closest(".add").querySelector(".amount");
        const boughtItem = {
            name : item.name,
            category,
            size,
            itemPrice,
            src : item.src,
            current : item.current,
            amount : 1
        };

        axios.get(`https://62735f30a6522e24ac468c83.mockapi.io/bought`).then((data) => {
            let alreadyPosted = false;

            data.data.forEach(i => {
                if(i.name == boughtItem.name && i.category == boughtItem.category && i.size == boughtItem.size && i.itemPrice == boughtItem.itemPrice) {
                    boughtItem.amount = i.amount + 1;

                    alreadyPosted = true;
                        axios.delete(`https://62735f30a6522e24ac468c83.mockapi.io/bought/${i.id}`).then(() => {
                            axios.post("https://62735f30a6522e24ac468c83.mockapi.io/bought", boughtItem);
                        })
                }
            })
            if(!alreadyPosted) axios.post("https://62735f30a6522e24ac468c83.mockapi.io/bought", boughtItem)
        }).catch(error => {
            console.log(error);
            if(error.response.status == 404) axios.post("https://62735f30a6522e24ac468c83.mockapi.io/bought", boughtItem)
        })

        amount.innerText = currentAmount;

        setCurrentAmount(prev => prev + 1);
        dispatch(changePrice(itemPrice));
        dispatch(changeItems());
    };

    return (
        <>
    {typeItems.length > 0 ? 
        <div className="pizzas__item">
            <img src={require(`../../assets/images/${item.src}`)} alt="" />
            <h4>{item.name}</h4>
            <div className="pizzas__item-controls" onClick={toggleBtns}>
                <div className="category">
                    <button data-category="0" disabled={available[0].sizes.length > 0 ? false : true} className={category == 0 ? "active" : ""}>тонкое</button>
                    <button data-category="1" disabled={available[1].sizes.length > 0 ? false : true} className={category == 1 ? "active" : ""}>традиционное</button>
                </div>
                <div className="size">
                    <button data-size="0" disabled={!available[category].sizes.some(i => i == 0)} className={size == 0 ? "active" : ""}>26 см.</button>
                    <button data-size="1" disabled={!available[category].sizes.some(i => i == 1)} className={size == 1 ? "active" : ""}>30 см.</button>
                    <button data-size="2" disabled={!available[category].sizes.some(i => i == 2)} className={size == 2 ? "active" : ""}>40 см.</button>
                </div>
            </div>
            <div className="pizzas__item-footer">
                <div className="price">{itemPrice} 
                    <svg viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.44 12V0.575999H5.088C6.56 0.575999 7.632 0.874666 8.304 1.472C8.98667 2.06933 9.328 2.89067 9.328 3.936C9.328 4.55467 9.18933 5.136 8.912 5.68C8.63467 6.224 8.17067 6.66133 7.52 6.992C6.88 7.32267 6.00533 7.488 4.896 7.488H3.856V12H1.44ZM0.16 10.288V8.736H6.32V10.288H0.16ZM0.16 7.488V5.504H4.848V7.488H0.16ZM4.656 5.504C5.11467 5.504 5.50933 5.456 5.84 5.36C6.17067 5.25333 6.42667 5.088 6.608 4.864C6.78933 4.64 6.88 4.35733 6.88 4.016C6.88 3.52533 6.72533 3.16267 6.416 2.928C6.10667 2.68267 5.62133 2.56 4.96 2.56H3.856V5.504H4.656Z" fill="white"/>
                    </svg>
                </div>
                <button className="add" onClick={buyItem}>
                    <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill="#EB5A1E"/>
                    </svg>
                    <span>Добавить</span>
                    <span className="amount" ref={addRef}>{currentAmount}</span>
                </button>
            </div>
        </div> : 
        <div className="pizzas__item">
            <MyLoader />
        </div>
        }
        </>
    );
}
 
export default React.memo(Item);
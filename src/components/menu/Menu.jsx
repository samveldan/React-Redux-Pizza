import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { setKey, setTypeItems, sortItems } from "../../redux/actions/menu";
import "./menu.scss";

const Menu = () => {
    const dispatch = useDispatch();

    const {pizzas : {items}, menu : {typeItems}, menu : {sortKey}} = useSelector(state => state);
    
    const toggleMenu = e => {
        const block = e.target.closest(".header__sort"),
        items = block.querySelectorAll(".header__sort-items span");

        if(e.target.closest("button")) {
            const btn = e.target.closest("button");

            block.classList.toggle("open");

            items.forEach(item => {
                item.addEventListener("click", () => {
                    items.forEach(element => element.classList.remove("active"));

                    item.classList.add("active");
                    btn.innerText = item.innerText;
                    block.classList.remove("open");

                    dispatch(setKey(item.dataset.sort))
                    dispatch(sortItems(typeItems, item.dataset.sort))
                }, {once : true})
            });
        }
    };

    const toggleType = e => {
        const menu = e.target.closest("ul");
        const currentLi = e.target.closest("li");

        if(currentLi) {
            clear(menu.querySelectorAll("li"));
            currentLi.classList.add("active");

            let typeItems = items.filter(i => {
                return(i.type.includes(parseInt(currentLi.dataset.type)))
            })

            if(currentLi.dataset.type == 0) typeItems = items;

            dispatch(setTypeItems(typeItems));
            dispatch(sortItems(typeItems, sortKey))
        }
    };

    const clear = items => {
        items.forEach(element => element.classList.remove("active"));
    }

    return (
        <div className="header__menu">
            <div className="container">
                <div className="header__menu-wrapper">
                    <ul onClick={toggleType}>
                        <li className="active" data-type="0">??????</li>
                        <li data-type="1">????????????</li>
                        <li data-type="2">????????????????????????????</li>
                        <li data-type="3">??????????</li>
                        <li data-type="4">????????????</li>
                        <li data-type="5">????????????????</li>
                    </ul>
                    <div className="header__sort" onClick={toggleMenu}>
                        <div>
                            <img src={require("../../assets/images/arrow.svg").default} alt="" />
                            ???????????????????? ????: <button>????????????????????????</button>
                            <div className="header__sort-items">
                                <span className="active" data-sort="0">????????????????????????</span>
                                <span data-sort="1">????????</span>
                                <span data-sort="2">????????????????</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Menu;
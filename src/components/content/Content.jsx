import {  useSelector } from "react-redux";
import Item from "../item/Item";
import "./content.scss";

const Content = () => {
    const {menu : {typeItems}, pizzas : {loading}} = useSelector(state => state);

    return (
        <div className="pizzas">
            <div className="container">
                <h1>Все пиццы</h1>
                <div className="pizzas__items">
                    {!loading ? typeItems.map(item => {
                        return <Item key={item.id} item={item}/>
                    }) : 
                    [...Array(8)].map((item, index) => {
                        return <Item key={index}/>
                    })
                    }
                </div>
            </div>
        </div>
    );
}
 
export default Content;
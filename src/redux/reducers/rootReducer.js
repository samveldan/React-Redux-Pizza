import {combineReducers} from "redux"
import { pizzasReducer } from "./pizzasReducer";
import { menuReducer } from "./menuReducer";
import { cartReducer } from "./cartReducer";

export const rootReducer = combineReducers({
    pizzas : pizzasReducer,
    menu : menuReducer,
    cart : cartReducer
})
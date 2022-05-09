import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { Provider } from "react-redux";
import {store} from "../../redux/store";
import Header from "../header/Header";
import "./app.scss";
import { setItems, setBoughtItems, setProject } from "../../redux/actions/pizzas";
import { setTypeItems, sortItems } from "../../redux/actions/menu";
import axios from "axios"
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../../pages/Home";
import Cart from "../../pages/Cart";
import { changeItems, changePrice } from "../../redux/actions/cart";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("https://62735f30a6522e24ac468c83.mockapi.io/bought").then((items) => {
      dispatch(setBoughtItems(items.data));
      return items;
    })
    .then((items) => {
      dispatch(changePrice(0, items.data));
      dispatch(changeItems(0, items.data));
    })
    .catch(error => {
      console.log(error);
      if(error.response.status == 404) {
        dispatch(setBoughtItems([]));
      }
    })

    axios.get("https://62735f30a6522e24ac468c83.mockapi.io/items").then((items) => {
      dispatch(setItems(items.data));
      dispatch(setTypeItems(items.data));
      dispatch(sortItems(items.data))
    })
  }, [])

  return (
    <Router>
      <Provider store={store}>
        <main className="app">
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/cart" element={<Cart />}></Route>
          </Routes>
        </main>
      </Provider>
    </Router>
  );
}

export default App;

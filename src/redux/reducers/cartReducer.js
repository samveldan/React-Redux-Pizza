let initialState = {
    items : 0,
    price : 0
}

export const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case "MINUS_PRICE" : return {...state, price : state.price - action.payload};
        case "MINUS_ITEMS" : return {...state, items : state.items - action.payload};
        case "PLUS_PRICE" : return {...state, price : state.price + action.payload};
        case "PLUS_ITEMS" : return {...state, items : state.items + action.payload};
        case "CHANGE_PRICE" : return {...state, price : state.price + action.payload};
        case "CHANGE_ITEMS" : return {...state, items : state.items + action.payload};
        default: return state;
    }
}
let initialState = {
    items : [],
    boughtItems : [],
    loading : true
}

export const pizzasReducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_ITEM" : return {...state, boughtItems : [...state.boughtItems, action.payload]};
        case "SET_ITEMS" : return {...state, items : action.payload};
        case "SET_BOUGHT_ITEMS" : return {...state, boughtItems : action.payload, loading : false};
        default: return state;
    }
};
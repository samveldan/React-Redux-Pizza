let initialState = {
    sortKey : 0,
    typeItems : []
}

export const menuReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_KEY" : return {...state, sortKey : action.payload};
        case "SORT_ITEMS" : return {...state, typeItems : action.payload};
        case "SET_TYPE_ITEMS" : return {...state, typeItems : action.payload.length > 0 ? action.payload : state.items};
        default: return state;
    }
}
export const addItem = (item) => {
    return {
        type : "ADD_ITEM",
        payload : item
    }
}

export const setItems = (items) => {
    return {
        type : "SET_ITEMS",
        payload : items
    }
}

export const setBoughtItems = (items) => {
    return {
        type : "SET_BOUGHT_ITEMS",
        payload : items
    }
}
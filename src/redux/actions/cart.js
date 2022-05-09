export const changePrice = (price = 0, items = []) => {
    return {
        type : "CHANGE_PRICE",
        payload : (function() {
            items.forEach(element => {
                price += element.itemPrice * element.amount;
            });

            return price;
        }())
    }
}

export const changeItems = (currentItems = 1, items = []) => {
    return {
        type : "CHANGE_ITEMS",
        payload : (function() {
            items.forEach(element => {
                currentItems += element.amount;
            });

            return currentItems;
        }())
    }
}

export const minusItems = (amount) => {
    return {
        type : "MINUS_ITEMS",
        payload : amount
    }
}

export const plusPrice = (myPrice) => {
    return {
        type : "PLUS_PRICE",
        payload : myPrice
    }
}

export const plusItems = (amount) => {
    return {
        type : "PLUS_ITEMS",
        payload : amount
    }
}

export const minusPrice = (myPrice) => {
    return {
        type : "MINUS_PRICE",
        payload : myPrice
    }
}
export const setTypeItems = (items) => {
    return {
        type : "SET_TYPE_ITEMS",
        payload : items
    }
}

export const setKey = (key) => {
    return {
        type : "SET_KEY",
        payload : key
    }
}

export const sortItems = (items, key = 0) => {
    return {
        type : "SORT_ITEMS",
        payload : (function () {
            if(key == 0) {
                let newItems = items.sort((a, b) => {
                    if(a.popularity > b.popularity) return 1;
                    else if(a.popularity < b.popularity) return -1;
                })
                return newItems;
            }
            else if(key == 1) {
                let newItems = items.map(i => {
                    let price = i.options.map(p => p.price);

                    return {
                        smallestPrice : Math.min(...price),
                        item : i
                    }
                }).sort((a, b) => {
                    if(a.smallestPrice > b.smallestPrice) return 1;
                    else if(a.smallestPrice < b.smallestPrice) return -1;
                }).map(j => j.item);

                return newItems;
            }
            else if(key == 2) {
                let newItems = items.sort((a, b) => {
                    if(a.name[0] > b.name[0]) return 1;
                    else if(a.name[0] < b.name[0]) return -1;
                });
                
                return newItems;
            }
        })()
    }
}
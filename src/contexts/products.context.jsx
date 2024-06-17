import { createContext, useState } from "react";
import PRODUCTS from '../shop-data.json'

export const ProductsContext = createContext({
    //we know that we want to store an array of products
    products: [],

});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);

    const value = {products}
    return(
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    )
}
import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuemnts } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    //we know that we want to store an array of products
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    /* add to firebase the data
    useEffect(()=>{
        addCollectionAndDocuments('categories', SHOP_DATA)
    }, [])*/
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuemnts();
            setCategoriesMap(categoryMap);
        };

        getCategoriesMap();
    }, []);

    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
};



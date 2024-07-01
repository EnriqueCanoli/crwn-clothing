/**
* It uses the reduce method to iterate over all documents and accumulate them into an object 
* For each document snapshot (docSnapshot), it extracts the title and items from the document data.
* It converts the title to lowercase and uses it as a key in the categoryMap object, with the corresponding items as the value.
*/

import { createSelector } from "reselect";


/**Memoization */
const selectCategoryReducer = (state) => state.categories;


/**This momoization function only run is if this categoriesSlice object that we get back from this selector is different */
export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

/**What's happening here is that we are saying , as long as the categories array does not change do not re-run this method 
 * Only give me the previous calculated value
*/

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) =>
        categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {})
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)
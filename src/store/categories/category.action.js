/**
 * This action updates the category
 */

import { getCategoriesAndDocuemnts } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/firebase/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";



//tell to redux that we start to fetch categories
export const fetchCategoriesStart = () =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) =>
    createAction(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
        categoriesArray
    );

export const fetchCategoriesFailure = (error) =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesStartAsync = () => {
    return async (dispatch) => {
        dispatch(fetchCategoriesStart());
        try {
            const categoriesArray = await getCategoriesAndDocuemnts('categories');
            dispatch(fetchCategoriesSuccess(categoriesArray));
        } catch (error) {
            dispatch(fetchCategoriesFailure(error));
        }
    };
};
/**
 * This action updates the category
 */

import { createAction } from "../../utils/firebase/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const setCategoriesMap = (categoriesMap) =>
    createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categoriesMap);
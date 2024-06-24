//it allows us to create a final big reducer
import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/catergory.reducer";

//Paramters: ins an object where the keys and the values are going to be the neame of the reducer slice
export const rootReducer = combineReducers({
    user:userReducer,
    categories:categoriesReducer
    
})
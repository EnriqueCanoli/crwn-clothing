import {Routes, Route} from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import './shop.styles.scss'
import Category from '../category/category.compoent';
import { useEffect } from 'react';
import { getCategoriesAndDocuemnts } from '../../utils/firebase/firebase.utils';
import {setCategories} from '../../store/categories/category.action'
import { useDispatch } from 'react-redux';

/**
 * CategoriesPreview and Category, both needs the categoryMap(categoriesReducer), so the nearest ancestor is the shop component  
 */
const Shop = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuemnts();
            //sends this action object to redux store
            dispatch(setCategories(categoriesArray));
        };

        getCategoriesMap();
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />}/>
        </Routes>
    );
};

export default Shop;
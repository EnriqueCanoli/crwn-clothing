import {Routes, Route} from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import './shop.styles.scss'
import Category from '../category/category.compoent';
import { useEffect } from 'react';

import {fetchCategoriesStartAsync} from '../../store/categories/category.action'
import { useDispatch } from 'react-redux';

/**
 * CategoriesPreview and Category, both needs the categoryMap(categoriesReducer), so the nearest ancestor is the shop component  
 */
const Shop = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesStartAsync());
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />}/>
        </Routes>
    );
};

export default Shop;
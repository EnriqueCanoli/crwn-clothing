import './category.styles.scss'
import { useParams } from 'react-router-dom';

import { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector';

const Category = () => {
    
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>{/**We make this, because  getCategoriesMap is async function, so it can be product the first time as undefined. Only reneder de component if the actual data is present*/}
            
            {products &&
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
        </div>
        </>
        
    )




}

export default Category;

/** with context API
 * import './category.styles.scss'
import { useParams } from 'react-router-dom';

import { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

const Category = () => {
    
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {/*We make this, because  getCategoriesMap is async function, so it can be product the first time as undefined. Only reneder de component if the actual data is present}
            <div className='category-container'>
            
            {products &&
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
        </div>
        </>
        
    )




}

export default Category;


 */

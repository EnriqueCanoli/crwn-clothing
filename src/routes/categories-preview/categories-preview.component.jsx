import CategoryPreview from '../../components/category-preview/category-preview.component';
import { selectCategoriesMap } from '../../store/categories/category.selector';
import { useSelector } from 'react-redux';

const CategoriesPreview = () => {
    //get the data
    const categoriesMap = useSelector(selectCategoriesMap);

    return (
        <>
            {Object.keys(categoriesMap).map((key) => {
                const products = categoriesMap[key];
                return <CategoryPreview key={key} title={key} products={products} />;
            })}
        </>
    );
};

export default CategoriesPreview;






/**with context API
 * import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from '../../components/category-preview/category-preview.component';


const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <>
            {Object.keys(categoriesMap).map((key) => {
                const products = categoriesMap[key];
                return <CategoryPreview key={key} title={key} products={products} />;
            })}
        </>
    );
};

export default CategoriesPreview;
 */
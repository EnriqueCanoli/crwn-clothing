import CategoryPreview from '../../components/category-preview/category-preview.component';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector';
import { useSelector } from 'react-redux';
import Spinner from '../../components/spinner/spinner.component';
import { Fragment } from 'react';

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <Fragment>
            {isLoading ? (
                <Spinner />
            ) : (
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return (
                        <CategoryPreview key={title} title={title} products={products} />
                    );
                })
            )}
        </Fragment>
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
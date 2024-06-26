import './category-preview.styles.scss'
import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';
/**
 * This component is going to live in the shop component level
 */
const CategoryPreview = ({ title, products }) => (
    <div className='category-preview-container'>
        <h2>
            <Link className='title' to={title}>{title.toUpperCase()}</Link>
        </h2>
        <div className='preview'>
            {products
                .filter((_, idx) => idx < 4)
                .map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
        </div>
    </div>
);
export default CategoryPreview;
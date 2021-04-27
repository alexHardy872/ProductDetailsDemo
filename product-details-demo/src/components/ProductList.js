import ListProduct from './ListProduct'
import knownIds from '../references/knownIds'
import Search from '../components/Search';

const ProductList = ({products, images }) => {
    const getMainImageSrc = (product) => {
        const imageId = product.images
        .filter((image) => image.attribute === knownIds.mainProductImage)[0].id;

        const targetImage = images.filter((image) => image.id === imageId)[0];

        if (targetImage !== null && targetImage !== undefined){
            return targetImage.src;
        }else{
            return 'no image found';
        }

    }
    return (
        <div>
            <Search/>
            <div className='container products-list'>
            {products.map((product) => (
                <ListProduct 
                    key={product.id} 
                    product={product} 
                    mainImage={getMainImageSrc(product)}
                />))}
            </div>
        </div>
      
    )
}

export default ProductList
import ListProduct from './ListProduct'
import knownIds from '../references/knownIds'

const ProductList = ({products, images, selectProduct}) => {
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
        <div className='container products-list'>
        {products.map((product) => (
            <ListProduct 
                key={product.id} 
                product={product} 
                mainImage={getMainImageSrc(product)}
                selectProduct={selectProduct}
            />))}
        </div>
    )
}

export default ProductList
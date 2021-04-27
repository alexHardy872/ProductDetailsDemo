import ListProduct from './ListProduct'
import knownIds from '../references/knownIds'
import Search from '../components/Search';

const ProductList = ({products, images, attributes }) => {
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
    const getAttributeValue = (product, attributeId) => {
        const targetAtt = product.attributes
        .filter((att) => att.id === attributeId)[0];

        if(targetAtt){
            return targetAtt.value;
        }
        return 'NO INFORMATION'
    }

    return (
        <div>
            <Search/>
            <div className='container products-list'>
            {products.map((product) => (
                <ListProduct 
                    key={product.id} 
                    productId={product.id}
                    name={getAttributeValue(product, knownIds.productName)} 
                    code={getAttributeValue(product, knownIds.productCode)}
                    mainImage={getMainImageSrc(product)}
                />))}
            </div>
        </div>
      
    )
}

export default ProductList
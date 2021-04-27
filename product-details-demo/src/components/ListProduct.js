import { Link} from 'react-router-dom';

const ListProduct = ({ product, mainImage }) => {
    return (
        <div className='row list-product'>
            <div className='col-sm-3'>
                <img className='list-product-details image-thumbnail' 
                    src={mainImage} alt={product.name}></img>
                </div>
            <div className='col-sm-3'>
                <Link to={`/products/${product.id}`}>
                    <p className='list-product-details pointer'><b>{product.name}</b></p>        
                </Link>
                </div>
            <div className='col-sm-2'>
                <p className='list-product-details'>{product.productcode}</p>
            </div> 
            <div className='col-sm-2'>
                <p className='list-product-details'>{product.description}</p>
            </div> 
        </div>
      
    )
}

export default ListProduct
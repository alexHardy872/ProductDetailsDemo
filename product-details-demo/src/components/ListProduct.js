import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

const ListProduct = ({product, mainImage, selectProduct}) => {
    return (
        <div className='row list-product'>
            <div className='col-sm-3'>
                <img className='list-product-details'src={mainImage} className='image-thumbnail'></img>
                </div>
            <div className='col-sm-3'>
                <Link to={`/products/${product.id}`}>
                    <p className='list-product-details list-product-name'
                    onClick={() => selectProduct(product)}
                    ><b>{product.name}</b></p>        
                </Link>
                </div>
            <div className='col-sm-3'>
                <p className='list-product-details'>{product.description}</p>
            </div> 
        </div>
      
    )
}

export default ListProduct
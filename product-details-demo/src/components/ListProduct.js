import { Link} from 'react-router-dom';

const ListProduct = ({ productId, name, code, mainImage }) => {
    return (
        <div className='row list-product'>
            <div className='col-sm-3'>
                <img className='list-product-details image-thumbnail' 
                    src={mainImage} alt={name}></img>
                </div>
            <div className='col-sm-3'>
                <Link to={`/products/${productId}`}>
                    <p className='list-product-details pointer'><b>{name}</b></p>        
                </Link>
                </div>
            <div className='col-sm-2'>
                <p className='list-product-details'>{code}</p>
            </div> 
        </div>
      
    )
}

export default ListProduct
import { Link} from 'react-router-dom';

const ListProduct = ({ productId, name, code, mainImage }) => {
    return (
        <div className='flex-container space-between list-product'>
            <div className=''>
                <img className='list-product-details image-thumbnail' 
                    src={mainImage} alt={name}></img>
                </div>
            <div className=''>
                <Link to={`/products/${productId}`}>
                    <p className='list-product-details pointer list-name'><b>{name}</b></p>        
                </Link>
                </div>
            <div className=''>
                <p className='list-product-details list-code'>{code}</p>
            </div> 
        </div>
      
    )
}

export default ListProduct
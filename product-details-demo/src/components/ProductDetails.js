import {useParams} from 'react-router-dom';


const ProductDetails = (products, images, attributes) => { 
    const { id } = useParams(); 
    // get those images attached from the http call... 
    return (

              <h1>{id}</h1>
    )
}

export default ProductDetails
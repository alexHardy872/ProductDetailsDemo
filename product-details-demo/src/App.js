import './App.css';
import ProductList from './components/ProductList';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([])
  const [images, setImages] = useState([])
  const [currentProduct, selectProduct ] = useState()

  useEffect(() => {
    const getProducts = async () => {
      const productsFromServer = await fetchEntities('Products');
      setProducts(productsFromServer);
    }

    const getImages = async () => {
      const imagesFromServer = await fetchEntities('Images');
      setImages(imagesFromServer)
    }

    getProducts();

    getImages();
    
  }, [])

  const fetchEntities = async (serverName) => {
    const res = await fetch(`http://localhost:5000/${serverName}`)
    const data = await res.json()

    return data;
  }

  // select current product

  const changeSelectedProduct = (product) => {
    console.log(product.name)
  }

  return (
    <Router>
      <div className="App">
        <div className='row'>
          <div className='col-md-5'>
            <Link to='/products'><h1>Products</h1></Link>
            </div>
          <div className='col-md-5'>
            <Link to='/images'><h1>Images</h1></Link>
            </div>
        </div>
      <Route path='/products' exact render={(props) => (
        <>
          {products.length > 0 && <ProductList 
            products={products} 
            images={images}
            selectProduct={changeSelectedProduct}/>}
        </>
      )}/>
      <Route path={`/products/${currentProduct.id}`} render={(props) => (
        <>
        <h1> productId</h1>
        </>
      )} />
    </div>
    </Router>
  );
}

export default App;

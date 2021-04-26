import './App.css';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Header from './components/Header';
import Button from './components/Button';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Link, useHistory, useParams} from 'react-router-dom';

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
        <Header/>
        <div className='under-header'>
          <Route path='/' exact render={(props) => (
            <div>
              <Button text='Products'/>
              <Button text='Images'/>
            </div>
          )}/>
      
          <Route path='/products' exact render={(props) => (
            <>
              {products.length > 0 && <ProductList 
                products={products} 
                images={images}
                selectProduct={changeSelectedProduct}/>}
            </>
          )}/>
           <Route path='/images' exact render={(props) => (
            <div>
              <h1>Images comming soon!</h1>
              </div>
          )}/>
          <Route path={`/products/:id`} render={(props) => (
            <>
            <h1> product detail page </h1>
            </>
          )} />
        </div>
      </div>
    </Router>
  );
}

export default App;

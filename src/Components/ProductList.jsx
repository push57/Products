import { useState,useEffect } from 'react';
import products from './Data';
import { FaCartPlus } from "react-icons/fa";

const ProductList = () => {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = (category) => { //Accordin
    setSelected(category);
  };

  const togglelist = (category) => { //toggle
    setOpen(open === category ? true : category);
  };

  const handleAddToCart = (product) => { //Cart
    setCartItems([...cartItems, product]);
  };
  useEffect(() => {
    // Set the initial selected subcategory to the first one
    const firstMainCategory = Object.keys(products)[0];
    const firstSubCategory = Object.keys(products[firstMainCategory])[0];
    setSelected(firstSubCategory);
  }, []);

  //for display Reset Message
  const handleOpenMessage = () => { setShowMessage(true); };
  const handleCloseMessage = () => { setShowMessage(false); };
  const handleResetCart = () => { setCartItems([]); setShowMessage(false); };

  return (
    <div className="app-container">
      <header>
        <h1>Bengaluru eShopping</h1>
        {/*-- cart Numbers -- */}
        <div className="cart"> 
           <button onClick={handleOpenMessage}> <FaCartPlus size={30}/> <span className='badge'>{cartItems.length}</span></button>
        </div> 
      </header>
      
      {showMessage && (
        <div className="message">
          <p>Do you want to reset the cart?</p>
          <button onClick={handleResetCart}>Reset</button>
          <button onClick={handleCloseMessage}>Cancel</button>
        </div>
      )}
     
      <main className="main-content">
        {/*-- side Accordin -- */}
        <aside className="sidebar">
          {Object.entries(products).map(([mainCategory, subCategories]) => (
            <div key={mainCategory} className="main-category">
              <h3 onClick={() => togglelist(mainCategory)} style={{ cursor: 'pointer' }}>{mainCategory}</h3>
              {open === mainCategory && (
                <ul className="sub-categories">
                  {Object.entries(subCategories).map(([subCategory]) => (
                    <li key={subCategory} className={selected === subCategory ? 'active' : ''} onClick={() => handleClick(subCategory)}>
                      {subCategory}</li> ))}</ul>
              )}
            </div>
          ))}
        </aside>
        {/*-- Product List-- */}
        <section className="product-list">
          <h2 className="centered-header">{selected}</h2>
          <div className="product-grid">
            {selected && products[Object.keys(products).find(key => products[key][selected])]?.[selected]?.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.image} className='img-responsive' alt={product.name} />
                <h3>{product.name}</h3>
                <hr/>
                <ul className='product-features' key={product.id}>
                  <li><b>Model</b>: {product.model}</li>
                  <li><b>Price</b>: {product.price}</li>
                  <li className='product-des'><b>Description</b>: {product.description}</li>
                </ul>
                <div className="row">
                  <button onClick={() => handleAddToCart(product)}>Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
    </div>
  );
};

export default ProductList;

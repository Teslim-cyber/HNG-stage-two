import React, { useState, useEffect } from 'react';
import Homewirstwacth from "./Images/Mask group.png";
import './App.css';
import { HashLink } from 'react-router-hash-link';
import { data } from './Data/product';
import dropdown from "./Images/ep_arrow-up-bold.png";
import star from "./Images/Frame 109.png";
import vector from "./Images/Vector.png"
import { Link } from 'react-router-dom';
import vector1 from "./Images/Vector (1).png"
import vector2 from "./Images/Vector (2).png"
import vector3 from "./Images/Vector (3).png"
import vector4 from "./Images/Vector (5).png"
function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch cart data from mock API
    fetch('http://localhost:5000/cart')
      .then(response => response.json())
      .then(data => setCart(data))
      .catch(error => console.error('Error fetching cart data:', error));
  }, []);

  const handleAddToCart = (product) => {
    if (!cart.some(item => item.id === product.id)) {
      const updatedCart = [...cart, product];
      setCart(updatedCart);

      // Update cart data in the mock API
      fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      })
      .catch(error => console.error('Error updating cart data:', error));
    }
  };

  const handleRemoveFromCart = (product) => {
    const updatedCart = cart.filter(item => item.id !== product.id);
    setCart(updatedCart);

    // Remove cart data in the mock API
    fetch(`http://localhost:5000/cart/${product.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .catch(error => console.error('Error removing cart data:', error));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      return total + (isNaN(price) ? 0 : price);
    }, 0).toFixed(2);
  };

  return (
    <div className="App">
      <section id="home">
        <div className="navbar">
          <div className="Logo">
            <h1>Teslim</h1>
          </div>
          <div className="navlinks">
            <ul>
              <li><HashLink smooth to="#product-listing">Product listing</HashLink></li>
              <li><HashLink smooth to="#product-listing">Checkout</HashLink></li>
            </ul>
            <button><HashLink smooth to="#cartsection">Cart ({cart.length})</HashLink></button>
          </div>
        </div>
        <div className="homepage">
          <div className="imgdiv">
            <div className="text">
              <h1>
                OPEYEMI  <br />
                WRIST WATCH <br />
                STORE              
              </h1>
              <p>20% discount sales on-going</p>
            </div>
          </div>
          <img src={Homewirstwacth} className="displaypicture" alt="Home Wrist Watch" />
        </div>
      </section>
      <section id="product-listing">
        <div className="product">
          <div className="navlinks">
            <ul>
              <li><HashLink smooth to="#product-listing" className='activenavlink'>Product listing</HashLink></li>
              <li><HashLink smooth to="#cartsection">Cart</HashLink></li>
              <li><HashLink smooth to="#product-listing">Checkout</HashLink></li>
            </ul>
          </div>
          <div className="product-container">
            {data.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.description} />
                <div className="product-details">
                  <p>{product.description}</p>
                  <p className='price'>{product.price}</p>
                </div>
                <div className="cart-container">
                  <div className="card-detail">
                    <div className="dropdownbox">
                      <p>1</p>
                      <img src={dropdown} alt="dropdown" />
                    </div>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      disabled={cart.some(item => item.id === product.id)}
                    >
                      Add to cart
                    </button>
                  </div>
                  <img src={star} alt="star" />
                </div>
              </div>
            ))}
          </div>  
        </div>
      </section>
      <section id="cartsection">
        <div className="cartcontainer">
          <div className="navlinks">
            <ul>
              <li><HashLink smooth to="#product-listing">Product listing</HashLink></li>
              <li><HashLink smooth to="#cartsection" className='activenavlink'>Cart</HashLink></li>
              <li><HashLink smooth to="#checkout">Checkout</HashLink></li>
            </ul>
          </div>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div className="cartwithbutton" key={index}>
                <div className="cart-item">
                  <img src={item.image} alt={item.description} />
                  <div className="cart-item-details">
                    <p>{item.description}</p>
                    <p className='price'>{item.price}</p>
                    <img src={star} alt="star" />
                  </div>
                </div>
                <div className="cartedits">
                  <div className="priceqtty">
                    <p>Price  = {item.price} </p>
                    <p>Qty</p>
                    <div className="dropdownbox">
                      <p>1</p>
                      <img src={dropdown} alt="dropdown" />
                    </div>
                  </div>
                  <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
                  <button>Edit</button>
                </div>
              </div>
            ))}
          </div>
          <div className="subtotal">
            <h1>Subtotal = #{calculateTotal()}</h1>
            <button><HashLink smooth to="#checkout">Checkout</HashLink></button>
          </div>
        </div>
      </section>
      <section id="checkout">
        <div className="checkout-container">
          <div className="navlinks">
            <ul>
              <li><HashLink smooth to="#product-listing">Product listing</HashLink></li>
              <li><HashLink smooth to="#cartsection" >Cart</HashLink></li>
              <li><HashLink smooth to="#checkout" className='activenavlink'>Checkout</HashLink></li>
            </ul>
            </div>
            <div className="checkout-summary">
              <span className='active'>Progress <img src={vector} alt="" /></span>
              <span>Shipping <img src={vector} alt="" /></span>
              <span>Order Summary <img src={vector} alt="" /></span>
              <span>Payment <img src={vector} alt="" /></span>
            </div>
            <div className="information">
              <div className="sippping-information">
                <h2>Shipping information</h2>
                <p>
                  Name: Emmanuel Peter <br />
                  Address: No 14, Arulogun road, ojoo Ibadan <br />
                  Phone: +2348147146537 <br />
                  Email: adelakunteslim@gmail.com
                  </p>
              </div>
              <div className="order-summary">
                <h2>Order Summary</h2>
                <span>Item1:</span> <p>OLEVS Dress Watch with Large Easy-Read Analog</p> <br />
                <span>Item2:</span> <p>OLEVS Watch Diamond Business Dress Analog Quartz</p> <br />
              </div>
              <div className="payment">
                <h2>Payment information</h2>
                <p>
                  Subtotal = # {calculateTotal ()} <br />
                  Tax = #100
                  Shippping fee = #5000
                </p>
               <span>Total = {calculateTotal ()}</span> 
              </div>
           
            </div>
               <button>Place Order</button>
        </div>
 
      </section>
      <section id="footer">
        <div className="footer">
            <div className="navlinks">
            <ul>
              <li><HashLink smooth to="#product-listing">Product listing</HashLink></li>
              <li><HashLink smooth to="#cartsection" >Cart</HashLink></li>
              <li><HashLink smooth to="#checkout" >Checkout</HashLink></li>
            </ul>
            </div>
            <div className="footer-info">
            <div className="follow-us">
              <h1>Follow us</h1>
              <Link to=""><img src={vector1}/></Link>
              <Link to=""><img src={vector2}/></Link>
              <Link to=""><img src={vector3}/></Link>
              <Link to=""><img src={vector4}/></Link>
            </div>
            <div className="contact">
            <h1>Contact</h1>   
                 <p>
                  Email: adelakunteslim@gmai.com <br />
                  Adress: 12 Balogun road, Iju-ishaga, Lagos <br />
                  Phone: +2348147164537
                 </p>
            </div>
            </div>
        </div>
        <p className='copyright'>Copyrights @Adelakun Teslim All right reserved</p>
      </section>
    </div>
  );
}

export default App;

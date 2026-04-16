import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import './Navbar.css';

const Navbar = () => {
  const { cart, user } = useContext(AppContext);
  
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">LIBERTY<span className="logo-accent">STORE</span></span>
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Produtos</Link>
          {user?.isAdmin && <Link to="/admin" className="nav-link admin-link">Admin</Link>}
        </div>

        <div className="nav-actions">
          <Link to="/cart" className="nav-cart">
            <ShoppingCart size={24} />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
          <Link to={user ? "/dashboard" : "/login"} className="nav-user">
            <User size={24} />
          </Link>
          <button className="mobile-menu-btn">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

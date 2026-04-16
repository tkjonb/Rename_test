import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Cart State (Persisted in localStorage)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('liberty_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // User Auth State
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('liberty_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Save Cart and User on changes
  useEffect(() => {
    localStorage.setItem('liberty_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('liberty_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('liberty_user');
    }
  }, [user]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    addToast('Produto adicionado ao carrinho!', 'success');
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };
  
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return removeFromCart(id);
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };
  
  const clearCart = () => setCart([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      user, setUser,
      toasts, addToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

import CryptoJS from 'crypto-js';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface CartProduct {
  id: string;
  name: string;
  img: string;
  price: number;
  cantidad: number;
}

interface CartContextType {
  cart: CartProduct[];
  agregarProducto: (product: CartProduct) => void;
  quitarProducto: (productId: string) => void;
  eliminarProducto: (productId: string) => void;
  limpiarCarrito: () => void;
  obtenerCantidadProducto: (productId: string) => number;
  totalProductos: () => number;
  totalCarrito: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

const ENCRYPTION_KEY = 'your-secret-key'; // ¡CAMBIA ESTO POR UNA CLAVE SEGURA EN PRODUCCIÓN!

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    const loadCartFromLocalStorage = () => {
      try {
        const encryptedCart = localStorage.getItem('cart');
        if (encryptedCart) {
          const decryptedBytes = CryptoJS.AES.decrypt(encryptedCart, ENCRYPTION_KEY);
          const decryptedCart = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
          setCart(decryptedCart);
        }
      } catch (error) {
        console.error('Error loading cart from local storage:', error);
        localStorage.removeItem('cart'); // Clear corrupted data
      }
    };
    loadCartFromLocalStorage();
  }, []);

  useEffect(() => {
    const saveCartToLocalStorage = () => {
      try {
        if (cart.length > 0) {
          const encryptedCart = CryptoJS.AES.encrypt(JSON.stringify(cart), ENCRYPTION_KEY).toString();
          localStorage.setItem('cart', encryptedCart);
        } else if (localStorage.getItem('cart')) {
          localStorage.removeItem('cart'); // Clear cart if it's empty
        }
      } catch (error) {
        console.error('Error saving cart to local storage:', error);
      }
    };
    saveCartToLocalStorage();
  }, [cart]);

  const agregarProducto = (product: CartProduct) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingProductIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingProductIndex].cantidad += product.cantidad;
        return newCart;
      }
      return [...prevCart, { ...product }];
    });
  };

  const quitarProducto = (productId: string) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.id === productId);
      if (existingProductIndex > -1) {
        const newCart = [...prevCart];
        if (newCart[existingProductIndex].cantidad > 1) {
          newCart[existingProductIndex].cantidad -= 1;
          return newCart;
        } else {
          return prevCart.filter((item) => item.id !== productId);
        }
      }
      return prevCart;
    });
  };

  const eliminarProducto = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const limpiarCarrito = () => {
    setCart([]);
  };

  const obtenerCantidadProducto = (productId: string) => {
    const product = cart.find((item) => item.id === productId);
    return product ? product.cantidad : 0;
  };

  const totalProductos = () => {
    return cart.reduce((total, item) => total + item.cantidad, 0);
  };

  const totalCarrito = () => {
    return cart.reduce((total, item) => total + (item.price * item.cantidad), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        agregarProducto,
        quitarProducto,
        eliminarProducto,
        limpiarCarrito,
        obtenerCantidadProducto,
        totalProductos,
        totalCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

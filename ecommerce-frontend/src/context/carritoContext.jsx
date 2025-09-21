import CryptoJS from 'crypto-js';
import React, { createContext, useEffect, useState } from 'react';

const CarritoContext = createContext();

const CarritoProvider = (props) => {
  const [carrito, setCarrito] = useState([]);
  const [consent, setConsent] = useState(null);
  const ENCRYPTION_KEY = 'gusCryp';

 
  // Recuperar el consentimiento al cargar el componente
  useEffect(() => {
    const userConsent = localStorage.getItem('consent');
    if (userConsent) {
      setConsent(userConsent === 'true');
    }
  }, []);

  // Guardar el consentimiento en localStorage cuando cambia
  useEffect(() => {
    if (consent !== null) {
      localStorage.setItem('consent', consent.toString());
    }
  }, [consent]);

  // Recuperar el carrito de localStorage si hay consentimiento
  useEffect(() => {
    console.log(consent)
    if (consent) {
      const encryptedCarrito = localStorage.getItem('carrito');
      const timestamp = localStorage.getItem('carrito-timestamp');
      console.log(encryptedCarrito,timestamp)

      if (encryptedCarrito && timestamp) {
        const now = new Date().getTime();
        const oneMonth = 30 * 24 * 60 * 60 * 1000;

        if (now - parseInt(timestamp) < oneMonth) {
          try {
            const bytes = CryptoJS.AES.decrypt(encryptedCarrito, ENCRYPTION_KEY);
            const decryptedCarrito = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            setCarrito(decryptedCarrito);
          } catch (e) {
            console.error('Error al desencriptar el carrito:', e);
            // Manejar el error de desencriptación
          }
        } else {
          // Limpiar carrito expirado
          setCarrito([]);
        }
      }
    }
  }, [consent]);

  // Guardar el carrito en localStorage cuando cambia
  useEffect(() => {

    if (consent && carrito.length > 0) {
      try {
        const encryptedCarrito = CryptoJS.AES.encrypt(JSON.stringify(carrito), ENCRYPTION_KEY).toString();
        localStorage.setItem('carrito', encryptedCarrito);
        localStorage.setItem('carrito-timestamp', new Date().getTime().toString());
      } catch (e) {
        console.error('Error al encriptar el carrito:', e);
      }
    } else {
      // Limpiar localStorage si no hay consentimiento o carrito vacío
      localStorage.removeItem('carrito');
      localStorage.removeItem('carrito-timestamp');
    }
  }, [carrito, consent]);


  const agregarProducto = (producto) => {
    const productoExistente = carrito.find(p => p.id === producto.id);
    if (productoExistente) {
      setCarrito(carrito.map(p => 
        p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const quitarProducto = (producto) => {
    const productoExistente = carrito.find(p => p.id === producto.id);
    if (productoExistente.cantidad === 1) {
      setCarrito(carrito.filter(p => p.id !== producto.id));
    } else {
      setCarrito(carrito.map(p => 
        p.id === producto.id ? { ...p, cantidad: p.cantidad - 1 } : p
      ));
    }
  };

  const eliminarProducto = (productoId) => {
    setCarrito(carrito.filter(p => p.id !== productoId));
  };

  const obtenerCantidadProducto = (productoId) => {
    const producto = carrito.find(p => p.id === productoId);
    return producto ? producto.cantidad : 0;
  };

  const limpiarCarrito = () => {
    setCarrito([])
  }

  const totalProductos = carrito.length;
  const totalCarrito = carrito.reduce((acc, p) => acc + (p.bundlePrice || 0) * p.cantidad, 0);

  return (
    <CarritoContext.Provider value={{ carrito, agregarProducto, quitarProducto, eliminarProducto, obtenerCantidadProducto, totalProductos, totalCarrito, setConsent, consent,limpiarCarrito }}>
      {props.children}
    </CarritoContext.Provider>
  );
};

export { CarritoContext, CarritoProvider };

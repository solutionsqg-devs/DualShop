import axios from 'axios';
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { CarritoContext } from '../../../context/carritoContext';


const Carrito = ({ handleCarritoClose }) => {
  const { carrito, quitarProducto, agregarProducto, eliminarProducto, totalCarrito, limpiarCarrito } = useContext(CarritoContext);
  const [mostrarDatos, setMostrarDatos] = useState(false);
  const [lastOrderCode, setLastOrderCode] = useState("#0-000");
  const [datosCompra, setDatosCompra] = useState({
    nombreApellido: '',
    telefono: '',
    banderaTelefono: '🏳️‍⚧️',
    codigoPais: '+54',
    direccion: '',
    cantidadArticulos: carrito.length,
    totalPagar: totalCarrito ? totalCarrito.toFixed(2) : '0.00',
    observacion: '',
    vendedor:''
  });

  const toggleDatosCompra = () => {
    setMostrarDatos(!mostrarDatos);
  };

  const generateOrderCode = (lastCode) => {
    let [prefix, suffix] = lastCode.split('-');
    prefix = parseInt(prefix.slice(1));
    suffix = parseInt(suffix);

    if (suffix < 999) {
      suffix++;
    } else {
      suffix = 1;
      prefix++;
    }

    return `#${prefix}-${suffix.toString().padStart(3, '0')}`;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDatosCompra({ ...datosCompra, [name]: value });
  };

  const handleComprar = async () => {
    const newOrderCode = generateOrderCode(lastOrderCode);

    const productos = carrito.map(producto => ({
      id: producto.id,
      cantidadItems: producto.cantidad,
      valorTotal: (producto.bundlePrice || 0) * producto.cantidad,
    }));

    const totalItems = productos.reduce((total, producto) => total + producto.cantidadItems, 0);
    const totalValor = productos.reduce((total, producto) => total + producto.valorTotal, 0);

    const orderRequest = {
      orderCode: newOrderCode,
      fechaHora: new Date().toISOString(),
      cantidadItems: totalItems,
      valorTotal: totalValor.toFixed(2),
      estado: "pendiente",
      tipo: datosCompra.direccion,
      cliente:datosCompra.nombreApellido,
      vendedor:'Catalogo',
      orderItems: productos,
      observacion: datosCompra.observacion // Aquí también se puede incluir la observación general
    };

    Swal.fire({
      title: "<strong>Confirmar compra</strong>",
      icon: "success",
      html: `
      <div class='over-swal'>
      <p><b>Nombre y Apellido:</b> ${datosCompra.nombreApellido}</p>
      <p><b>Teléfono:</b> ${datosCompra.banderaTelefono} ${datosCompra.codigoPais} ${datosCompra.telefono}</p>
      <p><b>Dirección:</b> ${datosCompra.direccion}</p>
      <p><b>Observación:</b> ${datosCompra.observacion}</p>
      <p><b>Total a Pagar:</b> $${totalCarrito ? totalCarrito.toFixed(2) : '0.00'}</p>
      </div>
      `,
    background: "url('https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWxmdXNraTJjZWZxdmtlcTUwNmZzZXdobzI4c2xjbGpjcGd0YXVscCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MJkPUQgZZHZ5jYHwlF/giphy.webp')",
    customClass:{
      popup:'custom-swal'
    },
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: `<i class="fa fa-thumbs-up"></i> Confirmar`,
      cancelButtonText: `<i class="fa fa-thumbs-down"></i> Cancelar`
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post('http://192.168.100.66:8080/api/suppliers', orderRequest);
          console.log('Pedido realizado:', response.data);
          console.log(orderRequest)
          limpiarCarrito();
          setLastOrderCode(newOrderCode);
          setMostrarDatos(false);
          handleCarritoClose();
          Swal.fire("Pedido realizado!", "", "success");
        } catch (error) {
          console.error('Error al realizar el pedido:', error);
          Swal.fire("Error al realizar el pedido", error.message, "error");
        }
      }
    });
  };

  const handleVolverProductos = () => {
    setMostrarDatos(false);
  };

  const handleSeguirNavegando = () => {
    toggleDatosCompra();
    handleCarritoClose();
  };

  return (
    <div className='mi-carrito'>
      {carrito.length === 0 ? (
        <div className='carrito-vacio'>
          <div className='car'><i className="fa-solid fa-cart-shopping"></i></div>
          <div className='emp'><i className="fa-brands fa-yelp"></i></div>
          <p>Carrito vacío</p>
          <p>¡Explore el catálogo y agregue artículos a su carrito!</p>
          <div className='boton-clo'>
            <button type="button" onClick={handleSeguirNavegando} aria-label="Toggle navigation">
              Seguir navegando
            </button>
          </div>
        </div>
      ) : (
        !mostrarDatos ? (
          <div className='final'>
            <div className='productos-contenedor'>
              {carrito.map(producto => (
                <div key={producto.id} className="producto-carrito">
                  <div className='header-carrito'>
                    <button className="eliminar-producto" onClick={() => eliminarProducto(producto.id)}>&times;</button>
                    <div><img src={producto.img} alt={producto.name} width={100} /></div>
                    <div className='detalle-header'>
                      <p className='nom-carr-pro'>{producto.name}</p>
                      <p className='det-carr-pro'>{producto.detail}</p>
                    </div>
                  </div>
                  <div className='body-carrito'>
                    <p className="tooltip1">
                      P.U: ${producto.unitPrice ? Math.floor(producto.unitPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 'N/A'}
                      <sup className='centavos'>{producto.unitPrice ? producto.unitPrice.toFixed(2).split('.')[1] : '00'}</sup>
                    </p>
                    <p className="tooltip2">
                      ST: ${producto.bundlePrice && producto.cantidad ? Math.floor(producto.bundlePrice * producto.cantidad).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 'N/A'}
                      <sup className='centavos'>{(producto.bundlePrice && producto.cantidad && (producto.bundlePrice * producto.cantidad).toFixed(2).split('.')[1]) || '00'}</sup>
                    </p>
                    <div className="boton-carrito">
                      <button className="boton-carrito-menos" onClick={() => quitarProducto(producto)}>-</button>
                      <div className="boton-carrito-cantidad">
                        <span className="cantidad-texto">{producto.cantidad}</span>
                        <div className="onda-energia"></div>
                      </div>
                      <button className="boton-carrito-mas" onClick={() => agregarProducto(producto)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="total-carrito">
              <div className='header-total-carrito'>
                <p>Total a pagar:</p>
                <p>${totalCarrito ? totalCarrito.toFixed(2) : '0.00'}</p>
              </div>
              <div className='body-total-carrito'>
                <button className="comprar-button" onClick={toggleDatosCompra}>Continuar para finalizar</button>
              </div>
            </div>
          </div>
        ) : (
          <div className='datos-compra'>
            <div className='header-compra-final'>
            <button type="button" className="volver-button" onClick={handleVolverProductos}><i className="fa-solid fa-chevron-left"></i> Volver a productos</button>
            <h5>Completar datos para finalizar la compra</h5>
            </div>
            <form className='formu-carri-final'>

              <div className='section-carri'>
              <label htmlFor="nombreApellido">Nombre y apellido</label>
              <input type="text" id="nombreApellido" name="nombreApellido" value={datosCompra.nombreApellido} onChange={handleInputChange} style={{width:'90%',marginLeft:'20px'}} required />
              </div>

              <div className='section-carri'>
              <label htmlFor="telefono">Teléfono</label>
              <div style={{display:'flex',flexDirection:'row'}}>
              <select id="banderaTelefono" name="banderaTelefono" value={datosCompra.banderaTelefono} onChange={handleInputChange} style={{margin:'0px 20px'}} required>
                <option value="🏳️‍⚧️">🏳️‍⚧️</option>
                <option value="🇦🇷">🇦🇷</option>
              </select>
              <input type="text" id="telefono" name="telefono" value={datosCompra.telefono} onChange={handleInputChange} required style={{width:'70%'}}/>
              </div>
              </div>

              <div className='section-carri'>
              <label htmlFor="direccion">Dirección</label>
              <input type="text" id="direccion" name="direccion" value={datosCompra.direccion} onChange={handleInputChange} style={{width:'90%',marginLeft:'20px'}} required />
              </div>

              <div className='section-carri'>
              <label htmlFor="observacion">Observación</label>
              <textarea id="observacion" name="observacion" value={datosCompra.observacion} onChange={handleInputChange}  style={{width:'90%',marginLeft:'20px'}} ></textarea>
              </div>

              <div className="total-carrito">
                <div className="header-total-carrito">
                <p>Total a pagar:</p>
                <p>${totalCarrito ? totalCarrito.toFixed(2) : '0.00'}</p>
                </div>
                <div className="body-total-carrito">
                <button type="button" className="comprar-button" onClick={handleComprar}>Finalizar compra</button>
                </div>
              </div>
            </form>
          </div>
        )
      )}
    </div>
  );
};

export default Carrito;
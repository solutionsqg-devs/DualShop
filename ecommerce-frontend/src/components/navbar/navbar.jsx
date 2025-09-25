import React, { useContext, useState } from 'react';
import { CarritoContext } from '../../context/carritoContext';
import Carrito from './divicion/carrito';
import Contacto from './divicion/contacto';

const Navbar = ({ onSearchChange }) => {
    const { totalProductos, totalCarrito } = useContext(CarritoContext);
    const [sobreNosotrosOpen, setSobreNosotrosOpen] = useState(false);
    const [carritoOpen, setCarritoOpen] = useState(false);
    const [overlayOpen, setOverlayOpen] = useState(false);

    const handleSobreNosotrosOpen = () => {
        setSobreNosotrosOpen(true);
        setOverlayOpen(true);
    };

    const handleSobreNosotrosClose = () => {
        setSobreNosotrosOpen(false);
        setOverlayOpen(false);
    };

    const handleCarritoOpen = () => {
        setCarritoOpen(true);
        setOverlayOpen(true);
    };

    const handleCarritoClose = () => {
        setCarritoOpen(false);
        setOverlayOpen(false);
    };

    return (
        <nav className="navbar nav-conf">
            <div className="container-fluid contenedor-mobil">
                <div className="sobre-nosotros">
                    <a className="btn color-btmSN" href="#" onClick={handleSobreNosotrosOpen}>
                        Sobre nosotros
                    </a>
                    <div className={`offcanvas offcanvas-start ${sobreNosotrosOpen ? 'show' : ''}`} tabIndex="1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div className="offcanvas-header heder-carri">
                            <h5 className="offcanvas-title" id="offcanvasExampleLabel" style={{color:'white'}}>Sobre Nosotros</h5>
                            <button type="button" className="btn-close text-reset" onClick={handleSobreNosotrosClose} aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <Contacto />
                        </div>
                    </div>
                </div>
                <div className="titulo-kiostore">
                    <a className="navbar-brand open-sans-custom" href="http://localhost:3000/">kiostore</a>
                </div>
                <div className="buscador">
                    <input type="text" className='serch' onChange={(e) => onSearchChange(e.target.value)} placeholder="Buscar productos..." />
                </div>
                <div className="boton-carrito-navb">
                    <button className="navbar-toggler" type="button" onClick={handleCarritoOpen}>
                        <i className="fa-solid fa-cart-arrow-down"></i><span className='total-a-pagar-boton'>${totalCarrito.toFixed(2)}</span><span className='cant-prod-cart'>{totalProductos}</span>
                    </button>
                </div>
                <div className={`offcanvas offcanvas-end ${carritoOpen ? 'show' : ''}`} tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header heder-carri">
                        <div>
                            <button type="button" onClick={handleCarritoClose} aria-label="Close" className='btnClose'><i className="fa-solid fa-chevron-left"></i></button>
                        </div>
                        <h5 className="offcanvas-title titulo-carrito" id="offcanvasNavbarLabel">Mi carrito</h5>
                    </div>
                    <div className="offcanvas-body mi-carrito">
                        <Carrito  handleCarritoClose={handleCarritoClose}/>
                    </div>
                </div>
            </div>
            {overlayOpen && <div className="overlay" onClick={() => {handleSobreNosotrosClose(); handleCarritoClose();}}></div>}
        </nav>
    );
};

export default Navbar;

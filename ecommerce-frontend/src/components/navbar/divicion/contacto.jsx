import React from 'react';

const Contacto = () => {
    return (
       <div className='container py-3 Contenedor-contacto'>
        
        {/* conocenos */}
        <div className="row mb-4">
         <div className="col-12">
          <div className='conocenos card p-3'>
            <h4>CONOCENOS</h4>
            <p> 🚚 ENTREGAS EN 24 HS CABA Y GBA</p>
            <p> 📌 PRECIOS UNITARIOS</p>
            <p> 💵 PAGO EFECTIVO</p>
            <p> 📦 COMPRA MINIMA EN LA</p>
            <p style={{paddingLeft:'33px'}}>DESCRIPCIÓN DEL ARTICULO</p>
          </div>
         </div>
        </div>
        {/* fin-conocenos */}

        {/* contacto */}
        <div className="row mb-4">
        <div className="col-12"> 
        <div className='contacto card p-3'>
            <h4>CONTACTO</h4>
            <p className="contact-item ">
                <span className="icon-wrapper">
                    <i className="fa-brands fa-whatsapp"></i>
                </span>
                <span className="contact-text">+541130698622</span>
            </p>
            <p className="contact-item">
                <span className="icon-wrapper">
                    <i className="fa-regular fa-envelope"></i>
                </span>
                <span className="contact-text">Kiostore.Ok@gmail.com</span>
            </p>
            <p className="contact-item">
                <span className="icon-wrapper">
                    <i className="fa-solid fa-phone"></i>
                </span>
                <span className="contact-text">+541164833040</span>
            </p>
        </div>
        </div>
        </div>
        {/* fin-contacto */}

        {/* entrega */}
        <div className="row mb-4">
        <div className="col-12"> 
        <div className='entrega card p-3'>
            <h4>ENTREGA</h4>
            <p>¡Descubre nuestros alfajores, galletitas y productos de limpieza! Perfectos para kioscos y almacenes pequeños. ¡Calidad y precio inmejorables!</p>
            {/* speach 1
            ¡Descubre nuestros alfajores, galletita y productos de limpieza! Perfectos para kioscos y almacenes pequeños. ¡Calidad y precio inmejorables!
            */}
            {/* speach 2
            ¡Alfajores, galletitas y limpieza! Ideal para kioscos y almacenes. ¡Calidad y precio inmejorables!
            */}
            {/* speach 3
            ¡Variedad en alfajores, galletitas y limpieza! Perfecto para tu kiosco o almacén. ¡Calidad garantizada! 
            */}
            {/* speach 4
            ¡Mejora tu kiosco con nuestros productos! Alfajores, galletitas y limpieza a los mejores precios.
            */}
        </div>
        </div>
        </div>
        {/* fin-entrega */}

       </div>

    );
}

export default Contacto;
import React, { useContext, useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap'; // Importar el Carousel de react-bootstrap
import { CarritoContext } from '../../context/carritoContext';
import Navbar from '../navbar/navbar';


const Home = () => {
    const { agregarProducto, quitarProducto, obtenerCantidadProducto } = useContext(CarritoContext);
    const [productos, setProductos] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Inicio');
    const [searchText, setSearchText] = useState('');
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [categoriasVisible, setCategoriasVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

    useEffect(() => {
        fetch('http://localhost:8080/api/products')
        .then(response => response.json())
        .then(data => {
            if (data) {
                // Asegurarse de que cada producto tenga un 'img' con la ruta completa del backend
                const updatedData = data.map(product => ({
                    ...product,
                    img: product.img ? `http://localhost:8080${product.img}` : '' // Ruta completa de la imagen
                }));
                setProductos(updatedData);
            }
        })
        .catch(error => console.error('Error fetching products:', error));

        const handleResize = () => setIsMobile(window.innerWidth <= 688);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    // Verificar si productos está definido antes de mapear
    const categorias = productos.length > 0 ? [...new Set(productos.map(producto => producto.category))] : [];

    const handleCategoriaClick = (categoria) => {
        setCategoriaSeleccionada(categoria);
        setCategoriasVisible(false); // Hide categories on selection
    };

    const handleSearchChange = (text) => {
        setSearchText(text);
        setCategoriaSeleccionada('Inicio');
    };

    const productosFiltrados = productos.filter(producto => {
        const matchesCategory = categoriaSeleccionada === 'Inicio' || producto.category === categoriaSeleccionada;
        const matchesSearch = producto.name.toLowerCase().includes(searchText.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleCardClick = (producto) => {
        setProductoSeleccionado(producto);
    };

    const closeModal = () => {
        setProductoSeleccionado(null);
    };

    const toggleCategorias = () => {
        setCategoriasVisible(!categoriasVisible);
    };
 // Función para agrupar los productos de cada categoría en pares de dos
 const agruparProductosEnPares = (productosCategoria) => {
    let pares = [];
    for (let i = 0; i < productosCategoria.length; i += 2) {
        if (i + 1 < productosCategoria.length) {
            pares.push([productosCategoria[i], productosCategoria[i + 1]]);
        } else {
            pares.push([productosCategoria[i]]);
        }
    }
    return pares;
};

    return (
        <>
          <Navbar onSearchChange={handleSearchChange} totalProductos={productosFiltrados.length} />
          <div className={`contenedor-home ${productoSeleccionado ? 'blur-background' : ''}`}>
              {/* categorias MOBILE */}
              {isMobile && (
                 <div className="categoria-home">
                  <div className={`categoria-list ${categoriasVisible ? 'visible' : ''}`}>
                      <h4>Categorias</h4>
                      <ul>
                          <li key="inicio-mobile" onClick={() => handleCategoriaClick('Inicio')}>Inicio</li>
                          {categorias.map(categoria => (
                              <li key={categoria} onClick={() => handleCategoriaClick(categoria)}>
                                  {categoria}
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>
              )}
             
              {/* FIN categorias */}
              {/* categorias PC */}
              {!isMobile && (
                 <div className="categoria-home">
                  <div className={`categoria-list ${categoriasVisible ? '' : 'visible'}`}>
                      <h4>Categorias</h4>
                      <ul>
                          <li key="inicio-pc" onClick={() => handleCategoriaClick('Inicio')}>Inicio</li>
                          {categorias.map(categoria => (
                              <li key={categoria} onClick={() => handleCategoriaClick(categoria)}>
                                  {categoria}
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>
              )}
             
              {/* FIN categorias */}

              {/* busqueda productos */}
              <div className="productos-home" >
                  {searchText ? (
                      <div className={`bloque ${isMobile ? 'bloque-mobile' : ''}`}>
                          <h4>Resultados de búsqueda: <span>({productosFiltrados.length})</span></h4>
                          <div className="contenedor-productos row">
                              {productosFiltrados.map(producto => {
                                  const cantidad = obtenerCantidadProducto(producto.id);
                                  return (
                                      <div className="prod-card col-12 col-md-6 col-lg-4" key={producto.id} onClick={() => handleCardClick(producto)}>
                                          <div className="imagen-card"><img src={producto.img} alt={producto.name} /></div>
                                          <div className="info-card">
                                              <p className='nombre-prod'>{producto.name}</p>
                                              <p className="detelle-prod">{producto.detail}</p>
                                              <p className="precio-prod">
                                                <span>Precio Unitario:</span> ${producto.unitPrice ? Math.floor(producto.unitPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 'N/A'}
                                                <sup className="centavos">{producto.unitPrice ? producto.unitPrice.toFixed(2).split('.')[1] : '00'}</sup>
                                              </p>
                                          </div>
                                          <div className="boton-card">
                                              {cantidad > 0 ? (
                                                  <>
                                                      <button onClick={(e) => { e.stopPropagation(); quitarProducto(producto); }} className='minus'><i className="fa-solid fa-circle-minus"></i></button>
                                                      <span className='cant'>{cantidad}</span>
                                                      <button onClick={(e) => { e.stopPropagation(); agregarProducto(producto); }}><i className="fa-solid fa-circle-plus"></i></button>
                                                  </>
                                              ) : (
                                                  <button onClick={(e) => { e.stopPropagation(); agregarProducto(producto); }}><i className="fa-solid fa-circle-plus"></i></button>
                                              )}
                                          </div>
                                      </div>
                                  );
                              })}
                          </div>
                      </div>
                  ) : (
                      <>
                          {categoriaSeleccionada === 'Inicio' ? (
                              categorias.map(categoria => {
                                  let productosCategoria 
                                  if(isMobile){
                                    productosCategoria = productos.filter(producto => producto.category === categoria);
                                    let pares = agruparProductosEnPares(productosCategoria)
                                    return (
                                        <div className="bloque" key={categoria}>
                                            <h4>{categoria} <span><a href="#" onClick={() => handleCategoriaClick(categoria)}>ver todo ({productos.filter(producto => producto.category === categoria).length})</a></span></h4>
                                            <p className='msj-oc'>Deslice hacia la derecha o izquierda</p>
                                            <div className="contenedor-productos row">
                                                {/* Si le saco el interval se mueven solos los productos */}
                                                <Carousel interval={null} controls={false} indicators={true} className='control-carousel'>
                                                    {pares.map((par, index) => {
                                                       const cantidad1 = obtenerCantidadProducto(par[0].id);
                                                       const cantidad2 = par[1] ? obtenerCantidadProducto(par[1].id) : 0;
                                                        return (
                                                            <Carousel.Item key={`${par[0].id}-${par[1] ? par[1].id : 'new'}-${index}`}>
                                                                 <div className="prod-card col-12 col-md-6 col-lg-4" onClick={() => handleCardClick(par[0])}>
                                                                 <div className="imagen-card"><img src={par[0].img} alt={par[0].name} width={70} /></div>
                                                                 <div className="info-card">
                                                                 <p className='nombre-prod'>{par[0].name}</p>
                                                                 <p className="detelle-prod">{par[0].detail}</p>
                                                                 <p className="precio-prod">
                                                                 <span>Precio Unitario:</span> ${par[0].unitPrice ? Math.floor(par[0].unitPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 'N/A'}
                                                                  <sup className="centavos">{par[0].unitPrice ? par[0].unitPrice.toFixed(2).split('.')[1] : '00'}</sup>
                                                                 </p>
                                                                 </div>
                                                                 <div className="boton-card">
                                                                    {cantidad1 > 0 ? (
                                                                         <>
                                                                        <button onClick={(e) => { e.stopPropagation(); quitarProducto(par[0]); }} className='minus'><i className="fa-solid fa-circle-minus"></i></button>
                                                                        <span className='cant'>{cantidad1}</span>
                                                                        <button onClick={(e) => { e.stopPropagation(); agregarProducto(par[0]); }}><i className="fa-solid fa-circle-plus"></i></button>
                                                                          </>
                                                                      ) : ( <button onClick={(e) => { e.stopPropagation(); agregarProducto(par[0]); }}><i className="fa-solid fa-circle-plus"></i></button>)}
                                                                 </div>
                                                                 </div>
                                                                 {par[1] && (
                                                                    <div className="prod-card col-12 col-md-6 col-lg-4" onClick={() => handleCardClick(par[1])}>
                                                                 <div className="imagen-card"><img src={par[1].img} alt={par[1].name} width={70} /></div>
                                                                 <div className="info-card">
                                                                 <p className='nombre-prod'>{par[1].name}</p>
                                                                 <p className="detelle-prod">{par[1].detail}</p>
                                                                 <p className="precio-prod">
                                                                 <span>Precio Unitario:</span> ${par[1].unitPrice ? Math.floor(par[1].unitPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 'N/A'}
                                                                  <sup className="centavos">{par[1].unitPrice ? par[1].unitPrice.toFixed(2).split('.')[1] : '00'}</sup>
                                                                 </p>
                                                                 </div>
                                                                 <div className="boton-card">
                                                                    {cantidad2 > 0 ? (
                                                                         <>
                                                                        <button onClick={(e) => { e.stopPropagation(); quitarProducto(par[1]); }} className='minus'><i className="fa-solid fa-circle-minus"></i></button>
                                                                        <span className='cant'>{cantidad2}</span>
                                                                        <button onClick={(e) => { e.stopPropagation(); agregarProducto(par[1]); }}><i className="fa-solid fa-circle-plus"></i></button>
                                                                          </>
                                                                      ) : ( <button onClick={(e) => { e.stopPropagation(); agregarProducto(par[1]); }}><i className="fa-solid fa-circle-plus"></i></button>)}
                                                                 </div>
                                                                 </div>
                                                                 )}

                                                            </Carousel.Item>
                                                        )
                                                    })}
                                                </Carousel>
                                            </div>
                                        </div>
                                );
                                } 
                                  else{productosCategoria = productos.filter(producto => producto.category === categoria).slice(0, 6);
                            
                                  return (
                                      <div className="bloque" key={categoria}>
                                          <h4>{categoria} <span><a href="#" onClick={() => handleCategoriaClick(categoria)}>ver todo ({productos.filter(producto => producto.category === categoria).length})</a></span></h4>
                                          <div className="contenedor-productos row">
                                              {productosCategoria.map(producto => {
                                                  const cantidad = obtenerCantidadProducto(producto.id);
                                                  return (
                                                      <div className="prod-card col-12 col-md-6 col-lg-4" key={producto.id} onClick={() => handleCardClick(producto)}>
                                                          <div className="imagen-card"><img src={producto.img} alt={producto.name} width={100} /></div>
                                                          <div className="info-card">
                                                              <p className='nombre-prod'>{producto.name}</p>
                                                              <p className="detelle-prod">{producto.detail}</p>
                                                              <p className="precio-prod">
                                                              <span>Precio Unitario:</span> ${producto.unitPrice ? Math.floor(producto.unitPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 'N/A'}
                                                                  <sup className="centavos">{producto.unitPrice ? producto.unitPrice.toFixed(2).split('.')[1] : '00'}</sup>
                                                              </p>
                                                          </div>
                                                          <div className="boton-card">
                                                              {cantidad > 0 ? (
                                                                  <>
                                                                      <button onClick={(e) => { e.stopPropagation(); quitarProducto(producto); }} className='minus'><i className="fa-solid fa-circle-minus"></i></button>
                                                                      <span className='cant'>{cantidad}</span>
                                                                      <button onClick={(e) => { e.stopPropagation(); agregarProducto(producto); }}><i className="fa-solid fa-circle-plus"></i></button>
                                                                  </>
                                                              ) : (
                                                                  <button onClick={(e) => { e.stopPropagation(); agregarProducto(producto); }}><i className="fa-solid fa-circle-plus"></i></button>
                                                              )}
                                                          </div>
                                                      </div>
                                                  );
                                              })}


                                          </div>

                                      </div>
                                  );}
                            //  FIN CATEGORIAS.MAP
                              })
                            //   FIN DE INICIO
                          ) : (
                              <div className={`bloque ${isMobile ? 'bloque-categoria-mobile' : ''}`}>
                                  <h4 className='tituloC'>{categoriaSeleccionada} <span>total ({productosFiltrados.length})</span></h4>
                                  <div className="contenedor-productos row">
                                      {productosFiltrados.map(producto => {
                                          const cantidad = obtenerCantidadProducto(producto.id);
                                          return (
                                              <div className="prod-card col-12 col-md-6 col-lg-4" key={producto.id} onClick={() => handleCardClick(producto)}>
                                                  <div className="imagen-card"><img src={producto.img} alt={producto.name} width={70} /></div>
                                                  <div className="info-card">
                                                      <p className='nombre-prod'>{producto.name}</p>
                                                      <p className="detelle-prod">{producto.detail}</p>
                                                      <p className="precio-prod">
                                                      <span>Precio Unitario:</span> ${producto.unitPrice ? Math.floor(producto.unitPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 'N/A'}
                                                          <sup className="centavos">{producto.unitPrice ? producto.unitPrice.toFixed(2).split('.')[1] : '00'}</sup>
                                                      </p>
                                                  </div>
                                                  <div className="boton-card">
                                                      {cantidad > 0 ? (
                                                          <>
                                                              <button onClick={(e) => { e.stopPropagation(); quitarProducto(producto); }} className='minus'><i className="fa-solid fa-circle-minus"></i></button>
                                                              <span className='cant'>{cantidad}</span>
                                                              <button onClick={(e) => { e.stopPropagation(); agregarProducto(producto); }}><i className="fa-solid fa-circle-plus"></i></button>
                                                          </>
                                                      ) : (
                                                          <button onClick={(e) => { e.stopPropagation(); agregarProducto(producto); }}><i className="fa-solid fa-circle-plus soli"></i></button>
                                                      )}
                                                  </div>
                                              </div>
                                          );
                                      })}
                                  </div>
                              </div>
                          )}




                      </>
                  )}
              </div>
              {/* FIN busqueda productos */}

              {/* modal producto seleccionado */}
              {productoSeleccionado && (
                  <div className="modal-overlay" onClick={closeModal}>
                      <div className={`modal-content ${isMobile ? 'modal-content-mobile' : ''}`} onClick={(e) => e.stopPropagation()}>
                        <div className={`contenido-info ${isMobile ? 'contenido-info-mobile' : ''}`}> 
                        <div className={`contenedor-img-modal ${isMobile ? 'contenedor-img-modal-mobil' : ''}`}>
                          <span className="close-button" onClick={closeModal}>&times;</span>
                          <img src={productoSeleccionado.img} alt={productoSeleccionado.name}/>
                          </div>
                          <div className='footer-model'>
                          <h2>{productoSeleccionado.name}</h2>
                          <p>{productoSeleccionado.detail}</p>
                          <p className="precio-prod">
                          <span>Precio unitario:</span> ${productoSeleccionado.unitPrice ? Math.floor(productoSeleccionado.unitPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 'N/A'}
                            <sup className="centavos-select">{productoSeleccionado.unitPrice ? productoSeleccionado.unitPrice.toFixed(2).split('.')[1] : '00'}</sup>
                          </p>
                          <p>
                            <span>Precio por pack:</span> ${productoSeleccionado.bundlePrice ? Math.floor(productoSeleccionado.bundlePrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 'N/A'}
                            <sup className='centavo-select'>{(productoSeleccionado.bundlePrice && productoSeleccionado.bundlePrice.toFixed(2).split('.')[1]) || '00'}</sup>
                            </p>
                              <div className="boton-card-modal">
                                  {obtenerCantidadProducto(productoSeleccionado.id) > 0 ? (
                                         <>
                                         {obtenerCantidadProducto(productoSeleccionado.id) === 1 ? (
                                             <button onClick={(e) => { e.stopPropagation(); quitarProducto(productoSeleccionado); }} className='trash'>
                                                 <i className="fa-solid fa-trash-can"></i>
                                             </button>
                                         ) : (
                                             <button onClick={(e) => { e.stopPropagation(); quitarProducto(productoSeleccionado); }} className='minus'>
                                                 <i className="fa-solid fa-minus"></i>
                                             </button>
                                         )}
                                         <span className='cant'>{obtenerCantidadProducto(productoSeleccionado.id)}</span>
                                         <button onClick={(e) => { e.stopPropagation(); agregarProducto(productoSeleccionado); }} className='pluss'>
                                         <i className="fa-solid fa-plus"></i>
                                         </button>
                                     </>
                                 ) : (
                                     <button onClick={(e) => { e.stopPropagation(); agregarProducto(productoSeleccionado); }} className='boton-inicial'>
                                         <i className="fa-solid fa-plus"></i>
                                     </button>
                                 )}
                              </div>
                          </div>
                        </div>  
                      </div>
                  </div>
              )}
              {/* modal producto seleccionado */}

              {/* boton vicion de categorias */}
              <button className="mobile-category-button" onClick={toggleCategorias}>
                <span><i className="fa-solid fa-chevron-right"></i></span>
              </button>

              {/* FIN boton vicion de categorias */}
          </div>
      </>
    );
};

export default Home;

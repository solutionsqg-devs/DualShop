import {
  IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem,
  IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar
} from '@ionic/react';
import { cartOutline, close, duplicateOutline } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { useHistory, useParams } from 'react-router';
import UnregisteredItemModal from '../../components/unregisteredItemModal/UnregisteredItemModal';
import { CartContext } from '../../context/CartContext';
import { searchProducts } from './tiendaApi';
import TiendaCart from './tiendaCart';

interface Product {
  id: string;
  name: string;
  detail: string;
  img: string;
  unitPrice: number;
  category: string;
}

interface TiendaListProps {}

const TiendaList: React.FC<TiendaListProps> = () => {
  const { name } = useParams<{ name: string; }>();
  const [products , setProduct] = useState<Product[]>([]);
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [categories, setCategories] = useState<string[]>([]);
  const [showUnregisteredModal, setShowUnregisteredModal] = useState(false);
  const [isListView, setIsListView] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { agregarProducto } = useContext(CartContext)!;

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let result = await searchProducts();
    const uniqueCategories = ['Todas', ...new Set(result.map((product: Product) => product.category))];
    setCategories(uniqueCategories as string[]);
    
    const filtered = result.filter((product: Product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    const updatedProducts = filtered.map((product: Product) => ({
      ...product,
      img: product.img ? `http://localhost:8080${product.img}` : '',
      unitPrice: product.unitPrice ? Number(product.unitPrice) : 0
    }));
    setProduct(updatedProducts);
  };

  useEffect(() => {
    search();
  }, [searchTerm, selectedCategory]);

  const handleAddCart = async (product: Product) => {
    agregarProducto({
      id: String(product.id),
      name: String(product.name),
      img: String(product.img),
      price: product.unitPrice,
      cantidad: 1,
    });
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"></IonButtons>
          <IonTitle>{name}</IonTitle>
          <IonSearchbar 
            value={searchTerm} 
            onIonInput={(e: any) => setSearchTerm(e.target.value)} 
            placeholder="Buscar productos..." 
          />
          <IonButton onClick={() => setIsListView(!isListView)} slot="end">
            {isListView ? 'Ver en Tarjetas' : 'Ver en Lista'}
          </IonButton>
          <IonButton onClick={() => setShowUnregisteredModal(true)} slot="end">
            Vender ítem no registrado
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonContent>
          <IonCard>
            <IonTitle>Tienda de Productos</IonTitle>

            {!isCartOpen && ( // 👈 Ocultamos el botón si el carrito está abierto
              <IonItem>
                <IonButton 
                  onClick={toggleCart} 
                  color="primary" 
                  fill="outline" 
                  slot='end' 
                  size='default'
                >
                  <IonIcon icon={cartOutline}/> Ver carrito
                </IonButton>
              </IonItem>
            )}
            
            {isListView ? (
              <IonGrid>
                {products.map((product: Product) => (
                  <IonRow key={product.id} className="ion-align-items-center ion-padding-vertical list-item">
                    <IonCol size="2"><IonImg src={product.img} className="product-list-image" /></IonCol>
                    <IonCol size="5"><h4>{product.name}</h4><p>{product.detail}</p></IonCol>
                    <IonCol size="3"><p className="ion-text-right">${product.unitPrice.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p></IonCol>
                    <IonCol size="2" className="ion-text-right">
                      <IonButton onClick={() => handleAddCart(product)} color={"danger"} fill="solid" size='small'>
                        <IonIcon icon={duplicateOutline} size='small' />
                      </IonButton>
                    </IonCol>
                  </IonRow>
                ))
                }
              </IonGrid>
            ) : (
              <IonGrid className='table2'>
                {products.map((product: Product) => (
                  <div className='Products' key={product.id}>
                    <div><img alt="Silhouette of mountains" src={product.img} width={260} /></div>
                    <IonCardHeader>
                      <IonCardTitle>{product.name}</IonCardTitle>
                      <IonCardSubtitle>{product.detail}</IonCardSubtitle>
                      <IonCardSubtitle color={'success'} style={{ fontSize: '20px' }}>
                        ${product.unitPrice.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonButton onClick={() => handleAddCart(product)} color={"danger"} fill="solid" size='small'>
                        <IonIcon icon={duplicateOutline} size='small' />
                      </IonButton>
                    </IonCardContent>
                  </div>
                ))
                }
              </IonGrid>
            )
            }
          </IonCard>
        </IonContent>
      </IonContent>

      {showUnregisteredModal && (
        <UnregisteredItemModal
          onClose={() => setShowUnregisteredModal(false)}
          onAddItem={handleAddCart}
        />
      )}

      {/* 🚀 Carrito flotante mejorado */}
      {isCartOpen && (
        <Draggable>
          <div 
            style={{
              position: "fixed",
              top: "80px",
              right: "50px",
              zIndex: 9999,
              width: "450px",     // 👈 más ancho
              height: "600px",    // 👈 más alto
              background: "white",
              border: "2px solid #ccc",
              borderRadius: "12px",
              boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              padding: "12px 16px", 
              background: "#f8f8f8", 
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px" 
            }}>
              <h3 style={{ margin: 0 }}>🛒 Carrito</h3>
              <button 
        onClick={toggleCart}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer",
          zIndex: 10000
        }}
      >
        ✖
      </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
              <TiendaCart />
            </div>
          </div>
        </Draggable>
      )}
    </IonPage>
  );
};

export default TiendaList;

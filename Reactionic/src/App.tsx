import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactHashRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import { CartProvider } from './context/CartContext';
//import Page from './pages/Page';
import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { closeOutline, menuOutline } from 'ionicons/icons';
import { useState } from 'react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/* Theme variables */
import CatalogoOnlineConfigPage from './pages/catalogoOnline/CatalogoOnlineConfigPage';
import CustomerEdit from './pages/customer/CustomerEdit';
import CustomerList from './pages/customer/CustomerList';
import EmployeeEdit from './pages/employee/EmployeeEdit';
import EmployeeList from './pages/employee/EmployeeList';
import EstadisticasPage from './pages/estadisticas/EstadisticasPage';
import ProductEdit from './pages/product/ProductEdit';
import ProductList from './pages/product/ProductList';
import SupplierEdit from './pages/supplier/SupplierEdit';
import SupplierList from './pages/supplier/SupplierList';
import TiendaList from './pages/tienda/tiendaList';
import VentaList from './pages/venta/VentaList';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  console.log('App - isMenuOpen:', isMenuOpen);

  return (
    <IonApp>
      <CartProvider>
        <IonReactHashRouter>
          <IonSplitPane contentId="main" when={isMenuOpen ? false : 'md'}>
            <Menu />
            <IonRouterOutlet id="main">
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Metsys</IonTitle>
                  <IonButtons slot="end">
                    <IonButton onClick={() => {
                      setIsMenuOpen(!isMenuOpen);
                      console.log('Toggle Menu clicked. New isMenuOpen:', !isMenuOpen);
                    }}>
                      <IonIcon icon={isMenuOpen ? closeOutline : menuOutline} />
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <Route path="/" exact={true}>
                <Redirect to="/folder/customers" />
              </Route>
              <Route path="/folder/customers" exact={true}> 
              <CustomerList />
              </Route>
              
              <Route path="/folder/customers/:id" exact={true}> 
              <CustomerEdit />
              </Route>

              <Route path="/folder/employees" exact={true}> 
              <EmployeeList />
              </Route>
              
              <Route path="/folder/employees/:id" exact={true}> 
              <EmployeeEdit />
              </Route>

              
              <Route path="/folder/suppliers" exact={true}> 
              <SupplierList />
              </Route>
              
              <Route path="/folder/suppliers/:id" exact={true}> 
              <SupplierEdit />
              </Route>

              <Route path="/folder/products" exact={true}> 
              <ProductList />
              </Route>
              
              <Route path="/folder/products/:id" exact={true}> 
              <ProductEdit />
              </Route>

              <Route path="/folder/tienda" exact={true}> 
              <TiendaList />
              </Route>
              
              <Route path="/folder/ventas" exact={true}> 
              <VentaList />
              </Route>
              
              <Route path="/folder/ventas/:id" exact={true}> 
              <ProductEdit />
              </Route>

              <Route path="/folder/catalogo-online" exact={true}> 
              <CatalogoOnlineConfigPage />
              </Route>

              <Route path="/folder/estadisticas" exact={true}> 
              <EstadisticasPage />
              </Route>

            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactHashRouter>
      </CartProvider>
    </IonApp>
  );
};

export default App;

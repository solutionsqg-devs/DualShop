import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactHashRouter, IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
//import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import CustomerList from './pages/customer/CustomerList';
import CustomerEdit from './pages/customer/CustomerEdit';
import EmployeeList from './pages/employee/EmployeeList';
import EmployeeEdit from './pages/employee/EmployeeEdit';
import SupplierList from './pages/supplier/SupplierList';
import SupplierEdit from './pages/supplier/SupplierEdit';
import ProductList from './pages/product/ProductList';
import ProductEdit from './pages/product/ProductEdit';
import TiendaList from './pages/tienda/tiendaList';
import TiendaCart from './pages/tienda/tiendaCart';
import VentaList from './pages/venta/VentaList';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactHashRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
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
            
            <Route path="/folder/tienda/cart" exact={true}> 
            <TiendaCart />
            </Route>

            <Route path="/folder/ventas" exact={true}> 
            <VentaList />
            </Route>
            
            <Route path="/folder/ventas/:id" exact={true}> 
            <ProductEdit />
            </Route>

          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactHashRouter>
    </IonApp>
  );
};

export default App;

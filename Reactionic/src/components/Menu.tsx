import {
    IonContent,
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle
} from '@ionic/react';

import { archiveOutline, bagAdd, bagAddOutline, bagCheck, bagCheckOutline, heartOutline, heartSharp, idCard, idCardOutline, people, peopleOutline, storefrontOutline } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import logo from '../images/logo.png';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Clientes',
    url: '/folder/customers',
    iosIcon: peopleOutline,
    mdIcon: people
  },
  {
    title: 'Empleados',
    url: '/folder/employees',
    iosIcon: idCardOutline,
    mdIcon: idCard
  },
  {
    title: 'Poveedores',
    url: '/folder/suppliers',
    iosIcon: archiveOutline,
    mdIcon: archiveOutline
  },
  {
    title: 'Product',
    url: '/folder/products',
    iosIcon: bagAddOutline,
    mdIcon: bagAdd
  },
  {
    title: 'Tienda',
    url: '/folder/tienda',
    iosIcon: storefrontOutline,
    mdIcon: storefrontOutline
  },
  {
    title: 'Ventas',
    url: '/folder/ventas',
    iosIcon: bagCheckOutline,
    mdIcon: bagCheck
  },
  {
    title: 'Catálogo Online',
    url: '/folder/catalogo-online',
    iosIcon: archiveOutline, // Puedes cambiar el icono si hay uno más apropiado
    mdIcon: archiveOutline
  },
  {
    title: 'Estadísticas',
    url: '/folder/estadisticas',
    iosIcon: heartOutline, // Puedes cambiar el icono si hay uno más apropiado
    mdIcon: heartSharp
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>
            <IonImg src={logo} />
          </IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

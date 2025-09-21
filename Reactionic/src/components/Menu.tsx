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

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, trashOutline, trashSharp, warningOutline, warningSharp, people , peopleOutline, bagAddOutline, bagAdd, idCardOutline, idCard, storefrontOutline, bagCheckOutline, bagCheck } from 'ionicons/icons';
import './Menu.css';
import logo from '../images/logo.png'

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
    title: 'Trash',
    url: '/folder/Trash',
    iosIcon: trashOutline,
    mdIcon: trashSharp
  },
  {
    title: 'Spam',
    url: '/folder/Spam',
    iosIcon: warningOutline,
    mdIcon: warningSharp
  }
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

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

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

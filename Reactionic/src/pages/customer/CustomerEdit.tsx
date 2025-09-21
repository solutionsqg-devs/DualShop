import { add, checkmark, close, grid, pencil, search } from 'ionicons/icons';
import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { useEffect, useState } from 'react';
import { removeCustomer, saveCustomer, searchCustomerById, searchCustomers } from './CustomerApi';
import Customer from './Customer';
import React from 'react';
//import ExploreContainer from '../../components/ExploreContainer';

const CustomerEdit: React.FC = () => {
  const { name } = useParams<{name:string;}>();
 
  const [customer , setCustomer] = useState<Customer>({});
  const [toastMsg, setToastMsg] = useState<string>('');

  const history = useHistory();

  const ruteMatch: any = useRouteMatch('/folder/customers/:id');
  const id = ruteMatch?.params?.id;


useEffect(() => {
  search();
},[]);

  const search = async () => {
    if(id === 'new'){
    setCustomer({});
    }else{
      let result = await searchCustomerById(id);
      setCustomer(result);
    }
  }

  const save = async () => {
    await saveCustomer(customer);
    setToastMsg('¡Cliente guardado correctamente!');
    history.push('/folder/customers')
  }
  return (
    <React.Fragment>
    <IonToast isOpen={!!toastMsg} message={toastMsg} icon={checkmark} duration={4000} color='success'  position='top'  onDidDismiss={() => setToastMsg('')}/>

    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
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
        <IonTitle>{id === 'new' ? 'Agregar Cliente' : 'Editar Cliente'}</IonTitle>
        
        <IonItem>
          <IonLabel position='stacked'>Nombre</IonLabel>
          <IonInput onIonChange={e=> customer.firstname = String(e.detail.value)} value={customer.firstname} placeholder="Ingresa tu nombre"></IonInput>
        </IonItem>

        <IonItem>
        <IonLabel position='stacked'>Apellido</IonLabel>
        <IonInput onIonChange={e=> customer.lastname =String(e.detail.value)} value={customer.lastname} placeholder="Ingresa tu apellido"></IonInput>
        </IonItem>

        <IonItem>
        <IonLabel position='stacked'>Email</IonLabel>
        <IonInput onIonChange={e=> customer.email = String(e.detail.value)} value={customer.email} placeholder="ejemplo@ejemplo.com"></IonInput>
        </IonItem>

        <IonItem>
        <IonLabel position='stacked'>Telefono</IonLabel>
        <IonInput onIonChange={e=> customer.phone = String(e.detail.value)} value={customer.phone} placeholder="Ingresá tu numero de celular"></IonInput>
        </IonItem>

        <IonItem>
        <IonLabel position='stacked'>Dirección</IonLabel>
        <IonInput onIonChange={e=> customer.address = String(e.detail.value)} value={customer.address} placeholder="Av. Siempre viva 123"></IonInput>
        </IonItem>

        <IonItem>
          <IonButton onClick={save} color="success" fill="solid" slot='end' size='default'>
            <IonIcon icon={checkmark}/>
            Guardar</IonButton>
        </IonItem>
        </IonCard>


    </IonContent>
    </IonContent>
    </IonPage>
    </React.Fragment>
);
};

export default CustomerEdit;

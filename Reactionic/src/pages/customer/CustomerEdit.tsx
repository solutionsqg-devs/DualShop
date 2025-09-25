import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import Customer from './Customer';
import { saveCustomer, searchCustomerById } from './CustomerApi';
//import ExploreContainer from '../../components/ExploreContainer';

const CustomerEdit: React.FC = () => {
  const { name } = useParams<{name:string;}>();
 
  const [customer , setCustomer] = useState<Customer>({});
  const [toastMsg, setToastMsg] = useState<string>('');
  const [clientType, setClientType] = useState<string>('Minorista'); // Nuevo estado para el tipo de cliente

  const history = useHistory();

  const ruteMatch: any = useRouteMatch('/folder/customers/:id');
  const id = ruteMatch?.params?.id;


useEffect(() => {
  search();
},[]);

  const search = async () => {
    if(id === 'new'){
    setCustomer({});
    setClientType('Minorista'); // Valor por defecto para nuevos clientes
    }else{
      let result = await searchCustomerById(id);
      setCustomer(result);
      setClientType(result.type || 'Minorista'); // Cargar tipo existente o Minorista por defecto
    }
  }

  const save = async () => {
    const customerToSave: Customer = { ...customer, type: clientType };
    await saveCustomer(customerToSave);
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
            {/* <IonMenuButton /> */}
          </IonButtons>
          <IonTitle>Registro de Clientes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Registro de Clientes</IonTitle>
        </IonToolbar>
        </IonHeader>
        
    <IonContent>  
        <IonCard>
        <IonTitle>{id === 'new' ? 'Agregar Nuevo Cliente' : 'Editar Cliente'}</IonTitle>
        
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
          <IonSelect label="Tipo de Cliente" value={clientType} onIonChange={e => setClientType(e.detail.value)} interface="popover">
            <IonSelectOption value="Minorista">Minorista</IonSelectOption>
            <IonSelectOption value="Kiosco">Kiosco</IonSelectOption>
          </IonSelect>
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

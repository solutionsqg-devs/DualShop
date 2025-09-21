import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import Supplier from './Supplier';
import { saveSupplier, searchSupplierById } from './SupplierApi';
import React from 'react';
//import ExploreContainer from '../../components/ExploreContainer';

const SupplierEdit: React.FC = () => {
  const { name} = useParams<{ name:string;}>();

  const [supplier , setSupplier] = useState<Supplier>({});
  const [toastMsg, setToastMsg] = useState<string>('');

  const history = useHistory();

  const ruteMatch: any = useRouteMatch('/folder/suppliers/:id');
  let id = ruteMatch?.params?.id;

useEffect(() => {
  search();
},[history.location.pathname]);


const search = async () => {
  if(id === 'new'){
  setSupplier({});
  }else{
    let result = await searchSupplierById(id);
    setSupplier(result);
  }
}

  const save = async () => {
    await saveSupplier(supplier);
    setToastMsg('Proveedor agregado con exito')
    history.push('/folder/suppliers')
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
        <IonTitle>{id === 'new' ? 'Agregar proovedor' : 'Editar proveedor'}</IonTitle>
        
        <IonItem>
          <IonLabel position='stacked'>Nombre</IonLabel>
          <IonInput onIonChange={e=> supplier.name = String(e.detail.value)} value={supplier.name} placeholder="Ingresa tu nombre"></IonInput>
        </IonItem>

        <IonItem>
        <IonLabel position='stacked'>Contacto</IonLabel>
        <IonInput onIonChange={e=> supplier.contact =String(e.detail.value)} value={supplier.contact} placeholder="Ingresa contacto"></IonInput>
        </IonItem>

        <IonItem>
        <IonLabel position='stacked'>Email</IonLabel>
        <IonInput onIonChange={e=> supplier.email = String(e.detail.value)} value={supplier.email} placeholder="ejemplo@ejemplo.com"></IonInput>
        </IonItem>

        <IonItem>
        <IonLabel position='stacked'>Telefono</IonLabel>
        <IonInput onIonChange={e=> supplier.phone = String(e.detail.value)} value={supplier.phone} placeholder="Ingresá tu numero de celular"></IonInput>
        </IonItem>

        <IonItem>
        <IonLabel position='stacked'>Contacto</IonLabel>
        <IonInput onIonChange={e=> supplier.contact = String(e.detail.value)} value={supplier.contact} placeholder="Av. Siempre viva 123"></IonInput>
        </IonItem>

        <IonItem>
        <IonLabel position='stacked'>Web</IonLabel>
        <IonInput onIonChange={e=> supplier.web = String(e.detail.value)} value={supplier.web} placeholder="Ingresá tu numero de celular"></IonInput>
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

export default SupplierEdit;

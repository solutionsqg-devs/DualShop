import { add, close, pencil } from 'ionicons/icons';
import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { removeCustomer, searchCustomers } from './CustomerApi';
import customer from './Customer';
import Customer from './Customer';
//import ExploreContainer from '../../components/ExploreContainer';

const CustomerList: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const [clientes , setClientes] = useState<Customer[]>([]);
  const history = useHistory();

useEffect(() => {
  search();
},[history.location.pathname]);

  const search = async () => {
    let result = await searchCustomers();
    setClientes(result);
  }
  const remove = async (id:string) =>{
    await removeCustomer(id);
    search();
  }
 
  const addCustomer = () =>{
  history.push('/folder/customers/new')
  }
  const editCustomer = (id:string) =>{
    history.push('/folder/customers/'+ id)
    }
  return (
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
        <IonTitle>Gestión de Clientes</IonTitle>

        <IonItem>
          <IonButton onClick={addCustomer} color="primary" fill="outline" slot='end' size='default'>
            <IonIcon icon={add}/>
            Agregar Cliente</IonButton>
        </IonItem>
        <IonGrid className='table'>
        <IonRow>
          <IonCol>Nombre</IonCol>
          <IonCol>Email</IonCol>
          <IonCol>Telefono</IonCol>
          <IonCol>Dirección</IonCol>
          <IonCol>Acciones</IonCol>
        </IonRow>
        
        {clientes.map((cliente:Customer) =>
        <IonRow>
          <IonCol>{cliente.firstname} {cliente.lastname}</IonCol>
          <IonCol>{cliente.email}</IonCol>
          <IonCol>{cliente.phone}</IonCol>
          <IonCol>{cliente.address}</IonCol>
          <IonCol>
            <IonButton onClick={()=> {editCustomer(String(cliente.id))}} color={"warning"} fill="solid" size='small'><IonIcon icon={pencil} size='small'/></IonButton>
            <IonButton onClick={()=> remove(String(cliente.id))} color={"danger"} fill="solid" size='small'><IonIcon icon={close} size='small'/></IonButton>
          </IonCol>
        
        </IonRow>
          )}

        </IonGrid>

        </IonCard>

    </IonContent>
      
      
      
      </IonContent>
    </IonPage>
  );
};

export default CustomerList;

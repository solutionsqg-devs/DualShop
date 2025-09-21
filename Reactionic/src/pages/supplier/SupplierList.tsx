import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Supplier from './Supplier';
import { removeSupplier, searchSuppliers } from './SupplierApi';
//import ExploreContainer from '../../components/ExploreContainer';

const SupplierList: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const [suppliers , setSuppliers] = useState<Supplier[]>([]);
  const history = useHistory();

useEffect(() => {
  search();
},[history.location.pathname]);

  const search = async () => {
    let result = await searchSuppliers();
    setSuppliers(result);
  }
  const remove =  async(id:string) =>{
    await removeSupplier(id);
    search();
  }
 
  const addSupplier = () =>{
  history.push('/folder/suppliers/new')
  }
  const editSupplier = (id:string) =>{
    history.push('/folder/suppliers/'+ id)
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
        <IonTitle>Gestión de Proveedores</IonTitle>

        <IonItem>
          <IonButton onClick={addSupplier} color="primary" fill="outline" slot='end' size='default'>
            <IonIcon icon={add}/>
            Agregar Proveedor</IonButton>
        </IonItem>
        <IonGrid className='table'>
        <IonRow>
          <IonCol>Nombre</IonCol>
          <IonCol>Email</IonCol>
          <IonCol>Telefono</IonCol>
          <IonCol>Web</IonCol>
          <IonCol>Contact</IonCol>
          <IonCol>Acciones</IonCol>
        </IonRow>
        
        {suppliers.map((supplier:Supplier) =>
        <IonRow>
          <IonCol>{supplier.name}</IonCol>
          <IonCol>{supplier.email}</IonCol>
          <IonCol>{supplier.phone}</IonCol>
          <IonCol>{supplier.web}</IonCol>
          <IonCol>{supplier.contact}</IonCol>
          <IonCol>
            <IonButton onClick={()=> {editSupplier(String(supplier.id))}} color={"warning"} fill="solid" size='small'><IonIcon icon={pencil} size='small'/></IonButton>
            <IonButton onClick={()=> remove(String(supplier.id))} color={"danger"} fill="solid" size='small'><IonIcon icon={close} size='small'/></IonButton>
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

export default SupplierList;

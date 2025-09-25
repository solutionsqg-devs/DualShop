import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Employee from './Employee';
import { removeEmployee, searchEmployees } from './EmployeeApi';
//import ExploreContainer from '../../components/ExploreContainer';

const EmployeeList: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const [clientes , setClientes] = useState<Employee[]>([]);
  const history = useHistory();

useEffect(() => {
  search();
},[history.location.pathname]);

  const search = async () => {
    let result = await searchEmployees();
    setClientes(result);
  }
  const remove = async (id:string) =>{
    await removeEmployee(id);
    search();
  }
 
  const addEmployee = () =>{
  history.push('/folder/employees/new')
  }
  const editEmployee = (id:string) =>{
    history.push('/folder/employees/'+ id)
    }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonMenuButton /> */}
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
        <IonTitle>Gestión de Empleados</IonTitle>

        <IonItem>
          <IonButton onClick={addEmployee} color="primary" fill="outline" slot='end' size='default'>
            <IonIcon icon={add}/>
            Agregar Empleado</IonButton>
        </IonItem>
        <IonGrid className='table'>
        <IonRow>
          <IonCol>Nombre</IonCol>
          <IonCol>Email</IonCol>
          <IonCol>Telefono</IonCol>
          <IonCol>Dirección</IonCol>
          <IonCol>Acciones</IonCol>
        </IonRow>
        
        {clientes.map((cliente:Employee) =>         
        <IonRow>
          <IonCol>{cliente.firstname} {cliente.lastname}</IonCol>
          <IonCol>{cliente.email}</IonCol>
          <IonCol>{cliente.phone}</IonCol>
          <IonCol>{cliente.address}</IonCol>
          <IonCol>
            <IonButton onClick={()=> {editEmployee(String(cliente.id))}} color={"warning"} fill="solid" size='small'><IonIcon icon={pencil} size='small'/></IonButton>
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

export default EmployeeList;

import { add, checkmark, close, grid, pencil, search } from 'ionicons/icons';
import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { useEffect, useState } from 'react';
import { removeEmployee, saveEmployee, searchEmployeeById, searchEmployees } from './EmployeeApi';
import Employee from './Employee';
import React from 'react';
//import ExploreContainer from '../../components/ExploreContainer';

const EmployeeEdit: React.FC = () => {
  const { name } = useParams<{ name:string;}>();

  const [employee , setEmployee] = useState<Employee>({});
  const [toastMsg, setToastMsg] = useState<string>('');

  const history = useHistory();

  const ruteMatch: any = useRouteMatch('/folder/employees/:id');
  let id = ruteMatch?.params?.id;

useEffect(() => {
  search();
},[history.location.pathname]);

const search = async () => {
  if(id === 'new'){
  setEmployee({});
  }else{
    let result = await searchEmployeeById(id);
    setEmployee(result);
  }
}


  const save = async () => {
    await saveEmployee(employee);
    setToastMsg('Empleado guardado correctamente!');
    history.push('/folder/employees')
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
        <IonTitle>{id === 'new' ? 'Agregar Empleado' : 'Editar Empleado'}</IonTitle>
        
        <IonItem>
          <IonLabel position='stacked'>Nombre</IonLabel>
          <IonInput onIonChange={e=> employee.firstname = String(e.detail.value)} value={employee.firstname} placeholder="Ingresa tu nombre"></IonInput>
        </IonItem>

        <IonItem>
        <IonLabel position='stacked'>Apellido</IonLabel>
        <IonInput onIonChange={e=> employee.lastname =String(e.detail.value)} value={employee.lastname} placeholder="Ingresa tu apellido"></IonInput>
        </IonItem>

        <IonItem>
        <IonLabel position='stacked'>Email</IonLabel>
        <IonInput onIonChange={e=> employee.email = String(e.detail.value)} value={employee.email} placeholder="ejemplo@ejemplo.com"></IonInput>
        </IonItem>

        <IonItem>
        <IonLabel position='stacked'>Telefono</IonLabel>
        <IonInput onIonChange={e=> employee.phone = String(e.detail.value)} value={employee.phone} placeholder="Ingresá tu numero de celular"></IonInput>
        </IonItem>

        <IonItem>
        <IonLabel position='stacked'>Dirección</IonLabel>
        <IonInput onIonChange={e=> employee.address = String(e.detail.value)} value={employee.address} placeholder="Av. Siempre viva 123"></IonInput>
        </IonItem>

        <IonItem>
        <IonLabel position='stacked'>Salario</IonLabel>
        <IonInput onIonChange={e=> employee.salario = Number(e.detail.value)} value={employee.salario} placeholder="Ingresá tu numero de celular"></IonInput>
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

export default EmployeeEdit;

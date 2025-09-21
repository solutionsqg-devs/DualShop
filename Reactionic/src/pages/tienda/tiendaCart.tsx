import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import {checkmark, close} from 'ionicons/icons'
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { removeProduct, searchCustomers } from './tiendaApi';
import Customer from '../customer/Customer';
import { storefrontOutline } from 'ionicons/icons';
import {carrito} from './tiendaList';
import { saveProduct } from './tiendaApi';
import React from 'react';

const TiendaCart: React.FC = () =>  {
    const {name } = useParams<{name:string}>();
    const [cliente, setClientes] = useState([]);
    const [toastMsg, setToastMsg] = useState<string>('');
    const history = useHistory();
    
    useEffect(() => {
    search();
    },[])
    const date = new Date;
    const search = async () => {
        let result = await searchCustomers();
        setClientes(result);
      }
    const remove = (id:string) =>{
      let indice = carrito.findIndex((value)=> value.id=== id);
      carrito.splice(indice,1);
      search();
      }
    let cli:any;
    const handleSelectChange = (e:any) => {
      cli = e.target.value
    }
    
    const save = async () =>{
      for(let i=0; i<cliente.length;i++){
        carrito[i].cliente = await cli
        carrito[i].date = await date.toLocaleString()
        let total :any = carrito.reduce((accumulator, currentValue:any): any => accumulator + (currentValue.price * currentValue.cantidad) ,0).toFixed(2);
        carrito[i].total = total
        console.log(carrito[i])
        await saveProduct(carrito[i]);
        carrito.splice(0,carrito.length);
        setToastMsg('Compra Realizada - revisar en ventas el ticket de compra\n¡Muchas gracias por su compra!')
        history.push('/folder/tienda');
      }
    }
    const total = () => {
      if(!carrito.length){
      return "0"
      }else{
      return carrito.reduce((accumulator, currentValue:any): any => accumulator + (currentValue.price * currentValue.cantidad) ,0).toFixed(2);
      }}
    
    return(
    <>
    <React.Fragment>
      <IonToast isOpen={!!toastMsg} message={toastMsg} duration={4000} color='dark'  position='top'  onDidDismiss={() => setToastMsg('')}/>
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
        <IonTitle><IonIcon icon={storefrontOutline}/> Carrito</IonTitle>
        
        <IonItem>
          <IonLabel position='stacked'>Cliente:</IonLabel>
          <select id='cars' onChange={handleSelectChange}>
            <option>consumidor final</option>
            {cliente.map((client:Customer) => 
            <option id='cli'>{client.firstname}</option>
            )}
          </select>
          {/* <IonInput onIonChange={e=> product.name = String(e.detail.value)} value={product.name}></IonInput> */}
        </IonItem>

        <IonGrid className='table'>
        <IonRow>
          <IonCol>Nombre</IonCol>
          <IonCol>Precio unitario</IonCol>
          <IonCol>Imagen</IonCol>
          <IonCol>Cantidad</IonCol>
          <IonCol>total</IonCol>
        </IonRow>
        
        {carrito.map(car=>
          <IonRow>
          <IonCol>{car.name}</IonCol>
          <IonCol>{car.price}</IonCol>
          <IonCol><IonImg src={car.img} style={{ width:'65px'}}/></IonCol>
          <IonCol>{car.cantidad}</IonCol>
          <IonCol>${Number(car.price) * Number(car.cantidad)}</IonCol>
          <IonButton onClick={()=> remove(String(car.id))} color={"danger"} fill="solid" size='small'><IonIcon icon={close} size='small'/></IonButton>
          </IonRow>
          )}

        </IonGrid>
        <IonItem >
        <span className='Total' slot='end'>Total a pagar: ${total()}</span>
        <IonButton onClick={save} color="success" fill="solid" slot='end' size='default'>
            <IonIcon icon={checkmark}/>
            Comprar</IonButton>
        </IonItem>
        </IonCard>


    </IonContent>
    </IonContent>
    </IonPage>
    </React.Fragment>
    </>
    );

};

export default TiendaCart;
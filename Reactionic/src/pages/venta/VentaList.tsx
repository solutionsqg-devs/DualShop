import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonGrid, IonHeader, IonMenuButton, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useHistory, useParams } from "react-router";
import Ventas from "./Ventas";
import { useEffect, useState } from "react";
import { searchVentas } from "./VentasApi";
import Logo from '../../images/logo.png'
import React from "react";

const VentaList: React.FC = () => {
   const {name} = useParams<{name : string}>();
   const [ventas , setVenta] = useState<Ventas[]>([]);
   const history = useHistory();

   useEffect(()=>{ 
   search()
   },[history.location.pathname]);

   const search = async () => {
    let result = await searchVentas();
    setVenta(result);
   };
  const view = (id:string) => {
  history.push('/folder/ventas/'+id)
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
        <IonTitle>Gestion de ventas</IonTitle>

        <IonGrid className='table2'>
            

      
        {
        ventas.map((ven:Ventas) =>
        <div className='Products'>
        <span className="numtik">N° Ticket {ven.id_total}</span>
        <div><img alt="Silhouette of mountains" src={Logo} width={160} /></div>
        <IonCardHeader>
        <IonCardTitle><strong>Cliente:</strong> {ven.cliente}</IonCardTitle>
        <IonCardSubtitle><strong style={{fontSize:'15px'}}>Nombre Producto:</strong> {ven.name}</IonCardSubtitle>
        <IonCardSubtitle><strong style={{fontSize:'15px'}}>Imagen Producto:</strong><img src={ven.img} width={30} alt="" /></IonCardSubtitle>
        <IonCardSubtitle><strong style={{fontSize:'15px'}}>Cantidad del producto:</strong> {ven.cantidad}</IonCardSubtitle>
        <IonCardSubtitle><strong style={{fontSize:'15px'}}>Precio por unidad:</strong> ${ven.price}</IonCardSubtitle>
        <IonCardSubtitle><strong style={{fontSize:'15px'}}>Fecha y hora de la compra:</strong> {ven.date}</IonCardSubtitle>


        <IonCardSubtitle color={'success'} style={{fontSize:'20px'}} >Total: ${ven.total}</IonCardSubtitle>
        <IonButton fill="clear" onClick={()=>{view(String(ven.id_total))}}>Ver Ticket</IonButton>
        </IonCardHeader>
        </div>

                
          )}

        </IonGrid>

        </IonCard>

    </IonContent>
      
      
      
      </IonContent>
    </IonPage>
  );
}

export default VentaList;
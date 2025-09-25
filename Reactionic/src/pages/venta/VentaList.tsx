import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonGrid, IonHeader, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Logo from '../../images/logo.png';
import Ventas from "./Ventas";
import { searchVentas } from "./VentasApi";

const VentaList: React.FC = () => {
   const {name} = useParams<{name : string}>();
   const [ventas , setVenta] = useState<Ventas[]>([]);
   const history = useHistory();
   const [searchTerm, setSearchTerm] = useState('');
   const [filterStatus, setFilterStatus] = useState('Todos');

   useEffect(()=>{ 
   search()
   },[history.location.pathname]);

   const search = async () => {
    let result = await searchVentas();
    const filtered = result.filter((venta: Ventas) => {
      const matchesSearch = venta.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            venta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            String(venta.id_total).includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'Todos' || venta.estado === filterStatus;
      return matchesSearch && matchesStatus;
    });
    setVenta(filtered);
   };

   useEffect(() => {
    search();
  }, [searchTerm, filterStatus]);
 
  const view = (id:string) => {
  history.push('/folder/ventas/'+id)
  }

   return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonMenuButton /> */}
          </IonButtons>
          <IonTitle>{name}</IonTitle>
          <IonSearchbar value={searchTerm} onIonInput={(e: any) => setSearchTerm(e.target.value)} placeholder="Buscar pedidos..."></IonSearchbar>
          <IonSelect label="Estado" value={filterStatus} onIonChange={(e) => setFilterStatus(e.detail.value)} interface="popover" placeholder="Filtrar por estado">
            <IonSelectOption value="Todos">Todos los estados</IonSelectOption>
            <IonSelectOption value="Pendiente">Pendiente</IonSelectOption>
            <IonSelectOption value="En proceso">En proceso</IonSelectOption>
            <IonSelectOption value="Completado">Completado</IonSelectOption>
            <IonSelectOption value="Cancelado">Cancelado</IonSelectOption>
          </IonSelect>
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
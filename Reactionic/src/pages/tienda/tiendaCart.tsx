import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { checkmark, close, storefrontOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useCart } from '../../context/CartContext'; // Importar useCart del contexto
import Customer from '../customer/Customer';
import { saveCustomer } from '../customer/CustomerApi'; // Importar saveCustomer
import { saveProduct, searchCustomers } from './tiendaApi';

const TiendaCart: React.FC = () =>  {
    const {name } = useParams<{name:string}>();
    const [cliente, setClientes] = useState([]);
    const [toastMsg, setToastMsg] = useState<string>('');
    const history = useHistory();
    const { cart, quitarProducto, limpiarCarrito, totalCarrito } = useCart();

    useEffect(() => {
    search();
    },[])
    const date = new Date;
    const search = async () => {
        let result = await searchCustomers();
        setClientes(result);
      }
    const remove = (id:string) =>{
      quitarProducto(id);
      search(); // Refresh customer list in case a new customer was added during checkout
      }
    const [selectedClientId, setSelectedClientId] = useState<string | undefined>(undefined);
    const [showNewClientForm, setShowNewClientForm] = useState<boolean>(false);
    const [newClientFirstName, setNewClientFirstName] = useState<string>('');
    const [newClientLastName, setNewClientLastName] = useState<string>('');
    const [newClientEmail, setNewClientEmail] = useState<string>('');
    const [newClientPhone, setNewClientPhone] = useState<string>('');
    const [newClientAddress, setNewClientAddress] = useState<string>('');
    const [newClientType, setNewClientType] = useState<string>('Minorista');

    const handleClientSelectChange = (e: any) => {
      if (e.detail.value === 'new-client') {
        setShowNewClientForm(true);
        setSelectedClientId(undefined);
      } else {
        setShowNewClientForm(false);
        setSelectedClientId(e.detail.value);
      }
    };

    
    const save = async () =>{
      let currentClientId = selectedClientId;
      let clientNameForSale: string = "Consumidor Final"; // Default to anonymous

      if (showNewClientForm) {
        // Create new client if form is visible
        const newClient: Customer = {
          firstname: newClientFirstName,
          lastname: newClientLastName,
          email: newClientEmail,
          phone: newClientPhone,
          address: newClientAddress,
          type: newClientType,
        };
        const savedClient = await saveCustomer(newClient);
        currentClientId = savedClient.id; // Assuming saveCustomer returns the saved client with an ID
        clientNameForSale = `${newClientFirstName} ${newClientLastName}`;
      } else if (selectedClientId) {
        const selectedClient = cliente.find((c: Customer) => c.id === selectedClientId);
        if (selectedClient) {
          clientNameForSale = `${selectedClient.firstname} ${selectedClient.lastname}`;
        }
      }

      if (!currentClientId && !showNewClientForm) {
        setToastMsg('Por favor, selecciona un cliente o registra uno nuevo.');
        return;
      }

      // Prepare order details
      const totalAmount = totalCarrito();

      const orderItems = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.cantidad,
        img: item.img,
        // Add other relevant product details if needed for the sale
      }));

      const newSale = {
        id_total: `V-${Date.now()}`, // Generate a unique sale ID
        cliente: clientNameForSale, // Use the client's full name
        date: date.toLocaleString(),
        total: parseFloat(totalAmount.toFixed(2)), // Ensure total is a number with 2 decimal places
        estado: "pendiente", // Default status
        productos: orderItems, // Add order items
        // You might need to add `id_cliente: currentClientId` if your backend needs it
      };

      // Save the new sale
      await saveProduct(newSale); // `saveProduct` from tiendaApi.ts is used to save sales

      // Clear the cart and navigate
      limpiarCarrito();
      setToastMsg('Compra Realizada - revisar en ventas el ticket de compra\n¡Muchas gracias por su compra!');
      history.push('/folder/tienda');
    }
    
    return(
    <>
    <React.Fragment>
      <IonToast isOpen={!!toastMsg} message={toastMsg} duration={4000} color='dark'  position='top'  onDidDismiss={() => setToastMsg('')}/>
     <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonMenuButton /> */}
          </IonButtons>
          <IonTitle><IonIcon icon={storefrontOutline}/> Carrito</IonTitle>
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
          <IonSelect label="Cliente" value={selectedClientId} onIonChange={handleClientSelectChange} interface="popover" placeholder="Seleccionar cliente">
            <IonSelectOption value="consumidor-final">Consumidor Final</IonSelectOption>
            <IonSelectOption value="new-client">Registrar nuevo cliente</IonSelectOption>
            {cliente.map((client: Customer) => 
              <IonSelectOption key={client.id} value={client.id}>{client.firstname} {client.lastname}</IonSelectOption>
            )}
          </IonSelect>
        </IonItem>

        {showNewClientForm && (
          <div className="new-client-form">
            <IonItem>
              <IonLabel position="stacked">Nombre</IonLabel>
              <IonInput value={newClientFirstName} onIonChange={e => setNewClientFirstName(e.detail.value!)} type="text" required></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Apellido</IonLabel>
              <IonInput value={newClientLastName} onIonChange={e => setNewClientLastName(e.detail.value!)} type="text" required></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput value={newClientEmail} onIonChange={e => setNewClientEmail(e.detail.value!)} type="email"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Teléfono</IonLabel>
              <IonInput value={newClientPhone} onIonChange={e => setNewClientPhone(e.detail.value!)} type="tel"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Dirección</IonLabel>
              <IonInput value={newClientAddress} onIonChange={e => setNewClientAddress(e.detail.value!)} type="text"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Tipo de Cliente</IonLabel>
              <IonSelect label="Tipo de Cliente" value={newClientType} onIonChange={e => setNewClientType(e.detail.value)} interface="popover">
                <IonSelectOption value="Minorista">Minorista</IonSelectOption>
                <IonSelectOption value="Kiosco">Kiosco</IonSelectOption>
              </IonSelect>
            </IonItem>
          </div>
        )}

        <IonGrid className='table'>
        <IonRow>
          <IonCol>Nombre</IonCol>
          <IonCol>Precio unitario</IonCol>
          <IonCol>Imagen</IonCol>
          <IonCol>Cantidad</IonCol>
          <IonCol>total</IonCol>
        </IonRow>
        
        {cart.map(car=>
          <IonRow key={car.id}> {/* Added key prop here */}
          <IonCol>{car.name}</IonCol>
          <IonCol>{car.price}</IonCol>
          <IonCol><IonImg src={car.img} style={{ width:'65px'}}/></IonCol>
          <IonCol>{car.cantidad}</IonCol>
          <IonCol>${(car.price * car.cantidad).toFixed(2)}</IonCol>
          <IonButton onClick={()=> quitarProducto(String(car.id))} color={"danger"} fill="solid" size='small'><IonIcon icon={close} size='small'/></IonButton>
          </IonRow>
          )}

        </IonGrid>
        <IonItem >
        <span className='Total' slot='end'>Total a pagar: ${totalCarrito().toFixed(2)}</span>
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
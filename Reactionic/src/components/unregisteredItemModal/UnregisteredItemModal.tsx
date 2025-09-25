import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './UnregisteredItemModal.css'; // Asegúrate de crear este archivo CSS

interface UnregisteredItemModalProps {
  onClose: () => void;
  onAddItem: (item: any) => void;
}

const UnregisteredItemModal: React.FC<UnregisteredItemModalProps> = ({ onClose, onAddItem }) => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  const handleSubmit = () => {
    if (name && price > 0 && quantity > 0) {
      const newItem = {
        id: `unregistered-${Date.now()}`,
        name,
        price,
        cantidad: quantity,
        detail: 'Producto no registrado',
        img: 'https://via.placeholder.com/70',
        category: 'No Registrado', // Categoría por defecto
      };
      onAddItem(newItem);
      onClose();
    } else {
      alert('Por favor, completa todos los campos y asegúrate de que el precio y la cantidad sean mayores a 0.');
    }
  };

  return (
    <IonModal isOpen={true} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Vender ítem no registrado</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Cerrar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Nombre del Producto</IonLabel>
          <IonInput value={name} onIonChange={(e) => setName(e.detail.value!)} type="text" required></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Precio Unitario</IonLabel>
          <IonInput value={price} onIonChange={(e) => setPrice(parseFloat(e.detail.value!))} type="number" step="0.01" required></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Cantidad</IonLabel>
          <IonInput value={quantity} onIonChange={(e) => setQuantity(parseInt(e.detail.value!, 10))} type="number" min="1" required></IonInput>
        </IonItem>
        <IonButton expand="block" onClick={handleSubmit} className="ion-margin-top">Añadir al Carrito</IonButton>
      </IonContent>
    </IonModal>
  );
};

export default UnregisteredItemModal;


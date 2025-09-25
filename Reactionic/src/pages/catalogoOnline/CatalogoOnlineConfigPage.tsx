import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import '../Page.css';

const CatalogoOnlineConfigPage: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const [bannerImage, setBannerImage] = useState<string | undefined>(undefined);
  const [bannerText, setBannerText] = useState<string>('Bienvenido a nuestra tienda online!');
  const [primaryColor, setPrimaryColor] = useState<string>('#3880ff'); // Ionic default primary
  const [secondaryColor, setSecondaryColor] = useState<string>('#0cd1e8'); // Ionic default secondary
  const [productOrder, setProductOrder] = useState<string>('category');

  const history = useHistory();

  useEffect(() => {
    // Load saved configuration (simulated with localStorage)
    const savedConfig = JSON.parse(localStorage.getItem('catalogoConfig') || '{}');
    if (savedConfig.bannerImage) setBannerImage(savedConfig.bannerImage);
    if (savedConfig.bannerText) setBannerText(savedConfig.bannerText);
    if (savedConfig.primaryColor) setPrimaryColor(savedConfig.primaryColor);
    if (savedConfig.secondaryColor) setSecondaryColor(savedConfig.secondaryColor);
    if (savedConfig.productOrder) setProductOrder(savedConfig.productOrder);
  }, []);

  const handleSaveConfig = () => {
    const config = {
      bannerImage,
      bannerText,
      primaryColor,
      secondaryColor,
      productOrder,
    };
    localStorage.setItem('catalogoConfig', JSON.stringify(config));
    alert('Configuración del Catálogo Online guardada con éxito!');
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBannerImage(event.target.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonMenuButton /> */}
          </IonButtons>
          <IonTitle>Catálogo Online</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Catálogo Online</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonCard className="catalogo-config-card">
            <IonItem lines="none">
              <IonTitle>Configuración del Catálogo Online</IonTitle>
            </IonItem>

            <div className="config-section">
              <h3>Banner Principal</h3>
              <IonItem>
                <IonLabel position="stacked">Imagen del Banner:</IonLabel>
                <input type="file" id="bannerImageUpload" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                <IonButton expand="block" fill="outline" onClick={() => document.getElementById('bannerImageUpload')?.click()}>
                  Seleccionar Imagen
                </IonButton>
                {bannerImage && <IonImg src={bannerImage} alt="Banner Preview" className="banner-preview" />}
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Texto del Banner:</IonLabel>
                <IonInput value={bannerText} onIonChange={(e) => setBannerText(e.detail.value!)} type="text"></IonInput>
              </IonItem>
            </div>

            <div className="config-section">
              <h3>Temas de Color</h3>
              <IonItem>
                <IonLabel position="stacked">Color Primario:</IonLabel>
                <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Color Secundario:</IonLabel>
                <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
              </IonItem>
            </div>

            <div className="config-section">
              <h3>Orden de Productos</h3>
              <IonItem>
                <IonSelect label="Ordenar productos por:" value={productOrder} onIonChange={(e) => setProductOrder(e.detail.value)} interface="popover">
                  <IonSelectOption value="category">Categoría</IonSelectOption>
                  <IonSelectOption value="alphabetical">Alfabético</IonSelectOption>
                </IonSelect>
              </IonItem>
            </div>

            <IonButton expand="block" onClick={handleSaveConfig} className="ion-margin-top">
              Guardar Configuración
            </IonButton>
          </IonCard>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default CatalogoOnlineConfigPage;

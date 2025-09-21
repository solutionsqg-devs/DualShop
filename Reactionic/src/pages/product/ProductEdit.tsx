import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import Product from './Product';
import { saveProduct, searchProductById } from './ProductApi';
//import ExploreContainer from '../../components/ExploreContainer';

const ProductEdit: React.FC = () => {
  const { name } = useParams<{name:string;}>();
 
  const [product , setProduct] = useState<Product>({});
  const [toastMsg, setToastMsg] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [bundleOptions, setBundleOptions] = useState<number[]>([]);

  const history = useHistory();

  const ruteMatch: any = useRouteMatch('/folder/products/:id');
  let id = ruteMatch?.params?.id;


useEffect(() => {
  search();
},[]);

useEffect(() => {
  if (product.unitPrice && product.bundleSizes) {
    const sizes = product.bundleSizes.split(',').map(s => Number(s.trim())).filter(s => !isNaN(s) && s > 0);
    setBundleOptions(sizes);
    if (sizes.length > 0) {
      setProduct(prevProduct => ({ ...prevProduct, bundlePrice: prevProduct.unitPrice! * sizes[0] }));
    }
  } else {
    setBundleOptions([]);
    setProduct(prevProduct => ({ ...prevProduct, bundlePrice: undefined }));
  }
}, [product.unitPrice, product.bundleSizes]);

  const search = async () => {
    if(id === 'new'){
    setProduct({});
    }else if (id.startsWith('duplicate:')) {
      const originalId = id.replace('duplicate:', '');
      let result = await searchProductById(originalId);
      setProduct({ ...result, id: undefined, img: undefined }); // Clear ID and image for duplication
    } else{
      let result = await searchProductById(id);
      setProduct(result);
    }
  }

const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files.length > 0) {
    setSelectedImage(event.target.files[0]);
  }
};

const save = async () => {
    await saveProduct(product, selectedImage);
    setToastMsg('Producto agregado con exito')
    history.push('/folder/products')

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
        <IonTitle>{id == 'new' ? 'Agregar Producto' : 'Editar Producto'}</IonTitle>
        
        <IonItem>
          <IonLabel position='stacked'>Nombre</IonLabel>
          <IonInput onIonChange={e=> product.name = String(e.detail.value)} value={product.name}></IonInput>
        </IonItem>

        <IonItem>
        <IonLabel position='stacked'>Detalle</IonLabel>
        <IonInput onIonChange={e=> product.detail = String(e.detail.value)} value={product.detail} placeholder="Detalle producto"></IonInput>
        </IonItem>

        <IonItem>
        <IonLabel position='stacked'>Precio Unitario</IonLabel>
        <IonInput onIonChange={e=> product.unitPrice = Number(e.detail.value)} value={product.unitPrice} placeholder="Precio unitario del producto"></IonInput>
        </IonItem>

        <IonItem>
        <IonLabel position='stacked'>Tamaños de Bulto (separados por coma)</IonLabel>
        <IonInput onIonChange={e=> product.bundleSizes = String(e.detail.value)} value={product.bundleSizes} placeholder="Ej: 6,12,24"></IonInput>
        </IonItem>

        <IonItem>
        <IonLabel position='stacked'>Precio por bulto</IonLabel>
        <IonInput onIonChange={e=> product.bundlePrice = Number(e.detail.value)} value={product.bundlePrice} placeholder="Precio por bulto" disabled></IonInput>
        </IonItem>

        {bundleOptions.length > 0 && (
          <IonItem>
            <IonLabel position='stacked'>Precios por bulto:</IonLabel>
            <div>
              {bundleOptions.map(size => (
                <p key={size}>{size} unidades: ${product.unitPrice! * size}</p>
              ))}
            </div>
          </IonItem>
        )}

        <IonItem>
        <IonLabel position='stacked'>Imagen</IonLabel>
        <input type="file" onChange={handleFileChange} />
        </IonItem>

        <IonItem>
        <IonLabel position='stacked'>Stock</IonLabel>
        <IonInput onIonChange={e=> product.stock = Number(e.detail.value)} value={product.stock} placeholder="Cantidad unitario"></IonInput>
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

export default ProductEdit;

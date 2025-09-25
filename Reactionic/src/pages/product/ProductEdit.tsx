import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonText, IonTitle, IonToast, IonToggle, IonToolbar } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import '../Page.css'; // Importar el archivo CSS global
import Product from './Product';
import { saveProduct, searchProductById } from './ProductApi';

const ProductEdit: React.FC = () => {
  const { name } = useParams<{name:string;}>();
 
  const [product , setProduct] = useState<Product>({});
  const [toastMsg, setToastMsg] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [bundleOptions, setBundleOptions] = useState<number[]>([]);
  const [isFeaturedProduct, setIsFeaturedProduct] = useState<boolean>(false);
  const [showInOnlineCatalog, setShowInOnlineCatalog] = useState<boolean>(true);
  const [category, setCategory] = useState<string>('');
  const [tagName, setTagName] = useState<string>('');
  const [stockMinimo, setStockMinimo] = useState<number | undefined>(undefined);

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
    const productToSave: Product = {
        ...product,
        isFeatured: isFeaturedProduct,
        showInCatalog: showInOnlineCatalog,
        category: category,
        tagName: tagName,
        stockMinimo: stockMinimo,
    };
    await saveProduct(productToSave, selectedImage);
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
            {/* <IonMenuButton /> */}
          </IonButtons>
          <IonTitle>Registre sus productos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Registre sus productos</IonTitle>
        </IonToolbar>
        </IonHeader>
        
    <IonContent>  
        <IonCard>
            <div className="product-edit-form-container">
                <div className="form-left-section">
                    <div className="toggle-group">
                        <IonItem lines="none">
                            <IonLabel>Destacar producto</IonLabel>
                            <IonToggle checked={isFeaturedProduct} onIonChange={e => setIsFeaturedProduct(e.detail.checked)} />
                        </IonItem>
                        <IonItem lines="none">
                            <IonLabel>Mostrar en el Catálogo Online</IonLabel>
                            <IonToggle checked={showInOnlineCatalog} onIonChange={e => setShowInOnlineCatalog(e.detail.checked)} />
                        </IonItem>
                    </div>
                    <div className="image-upload-section">
                        <div className="current-image-placeholder">
                            {selectedImage ? (
                                <img src={URL.createObjectURL(selectedImage)} alt="Previsualización" />
                            ) : product.img ? (
                                <img src={`http://localhost:8080${product.img}`} alt="Producto Actual" />
                            ) : (
                                <IonText>Label</IonText>
                            )}
                        </div>
                        <div className="image-upload-controls">
                            <input type="file" id="productImageUpload" style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" />
                            <IonButton onClick={() => document.getElementById('productImageUpload')?.click()} expand="block" fill="outline">
                                Seleccionar una foto
                            </IonButton>
                            <IonText className="auto-reg-info">
                                Registro automático (BETA)<br/>
                                Solo sube una foto: la IA completa el nombre, precio, categoría y descripción en segundos. Todo queda listo rápido, y aún puedes ajustarlo como quieras.
                            </IonText>
                        </div>
                    </div>

                    <IonItem>
                        <IonLabel position='stacked'>Nombre del producto</IonLabel>
                        <IonInput onIonChange={e => setProduct({ ...product, name: String(e.detail.value) })} value={product.name} required></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonLabel position='stacked'>Precio</IonLabel>
                        <IonInput onIonChange={e => setProduct({ ...product, unitPrice: Number(e.detail.value) })} value={product.unitPrice} type="number" step="0.01" required></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonLabel position='stacked'>Precio de promoción (Opcional)</IonLabel>
                        <IonInput onIonChange={e => setProduct({ ...product, promotionPrice: Number(e.detail.value) })} value={product.promotionPrice} type="number" step="0.01"></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonLabel position='stacked'>Categoría</IonLabel>
                        <IonInput onIonChange={e => setCategory(e.detail.value!)} value={category}></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonLabel position='stacked'>Nombre de la etiqueta</IonLabel>
                        <IonInput onIonChange={e => setTagName(e.detail.value!)} value={tagName}></IonInput>
                    </IonItem>
                </div>

                <div className="form-right-section">
                    <h3>Stock</h3>
                    <IonItem>
                        <IonLabel position='stacked'>Stock actual</IonLabel>
                        <IonInput onIonChange={e => setProduct({ ...product, stock: Number(e.detail.value) })} value={product.stock} type="number"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position='stacked'>Stock Mínimo</IonLabel>
                        <IonInput onIonChange={e => setStockMinimo(Number(e.detail.value!))} value={stockMinimo} type="number"></IonInput>
                    </IonItem>

                    <div className="movement-history">
                        <h3>Historial de movimientos</h3>
                        <IonButton expand="block" fill="outline">Mostrar resultados</IonButton>
                    </div>
                </div>
            </div>
            <IonButton expand="block" onClick={save} color="success" className="ion-margin-top">
                Guardar Producto
            </IonButton>
        </IonCard>


    </IonContent>
    </IonContent>
    </IonPage>
    </React.Fragment>
);
};

export default ProductEdit;

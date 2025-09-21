import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, close, copy, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Product from './Product';
import { removeProduct, searchProducts } from './ProductApi';
//import ExploreContainer from '../../components/ExploreContainer';

const ProductList: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const [products , setProduct] = useState<Product[]>([]);
  const history = useHistory();

useEffect(() => {
  search();
},[history.location.pathname]);

  const search = async () => {
    let result = await searchProducts();
    setProduct(result);
  }
  const remove = async (id:string) =>{
    await removeProduct(id);
    search();
  }
 
  const addProduct = () =>{
  history.push('/folder/products/new')
  }
  const editProduct = (id:string) =>{
    history.push('/folder/products/'+ id)
    }
  const duplicateProduct = (id:string) =>{
    history.push('/folder/products/duplicate:'+ id)
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
        <IonTitle>Gestión de Productos</IonTitle>

        <IonItem>
          <IonButton onClick={addProduct} color="primary" fill="outline" slot='end' size='default'><IonIcon icon={add}/>Agregar Producto</IonButton>
        </IonItem>
        
        <IonGrid className='table'>
        <IonRow>
          <IonCol>Nombre</IonCol>
          <IonCol>Detalle</IonCol>
          <IonCol>Precio Unitario</IonCol>
          <IonCol>Tamaños de Bulto</IonCol>
          <IonCol>Precio por Bulto</IonCol>
          <IonCol>Stock</IonCol>
          <IonCol>Imagen</IonCol>
          <IonCol>Acciones</IonCol>
        </IonRow>
        
        {products.map((product:Product) =>
        <IonRow key={product.id}>
          <IonCol>{product.name} </IonCol>
          <IonCol>{product.detail}</IonCol>
          <IonCol>${product.unitPrice}</IonCol>
          <IonCol>{product.bundleSizes}</IonCol>
          <IonCol>${product.bundlePrice}</IonCol>
          <IonCol>{product.stock}</IonCol>
          <IonCol><IonImg src={product.img ? `http://localhost:8080${product.img}` : ''} style={{ width:'65px'}} /></IonCol>
          <IonCol>
            <IonButton onClick={()=> {editProduct(String(product.id))}} color={"warning"} fill="solid" size='small'><IonIcon icon={pencil} size='small'/></IonButton>
            <IonButton onClick={()=> remove(String(product.id))} color={"danger"} fill="solid" size='small'><IonIcon icon={close} size='small'/></IonButton>
            <IonButton onClick={()=> duplicateProduct(String(product.id))} color={"primary"} fill="solid" size='small'><IonIcon icon={copy} size='small'/></IonButton>
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

export default ProductList;

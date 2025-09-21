import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, cartOutline, close, duplicateOutline, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import {searchProducts } from './tiendaApi';
import Product from '../product/Product';
import '../Page.css'

interface cart {
  total: void;
  date: string;
  cliente: any;
  push(cli: any): unknown;id:string;name:string;img: string;price:string;cantidad?:number
}
//import ExploreContainer from '../../components/ExploreContainer';
export let carrito:cart[] = []
const TiendaList: React.FC = () => {
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

  const addCart = async (id:String,nombre:String,img:String,price:number) => {
    const aux = carrito
    let indice = aux.findIndex((item:any)=> item.id === id)
    if(indice !== -1){
      aux[indice].cantidad =  aux[indice].cantidad! + 1
    } else{
      const obj:any = {id: `${id}`, name: `${nombre}`,img: `${img}`,price: price ,cantidad: 1};
      aux.push(obj);
    }
    console.log(carrito)
  }
  const view = () => {
  history.push('/folder/tienda/cart')
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
        <IonTitle>Tienda de Productos</IonTitle>

        <IonItem>
         <IonButton onClick={view} color="primary" fill="outline" slot='end' size='default'><IonIcon icon={cartOutline}/>Ver carrito</IonButton>
        </IonItem>
        
        <IonGrid className='table2'>
            

      
        {products.map((product:Product) =>
        <div className='Products'>
        <div><img alt="Silhouette of mountains" src={product.img} width={260} /></div>
        <IonCardHeader>
        <IonCardTitle>{product.name}</IonCardTitle>
        <IonCardSubtitle>{product.detail}</IonCardSubtitle>
        <IonCardSubtitle color={'success'} style={{fontSize:'20px'}} >${product.price}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent><IonButton onClick={()=> addCart(String(product.id),String(product.name),String(product.img),Number(product.price))} color={"danger"} fill="solid" size='small'><IonIcon icon={duplicateOutline} size='small'/></IonButton></IonCardContent>
                    {/* <IonCol>
      
      <IonButton onClick={()=> remove(String(product.id))} color={"danger"} fill="solid" size='small'><IonIcon icon={close} size='small'/></IonButton>
    </IonCol> */}</div>

                
          )}

        </IonGrid>

        </IonCard>

    </IonContent>
      
      
      
      </IonContent>
    </IonPage>
  );
};

export default TiendaList;

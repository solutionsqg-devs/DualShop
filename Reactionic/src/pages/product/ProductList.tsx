import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonPage, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [categories, setCategories] = useState<string[]>([]);

useEffect(() => {
  search();
},[history.location.pathname, searchTerm, selectedCategory]);

  const search = async () => {
    let result = await searchProducts();
    setProduct(result);
    const uniqueCategories = ['Todas', ...new Set(result.map((product: Product) => product.category))];
    setCategories(uniqueCategories);
    
    const filtered = result.filter((product: Product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setProduct(filtered);
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
            {/* <IonMenuButton /> */}
          </IonButtons>
          <IonTitle>Gestión de Productos</IonTitle>
          <IonSearchbar value={searchTerm} onIonInput={(e: any) => setSearchTerm(e.target.value)} placeholder="Buscar productos..."></IonSearchbar>
          <IonSelect label="Categoría" value={selectedCategory} onIonChange={(e) => setSelectedCategory(e.detail.value)} interface="popover" placeholder="Filtrar por categoría">
            {categories.map((category) => (
              <IonSelectOption key={category} value={category}>{category}</IonSelectOption>
            ))}
          </IonSelect>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Gestión de Productos</IonTitle>
          </IonToolbar>
        </IonHeader>
        
    <IonContent>  
       {/* Información importante del negocio */}
       <IonGrid className="business-info">
         <IonRow>
           <IonCol><IonCard><IonCardHeader><IonCardTitle>Valor en stock</IonCardTitle></IonCardHeader><IonCardContent>$684,677.00</IonCardContent></IonCard></IonCol>
           <IonCol><IonCard><IonCardHeader><IonCardTitle>Costo de stock</IonCardTitle></IonCardHeader><IonCardContent>$558,328.55</IonCardContent></IonCard></IonCol>
           <IonCol><IonCard><IonCardHeader><IonCardTitle>Ganancia estimada</IonCardTitle></IonCardHeader><IonCardContent>$96,348.45</IonCardContent></IonCard></IonCol>
         </IonRow>
         <IonRow>
           <IonCol><IonCard><IonCardHeader><IonCardTitle>Stock bajo</IonCardTitle></IonCardHeader><IonCardContent>9</IonCardContent></IonCard></IonCol>
           <IonCol><IonCard><IonCardHeader><IonCardTitle>Sin stock</IonCardTitle></IonCardHeader><IonCardContent>262</IonCardContent></IonCard></IonCol>
           <IonCol><IonCard><IonCardHeader><IonCardTitle>En stock</IonCardTitle></IonCardHeader><IonCardContent>425</IonCardContent></IonCard></IonCol>
         </IonRow>
       </IonGrid>
       
        <IonCard>
        <IonTitle>Lista de Productos</IonTitle>

        <IonItem>
          <IonButton onClick={addProduct} color="primary" fill="outline" slot='end' size='default'><IonIcon icon={add}/>Agregar Producto</IonButton>
          <IonButton color="medium" fill="outline" slot="end">Exportar</IonButton>
          <IonButton color="medium" fill="outline" slot="end">Importar</IonButton>
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
          <IonCol className={product.stock <= 0 ? 'stock-low' : ''}>{product.stock}</IonCol>
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

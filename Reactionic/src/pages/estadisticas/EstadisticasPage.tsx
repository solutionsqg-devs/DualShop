import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import '../Page.css'; // Importar el archivo CSS global

const EstadisticasPage: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const history = useHistory();

  // Simulando datos de estadísticas
  const [estadisticas, setEstadisticas] = useState({
    facturacion: 0,
    ventas: 0,
    ticketMedio: 0,
    ganancia: 0,
    tasaVenta: 0,
    medioPago: 'N/A',
    productosMasVendidos: [],
    mejoresClientes: [],
    facturacionPorUsuario: [],
  });

  useEffect(() => {
    // Aquí iría la llamada a la API para obtener estadísticas reales
    // Por ahora, usamos datos de ejemplo
    setEstadisticas({
      facturacion: 34991103.50,
      ventas: 163,
      ticketMedio: 214675.48,
      ganancia: 12000000.00,
      tasaVenta: 85,
      medioPago: 'Efectivo',
      productosMasVendidos: [
        { name: 'Producto A', value: 1500000 },
        { name: 'Producto B', value: 1200000 },
        { name: 'Producto C', value: 900000 },
      ],
      mejoresClientes: [
        { name: 'KioStore', value: 7302475.90 },
        { name: 'Alan Maglio', value: 20108127.20 },
        { name: 'Martin Schipelhut', value: 7580500.40 },
      ],
      facturacionPorUsuario: [
        { name: 'KioStore', sales: 31, percentage: 15.1, value: 7302475.90 },
        { name: 'Alan Maglio', sales: 117, percentage: 41.6, value: 20108127.20 },
        { name: 'Martin Schipelhut', sales: 35, percentage: 15.7, value: 7580500.40 },
      ],
    });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonMenuButton /> */}
          </IonButtons>
          <IonTitle>Estadísticas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Estadísticas</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonGrid className="estadisticas-grid">
            <IonRow>
              <IonCol size="12" sizeMd="6" sizeLg="4">
                <IonCard>
                  <IonCardHeader><IonCardTitle>Facturación</IonCardTitle></IonCardHeader>
                  <IonCardContent>${estadisticas.facturacion.toLocaleString('es-AR')}</IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="12" sizeMd="6" sizeLg="4">
                <IonCard>
                  <IonCardHeader><IonCardTitle>Ventas</IonCardTitle></IonCardHeader>
                  <IonCardContent>{estadisticas.ventas}</IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="12" sizeMd="6" sizeLg="4">
                <IonCard>
                  <IonCardHeader><IonCardTitle>Ticket Medio</IonCardTitle></IonCardHeader>
                  <IonCardContent>${estadisticas.ticketMedio.toLocaleString('es-AR')}</IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="12" sizeMd="6" sizeLg="4">
                <IonCard>
                  <IonCardHeader><IonCardTitle>Ganancia</IonCardTitle></IonCardHeader>
                  <IonCardContent>${estadisticas.ganancia.toLocaleString('es-AR')}</IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="12" sizeMd="6" sizeLg="4">
                <IonCard>
                  <IonCardHeader><IonCardTitle>Tasa de Venta</IonCardTitle></IonCardHeader>
                  <IonCardContent>{estadisticas.tasaVenta}%</IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="12" sizeMd="6" sizeLg="4">
                <IonCard>
                  <IonCardHeader><IonCardTitle>Medio de Pago</IonCardTitle></IonCardHeader>
                  <IonCardContent>{estadisticas.medioPago}</IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12">
                <IonCard>
                  <IonCardHeader><IonCardTitle>Productos más vendidos por valor</IonCardTitle></IonCardHeader>
                  <IonCardContent>
                    <ul>
                      {estadisticas.productosMasVendidos.map((prod, index) => (
                        <li key={index}>{prod.name}: ${prod.value.toLocaleString('es-AR')}</li>
                      ))}
                    </ul>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="12">
                <IonCard>
                  <IonCardHeader><IonCardTitle>Mejores clientes por valor</IonCardTitle></IonCardHeader>
                  <IonCardContent>
                    <ul>
                      {estadisticas.mejoresClientes.map((client, index) => (
                        <li key={index}>{client.name}: ${client.value.toLocaleString('es-AR')}</li>
                      ))}
                    </ul>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12">
                <IonCard>
                  <IonCardHeader><IonCardTitle>Facturación por usuario (últimos 30 días)</IonCardTitle></IonCardHeader>
                  <IonCardContent>
                    {/* Aquí iría un gráfico circular o similar si se implementa una librería de gráficos */}
                    <div className="chart-placeholder">Gráfico de Facturación por Usuario</div>
                    <p><strong>{estadisticas.ventas} VENTAS</strong></p>
                    <p><strong>${estadisticas.facturacion.toLocaleString('es-AR')}</strong></p>
                    <ul>
                      {estadisticas.facturacionPorUsuario.map((user, index) => (
                        <li key={index}>{user.name} ({user.percentage}%): ${user.value.toLocaleString('es-AR')}</li>
                      ))}
                    </ul>
                    <IonButton expand="block" fill="outline" className="ion-margin-top">Ver más estadísticas</IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default EstadisticasPage;

import React, { useEffect, useState } from 'react';
import './ClientesPage.css'; // Crearemos este archivo CSS

const ClientesPage = () => {
    const [clientes, setClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddClientModal, setShowAddClientModal] = useState(false);

    useEffect(() => {
        // Simulación de una llamada a la API para obtener clientes
        const fetchClients = async () => {
            // const response = await fetch('http://localhost:8080/api/clients');
            // const data = await response.json();
            // setClientes(data);

            const dummyClients = [
                { id: 'cli1', name: 'ALejo', phone: '+54 9 11 1234 5678', email: 'alejo@example.com', balance: 0.00, type: 'Minorista' },
                { id: 'cli2', name: 'ALejandro', phone: '+54 9 11 8765 4321', email: 'alejandro@example.com', balance: -89880.00, type: 'Kiosco' },
                { id: 'cli3', name: 'ALEX', phone: '+54 9 341 555 1234', email: 'alex@example.com', balance: 0.00, type: 'Minorista' },
                { id: 'cli4', name: 'Analia Machuca', phone: '+54 9 223 666 7788', email: 'analia@example.com', balance: 0.00, type: 'Kiosco' },
            ];
            setClientes(dummyClients);
        };
        fetchClients();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredClients = clientes.filter(client => {
        return client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
               client.phone.includes(searchTerm);
    });

    const handleAddClient = (newClient) => {
        setClientes(prevClients => [...prevClients, { ...newClient, id: `cli${prevClients.length + 1}` }]);
        setShowAddClientModal(false);
    };

    return (
        <div className="clientes-page">
            <h2>Clientes</h2>
            <div className="filters-actions">
                <input 
                    type="text" 
                    placeholder="Buscar por nombre, teléfono o email..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="btn btn-primary" onClick={() => setShowAddClientModal(true)}>+ Cliente</button>
                <button className="btn btn-secondary">Exportar</button>
            </div>

            <div className="clients-list">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Celular/WhatsApp</th>
                            <th>Email</th>
                            <th>Saldo actual</th>
                            <th></th> {/* Para acciones como eliminar */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.map(client => (
                            <tr key={client.id}>
                                <td>{client.name}</td>
                                <td>{client.phone}</td>
                                <td>{client.email}</td>
                                <td className={client.balance < 0 ? 'negative-balance' : ''}>${client.balance.toFixed(2)}</td>
                                <td><button className="btn btn-danger"><i className="fa-solid fa-trash"></i></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAddClientModal && (
                <AddClientModal 
                    onClose={() => setShowAddClientModal(false)}
                    onAddClient={handleAddClient}
                />
            )}
        </div>
    );
};

export default ClientesPage;


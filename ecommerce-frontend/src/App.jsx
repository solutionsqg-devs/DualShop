import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar.jsx';
import Home from './components/home/home.jsx';
import { CarritoContext, CarritoProvider } from './context/carritoContext.jsx';
import ConsentModal from './components/consent/consentModal.jsx';

const App = () => {
    const [searchText, setSearchText] = useState('');
    const { setConsent, consent } = useContext(CarritoContext);
    const [showConsentModal, setShowConsentModal] = useState(false);
    
    const handleSearchChange = (text) => {
        setSearchText(text);
    };

    useEffect(() => {
        if (consent === null) {
            setShowConsentModal(true);
        } else {
            setShowConsentModal(false);
        }
    }, [consent]);

    const handleAccept = () => {
        setConsent(true);
        setShowConsentModal(false);
    };

    return (
        
        <div className="App">
            
            <CarritoProvider>
            <Navbar onSearchChange={handleSearchChange} />
            <Home searchText={searchText} />
            {showConsentModal && <ConsentModal onAccept={handleAccept} />}
            </CarritoProvider>

        </div>
    );
};

export default App;

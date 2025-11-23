import React, { useState } from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import WorldSelect from './components/WorldSelect';
import Multiplayer from './components/Multiplayer';
import Options from './components/Options';

function App() {
    const [screen, setScreen] = useState('menu'); // menu, projects, contact, options

    const handleNavigate = (newScreen) => {
        setScreen(newScreen);
    };

    return (
        <>
            {screen === 'menu' && <MainMenu onNavigate={handleNavigate} />}
            {screen === 'projects' && <WorldSelect onBack={() => setScreen('menu')} />}
            {screen === 'contact' && <Multiplayer onBack={() => setScreen('menu')} />}
            {screen === 'options' && <Options onBack={() => setScreen('menu')} />}
        </>
    );
}

export default App;

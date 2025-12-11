import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import WorldSelect from './components/WorldSelect';
import Multiplayer from './components/Multiplayer';
import Options from './components/Options';
import Education from './components/Education';
import LoadingScreen from './components/LoadingScreen';

function App() {
    const [screen, setScreen] = useState('menu'); // menu, projects, contact, options, education
    const [isLoading, setIsLoading] = useState(false);
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
    const [pendingScreen, setPendingScreen] = useState(null);
    const loadingTimeoutRef = useRef(null);
    const minLoadingTimeRef = useRef(null);

    const handleNavigate = (newScreen) => {
        // Show loading screen for any navigation
        if (screen !== newScreen) {
            setIsLoading(true);
            setShowLoadingScreen(true);
            setPendingScreen(newScreen);
            
            // Set start time when loading screen first appears
            const startTime = Date.now();
            minLoadingTimeRef.current = startTime;
            
            // Clear any existing timeout
            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
            }
            
            // Wait for fade-in to complete (250ms) before switching pages
            setTimeout(() => {
                setScreen(newScreen);
            }, 250); // Match fade-in transition duration
        }
    };

    // Effect to detect when new component has mounted and hide loading screen
    useEffect(() => {
        if (isLoading && screen === pendingScreen && pendingScreen !== null) {
            // Wait for component to mount and ensure minimum display time
            const checkComponentReady = () => {
                const elapsed = Date.now() - (minLoadingTimeRef.current || Date.now());
                const fadeInTime = 250; // Fade-in duration
                const minDisplayTime = 250; // Minimum display time after fade-in
                const totalMinTime = 500; // Total minimum time from start (500ms)
                
                if (elapsed < totalMinTime) {
                    // Wait for remaining minimum time
                    loadingTimeoutRef.current = setTimeout(() => {
                        setIsLoading(false);
                        // Delay hiding the screen to allow fade out transition
                        setTimeout(() => {
                            setShowLoadingScreen(false);
                            setPendingScreen(null);
                        }, 250); // Match transition duration
                        loadingTimeoutRef.current = null;
                    }, totalMinTime - elapsed);
                } else {
                    // Component should be ready, hide loading screen
                    setIsLoading(false);
                    // Delay hiding the screen to allow fade out transition
                    setTimeout(() => {
                        setShowLoadingScreen(false);
                        setPendingScreen(null);
                    }, 250); // Match transition duration
                }
            };

            // Use requestAnimationFrame to ensure DOM has updated
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    checkComponentReady();
                });
            });
        }
    }, [screen, isLoading, pendingScreen]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            {screen === 'menu' && <MainMenu onNavigate={handleNavigate} />}
            {screen === 'projects' && <WorldSelect onBack={() => handleNavigate('menu')} />}
            {screen === 'contact' && <Multiplayer onBack={() => handleNavigate('menu')} />}
            {screen === 'options' && <Options onBack={() => handleNavigate('menu')} />}
            {screen === 'education' && <Education onBack={() => handleNavigate('menu')} />}
            {showLoadingScreen && <LoadingScreen isVisible={isLoading} />}
        </>
    );
}

export default App;

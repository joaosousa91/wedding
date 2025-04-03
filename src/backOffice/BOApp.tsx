import { useState } from 'react';
import ResponseList from "./ResponsesList";
import Dashboard from './Dashboard';
import styles from "./BOApp.module.css";

function BOApp(){
    const [currentView, setCurrentView] = useState('dashboard');

    return (
        <div>
            <nav className={styles.navBar}>
                <button
                    className={currentView === 'dashboard' ? styles.activeTab : styles.tab}
                    onClick={() => setCurrentView('dashboard')}
                >
                    Dashboard
                </button>
                <button
                    className={currentView === 'responses' ? styles.activeTab : styles.tab}
                    onClick={() => setCurrentView('responses')}
                >
                    Lista de Respostas
                </button>
            </nav>
            <div>
                {currentView === 'responses' && <ResponseList />}
                {currentView === 'dashboard' && <Dashboard />}
            </div>
        </div>
    );
}

export default BOApp;
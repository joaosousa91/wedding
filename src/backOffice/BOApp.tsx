import { useState } from 'react';
import ResponseList from "./ResponsesList";
import Dashboard from './Dashboard';

function BOApp(){
    const [currentView, setCurrentView] = useState('responses');

    return (
        <div>
            <nav style={{display: 'flex', justifyContent: 'space-around', padding: '10px', background: '#EC7833'}}>
                <button onClick={() => setCurrentView('dashboard')}>Dashboard</button>
                <button onClick={() => setCurrentView('responses')}>Lista de Respostas</button>
            </nav>
            <div>
                {currentView === 'responses' && <ResponseList />}
                {currentView === 'dashboard' && <Dashboard />}
            </div>
        </div>
    );
}

export default BOApp;
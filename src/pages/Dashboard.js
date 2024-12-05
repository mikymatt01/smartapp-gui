import React from 'react';
import { LineGraph } from '../components/Line';
import { Chatbot } from '../components/Chatbot'
const Dashboard = () => {
    return (
        <div>
            <LineGraph />
            <Chatbot />
        </div>
    );
}

export default Dashboard;

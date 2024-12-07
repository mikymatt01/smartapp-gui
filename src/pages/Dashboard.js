import React from "react";
import { LineGraph } from '../components/LineGraph';
import { KPI } from '../components/KPIs';


function Dashboard() {
    return (
        <div>
            <h2>Welcome to the Dashboard</h2>
            <p>This is your main overview page.</p>
            <LineGraph />
            <KPI />
        </div>
    );
}

export default Dashboard;

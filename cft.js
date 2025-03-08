import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// ✅ Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQfXDpVpKRWUr6RTelKxcMeOFjSS6urw4",
    authDomain: "cft-v2.firebaseapp.com",
    databaseURL: "https://cft-v2-default-rtdb.firebaseio.com",
    projectId: "cft-v2",
    storageBucket: "cft-v2.firebasestorage.app",
    messagingSenderId: "547160025326",
    appId: "1:547160025326:web:d53a6a37a2e8a62226abff",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ✅ Chart Initialization
const voltageChartCtx = document.getElementById("voltageChart").getContext("2d");
const currentChartCtx = document.getElementById("currentChart").getContext("2d");

let voltageChart = new Chart(voltageChartCtx, {
    type: 'line',
    data: { labels: [], datasets: [{ label: "Voltage (V)", data: [], borderColor: "blue", fill: false }] }
});

let currentChart = new Chart(currentChartCtx, {
    type: 'line',
    data: { labels: [], datasets: [{ label: "Current (A)", data: [], borderColor: "green", fill: false }] }
});

// ✅ Function to Update Chart
function updateChart(chart, value) {
    const now = new Date().toLocaleTimeString();
    chart.data.labels.push(now);
    chart.data.datasets[0].data.push(value);

    if (chart.data.labels.length > 10) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }
    chart.update();
}

// ✅ Function to Calculate Energy & CO2
function calculateCarbonEmission(voltage, current) {
    let power = voltage * current;  // Power in Watts
    let energy = (power * 1) / 1000;  // Energy in kWh (assuming 1 hour)
    let co2Emission = energy * 0.82; // CO2 emission in kg

    document.getElementById("powerValue").textContent = power.toFixed(2) + " W";
    document.getElementById("energyValue").textContent = energy.toFixed(2) + " kWh";
    document.getElementById("co2Value").textContent = co2Emission.toFixed(2) + " kg CO2";
}

// ✅ Firebase Data Fetching
onValue(ref(database, "/sensor/voltage"), (snapshot) => {
    let voltage = snapshot.val();
    document.getElementById("voltageValue").textContent = voltage;
    updateChart(voltageChart, voltage);

    onValue(ref(database, "/sensor/current"), (snapshot) => {
        let current = snapshot.val();
        document.getElementById("currentValue").textContent = current;
        updateChart(currentChart, current);

        calculateCarbonEmission(voltage, current); // Calculate CO2 Emission

        if (voltage > 250) {
            document.getElementById("alertMessage").textContent = "⚠ High Voltage Detected!";
        } else if (current > 16) {
            document.getElementById("alertMessage").textContent = "⚠ High Current Detected!";
        } else {
            document.getElementById("alertMessage").textContent = "";
        }
    });
});

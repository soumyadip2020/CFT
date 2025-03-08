// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBQfXDpVpKRWUr6RTelKxcMeOFjSS6urw4",
  authDomain: "cft-v2.firebaseapp.com",
  databaseURL: "https://cft-v2-default-rtdb.firebaseio.com",
  projectId: "cft-v2",
  storageBucket: "cft-v2.firebasestorage.app",
  messagingSenderId: "547160025326",
  appId: "1:547160025326:web:d53a6a37a2e8a62226abff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//Total Emissions Data Fetch (Top Section)

const totalEmissionsRef = ref(db, "total_emissions");
onValue(totalEmissionsRef, (snapshot) => {
  const totalEmissions = snapshot.val();
  document.getElementById("total-emissions-value").innerText = totalEmissions + " ton";
});

//Pie Chart (Left) - Emissions Breakdown

const emissionsRef = ref(db, "emissions_breakdown");
onValue(emissionsRef, (snapshot) => {
  const data = snapshot.val();
  updatePieChart(data);
});

function updatePieChart(data) {
  const ctx = document.getElementById("breakdownChart").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Purchase", "Petrol", "Electricity", "Food"],
      datasets: [{
        data: [data.purchase, data.petrol, data.electricity, data.food],
        backgroundColor: ["#A5D6A7", "#2E7D32", "#81C784", "#388E3C"]
      }]
    }
  });
}

//Line Chart (Middle) - Daily, Weekly, Monthly

function fetchChartData(timeframe) {
  const chartRef = ref(db, `emission_chart/${timeframe}`);
  onValue(chartRef, (snapshot) => {
    updateLineChart(snapshot.val(), timeframe);
  });
}

function updateLineChart(data, timeframe) {
  const ctx = document.getElementById("trendChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: `Emissions (${timeframe})`,
        data: Object.values(data),
        borderColor: "#2E7D32",
        fill: true,
        backgroundColor: "rgba(46, 125, 50, 0.2)"
      }]
    }
  });
}

// Default load daily data
fetchChartData("daily");

// Add event listeners for buttons
document.getElementById("daily-btn").addEventListener("click", () => fetchChartData("daily"));
document.getElementById("weekly-btn").addEventListener("click", () => fetchChartData("weekly"));
document.getElementById("monthly-btn").addEventListener("click", () => fetchChartData("monthly"));

//Right Section - Individual Appliances Emissions

const categoryRef = ref(db, "category_emissions");
onValue(categoryRef, (snapshot) => {
  const data = snapshot.val();
  document.getElementById("purchase-emission").innerText = data.purchase + " ton";
  document.getElementById("petrol-emission").innerText = data.petrol + " ton";
  document.getElementById("electricity-emission").innerText = data.electricity + " ton";
  document.getElementById("food-emission").innerText = data.food + " ton";
});

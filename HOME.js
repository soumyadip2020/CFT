// Firebase configuration
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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to fetch data from Firebase
async function fetchFootprintData() {
    const snapshot = await db.collection('footprintData').get();
    const data = snapshot.docs.map(doc => doc.data());
    return data;
}

// Function to get the logged-in user's name
function getUserName() {
    const user = firebase.auth().currentUser;
    return user ? user.displayName : 'Guest';
}

// Initialize Firebase Authentication
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        document.getElementById('userName').textContent = `Hello, ${getUserName()}`;
    } else {
        document.getElementById('userName').textContent = 'Hello, Guest';
    }
});

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// ✅ Firebase Authentication Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// ✅ Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCO1fpS7HkKPno7b2CrvzBkZRxSZoKEirU",
    authDomain: "cft-auth-d6645.firebaseapp.com",
    projectId: "cft-auth-d6645",
    storageBucket: "cft-auth-d6645.firebasestorage.app",
    messagingSenderId: "427099063633",
    appId: "1:427099063633:web:d01f6207c88ee6f2173f70",
    measurementId: "G-EYNS116KLD"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🔹 Email/Password Sign-In
const signInBtn = document.querySelector(".sign-in-container button");
signInBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.querySelector(".sign-in-container input[type='email']").value;
    const password = document.querySelector(".sign-in-container input[type='password']").value;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful! ✅");
        window.location.href = "HOME.html"; // Redirect to Dashboard
    } catch (error) {
        alert(error.message);
    }
});

// 🔹 Email/Password Sign-Up
const signUpBtn = document.querySelector(".sign-up-container button");
signUpBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.querySelector(".sign-up-container input[type='email']").value;
    const password = document.querySelector(".sign-up-container input[type='password']").value;
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account Created Successfully! ✅");
    } catch (error) {
        alert(error.message);
    }
});

// 🔹 Google Sign-In
const googleBtn = document.querySelector(".social-container a.social");
googleBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        const result = await signInWithPopup(auth, provider);
        alert("Google Sign-In Successful! ✅");
        window.location.href = "dashboard.html";
    } catch (error) {
        alert(error.message);
    }
});


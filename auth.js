import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// UI Elements
const authBtn = document.getElementById("auth-btn");
const toggleForm = document.getElementById("toggle-form");
const googleSignIn = document.getElementById("google-signin");
const formTitle = document.getElementById("form-title");

let isLogin = true; // Toggle between Login & Register

// **Toggle Login/Register Form**
toggleForm.addEventListener("click", () => {
    isLogin = !isLogin;
    formTitle.textContent = isLogin ? "Login" : "Register";
    authBtn.textContent = isLogin ? "Login" : "Register";
    toggleForm.innerHTML = isLogin ? "Don't have an account? <span>Register</span>" : "Already have an account? <span>Login</span>";
});

// **Email & Password Authentication**
authBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        if (isLogin) {
            // Login User
            await signInWithEmailAndPassword(auth, email, password);
            alert("Logged in successfully!");
        } else {
            // Register User
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account created successfully!");
        }
        window.location.href = "index.html"; // ✅ Redirect to home page
    } catch (error) {
        alert(error.message);
    }
});

// **Google Sign-In**
googleSignIn.addEventListener("click", async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        alert("Google Sign-In Successful!");
        window.location.href = "index.html"; // ✅ Redirect to home page
    } catch (error) {
        alert(error.message);
    }
});

// **Auto Redirect if Already Logged In**
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "index.html"; // ✅ Redirect if user is logged in
    }
});
import { signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logout-btn");
    
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            try {
                await signOut(auth);
                alert("Logged out successfully!");
                window.location.href = "auth.html"; // ✅ Redirect to login page
            } catch (error) {
                console.error("Logout Error:", error.message);
                alert("Error logging out: " + error.message);
            }
        });
    }
});

// **Redirect to auth.html if user is not logged in**
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "auth.html"; // ✅ Redirect if not logged in
    }
});

// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtB8NfAo3dCGpGSB8TD_1AqyFXRVdMD0w",
  authDomain: "sportswirelogin.firebaseapp.com",
  projectId: "sportswirelogin",
  storageBucket: "sportswirelogin.firebasestorage.app",
  messagingSenderId: "95556936374",
  appId: "1:95556936374:web:6f7be15d14d77c2164bc17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Sign-Up Function
const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
    alert("Sign-Up Successful!");
    // Redirect to home page
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error during sign-up:", error.message);
    alert(error.message);
  }
};

// Login Function
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    alert("Login Successful!");
    // Redirect to home page
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error during login:", error.message);
    alert(error.message);
  }
};

// Event Listeners
document.getElementById("signUpBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signUp(email, password);
});

document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD2VkgPTFhfWPEkZLt5tOVMlrAyiPKnA_U",
    authDomain: "grinderindia-3b7a6.firebaseapp.com",
    databaseURL: "https://grinderindia-3b7a6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "grinderindia-3b7a6",
    storageBucket: "grinderindia-3b7a6.appspot.com",
    messagingSenderId: "846960137518",
    appId: "1:846960137518:web:3ce7737554afa677f496bf",
    measurementId: "G-9SKX1EDZED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    const contactsRef = ref(db, 'contacts');

    push(contactsRef, {
        name: name,
        email: email,
        phone: phone,
        message: message,
        assignedTo: 'ajay', // Default to Ajay
        status: 'pending'   // Default status
    }).then(() => {
        document.getElementById('contactForm').reset();
        alert('Message sent successfully!');
    }).catch((error) => {
        alert('Error: ' + error.message);
    });
});


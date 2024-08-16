import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Initialize Firebase
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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const users = {
    ajay: "password1",
    vipul: "password2"
};

const loginBox = document.getElementById('loginBox');
const adminPage = document.getElementById('adminPage');
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const dataContainer = document.getElementById('dataContainer');
const noDataMessage = document.getElementById('noDataMessage');

let currentUser = '';

// Ensure `updateData` is available globally
window.updateData = function(key) {
    const remarksInput = document.getElementById(`remarks_${key}`);
    if (remarksInput) {
        const remarks = remarksInput.value;
        if (currentUser === 'ajay') {
            update(ref(db, 'contacts/' + key), { remarks, assignedTo: 'vipul', status: 'pending' })
                .then(() => {
                    fetchData(); // Refresh data to show changes
                })
                .catch((error) => {
                    alert('Error updating data: ' + error.message);
                });
        } else if (currentUser === 'vipul') {
            alert('You are not authorized to update remarks.');
        }
    } else {
        alert('Remarks input not found.');
    }
};

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (users[username] && users[username] === password) {
        currentUser = username;
        loginBox.style.display = 'none';
        adminPage.style.display = 'block';
        fetchData();
    } else {
        alert('Invalid username or password');
    }
});

function fetchData() {
    const contactsRef = ref(db, 'contacts');
    onValue(contactsRef, (snapshot) => {
        dataContainer.innerHTML = ''; // Clear existing data
        const data = snapshot.val();
        if (data) {
            noDataMessage.style.display = 'none'; // Hide no data message
            Object.keys(data).forEach(key => {
                const contact = data[key];
                if (contact.assignedTo === currentUser) {
                    dataContainer.innerHTML += `
                        <tr>
                            <td>${key}</td>
                            <td>${contact.name || ''}</td>
                            <td>${contact.email || ''}</td>
                            <td>${contact.phone || ''}</td>
                            <td>${contact.message || ''}</td>
                            <td>${contact.assignedTo || ''}</td>
                            <td>
                                ${contact.assignedTo === 'ajay' ?
                                    `<input type="text" id="remarks_${key}" class="form-control" placeholder="Enter your remarks">
                                     <button class="btn btn-primary mt-2" onclick="updateData('${key}')">Submit</button>` :
                                    `<div id="response_${key}" class="response-box">${contact.remarks || 'No remarks yet'}</div>`
                                }
                            </td>
                        </tr>
                    `;
                }
            });
        } else {
            noDataMessage.style.display = 'block'; // Show no data message
        }
    });
}

document.getElementById('refreshBtn').addEventListener('click', fetchData);

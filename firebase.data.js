import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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

const users = {
    ajay: "password1",
    vipul: "password2"
};

const loginBox = document.getElementById('loginBox');
const adminPage = document.getElementById('adminPage');

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username] === password) {
        loginBox.style.display = 'none';
        adminPage.style.display = 'block';
        loadContactData();
    } else {
        alert('Invalid login credentials');
    }
});

function loadContactData() {
    const contactsRef = ref(db, 'contacts');
    onValue(contactsRef, (snapshot) => {
        const data = snapshot.val();
        const dataContainer = document.getElementById('dataContainer');
        dataContainer.innerHTML = '';

        if (data) {
            for (const id in data) {
                const contact = data[id];
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${id}</td>
                    <td>${contact.name}</td>
                    <td>${contact.email}</td>
                    <td>${contact.phone}</td>
                    <td>${contact.message}</td>
                    <td>
                        <select id="assignedTo-${id}" class="form-select">
                            <option value="ajay" ${contact.assignedTo === 'ajay' ? 'selected' : ''}>Ajay</option>
                            <option value="vipul" ${contact.assignedTo === 'vipul' ? 'selected' : ''}>Vipul</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" id="remarks-${id}" class="form-control" placeholder="Remarks" value="${contact.remarks || ''}">
                        <button onclick="updateRemarks('${id}')" class="btn btn-primary mt-2">Update Remarks</button>
                    </td>
                `;
                // Show only contacts assigned to the logged-in user
                const currentUser = document.getElementById('username').value;
                if (contact.assignedTo === currentUser || (currentUser === 'vipul' && contact.assignedTo !== 'ajay')) {
                    dataContainer.appendChild(row);
                }
            }
            if (!dataContainer.hasChildNodes()) {
                document.getElementById('noDataMessage').style.display = 'block';
            } else {
                document.getElementById('noDataMessage').style.display = 'none';
            }
        } else {
            document.getElementById('noDataMessage').style.display = 'block';
        }
    });
}

window.updateRemarks = function(id) {
    const assignedTo = document.getElementById(`assignedTo-${id}`).value;
    const remarks = document.getElementById(`remarks-${id}`).value;

    if (assignedTo === 'ajay' && remarks) {
        // If Ajay is currently assigned and remarks are added, move to Vipul
        update(ref(db, `contacts/${id}`), {
            assignedTo: 'vipul',
            remarks: remarks
        }).then(() => {
            alert('Remarks updated and contact reassigned to Vipul!');
            // Remove the contact from Ajay’s section and load the updated data
            loadContactData();
        }).catch((error) => {
            alert('Error: ' + error.message);
        });
    } else if (assignedTo === 'vipul') {
        // If Vipul is currently assigned, just update remarks
        update(ref(db, `contacts/${id}`), {
            remarks: remarks
        }).then(() => {
            alert('Remarks updated successfully!');
        }).catch((error) => {
            alert('Error: ' + error.message);
        });
    } else {
        // Handle other cases if needed
        alert('Error: Invalid assignment status');
    }
}

document.getElementById('refreshBtn').addEventListener('click', loadContactData);

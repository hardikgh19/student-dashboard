// Load existing students from localStorage (or empty array if none)
let students = JSON.parse(localStorage.getItem('students')) || [];

const form = document.getElementById('student-form');
const tableBody = document.querySelector('#student-table tbody');

// Function to save to localStorage
function saveToLocal() {
  localStorage.setItem('students', JSON.stringify(students));
}

// Render the table whenever students array changes
function renderTable() {
  tableBody.innerHTML = '';
  students.forEach(student => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${student.name}</td>
      <td>${student.score}</td>
      <td>
        <button onclick="editStudent(${student.id})">Edit</button>
        <button onclick="deleteStudent(${student.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

// Add student
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const score = parseInt(document.getElementById('score').value);

  if (!name || isNaN(score)) return;

  const student = { id: Date.now(), name, score };
  students.push(student);
  saveToLocal();     
  renderTable();
  form.reset();
});

// Delete student
function deleteStudent(id) {
  students = students.filter(s => s.id !== id);
  saveToLocal();     
  renderTable();
}

// Edit student
function editStudent(id) {
  const student = students.find(s => s.id === id);
  
  // Get and validate name input
  let newName = prompt('Enter new name', student.name);
  
  if (newName === null) return; // User cancelled
  
  // Trim whitespace
  newName = newName.trim();
  
  // Validate name: should not be empty, should not be purely numeric
  if (newName === '') {
    alert('Name cannot be empty!');
    return;
  }
  
  if (/^\d+$/.test(newName)) {
    alert('Name cannot be purely numeric! Please enter a valid text name.');
    return;
  }
  
  // Get and validate score input
  const newScoreInput = prompt('Enter new score', student.score);
  
  if (newScoreInput === null) return; // User cancelled
  
  // Validate score: should be a valid number
  const newScore = parseInt(newScoreInput);
  
  if (isNaN(newScore)) {
    alert('Score must be a valid number!');
    return;
  }
  
  if (newScore < 0) {
    alert('Score cannot be negative!');
    return;
  }
  
  if (newScore > 100) {
    alert('Score cannot be greater than 100!');
    return;
  }
  
  // Update student if all validations pass
  student.name = newName;
  student.score = newScore;
  saveToLocal();   
  renderTable();
}

// Render table on page load
renderTable();

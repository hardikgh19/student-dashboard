let students = [];

const form = document.getElementById('student-form');
const tableBody = document.querySelector('#student-table tbody');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const score = parseInt(document.getElementById('score').value);

  const student = { id: Date.now(), name, score };
  students.push(student);
  renderTable();
  form.reset();
});

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

function deleteStudent(id) {
  students = students.filter(s => s.id !== id);
  renderTable();
}

function editStudent(id) {
  const student = students.find(s => s.id === id);
  const newName = prompt('Enter new name', student.name);
  const newScore = prompt('Enter new score', student.score);
  if(newName && newScore) {
    student.name = newName;
    student.score = parseInt(newScore);
    renderTable();
  }
}

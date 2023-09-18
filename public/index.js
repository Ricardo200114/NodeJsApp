$(document).ready(() => {
    const registrationForm = document.getElementById('registrationForm');
    const messageContainer = document.getElementById('message');
    const searchInput = document.getElementById('searchInput');
    const recordsTableBody = document.getElementById('recordsTableBody');
  
    let students = [];
  
    registrationForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const carnet = document.getElementById('carnetInput').value.trim();
      const nombre = document.getElementById('nombreInput').value.trim();
  
      if (carnet === '' || nombre === '') {
        showMessage('Error', 'Todos los campos son requeridos', 'error');
        return;
      }
  
      const existingStudent = students.find((student) => student.carnet === carnet);
      if (existingStudent) {
        showMessage('Error', 'El carnet ya se encuentra registrado', 'error');
        return;
      }
  
      const student = { carnet, nombre };
      students.push(student);
      renderTable();
      showMessage('Éxito', 'Se registró con éxito', 'success');
      registrationForm.reset();
    });
  
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const filteredStudents = students.filter(
        (student) =>
          student.carnet.toLowerCase().includes(query) ||
          student.nombre.toLowerCase().includes(query)
      );
  
      renderTable(filteredStudents);
      if (filteredStudents.length === 0) {
        showMessage('Información', 'No se encontró ningún estudiante', 'info');
      } else {
        hideMessage();
      }
    });
  
    function renderTable(filteredStudents = students) {
      recordsTableBody.innerHTML = '';
  
      filteredStudents.forEach((student, index) => {
        const row = document.createElement('tr');
        const carnetCell = document.createElement('td');
        const nombreCell = document.createElement('td');
        const deleteButtonCell = document.createElement('td');
        const deleteButton = document.createElement('button');
  
        carnetCell.textContent = student.carnet;
        nombreCell.textContent = student.nombre;
  
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.addEventListener('click', () => {
          deleteStudent(index);
        });
  
        deleteButtonCell.appendChild(deleteButton);
  
        row.appendChild(carnetCell);
        row.appendChild(nombreCell);
        row.appendChild(deleteButtonCell);
        recordsTableBody.appendChild(row);
      });
    }
  
    function deleteStudent(index) {
      students.splice(index, 1);
      renderTable();
      showMessage('Éxito', 'El estudiante se eliminó con éxito', 'success');
    }
  
    function showMessage(title, message, icon) {
      Swal.fire({
        title,
        text: message,
        icon,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        showClass: {
          popup: 'swal2-noanimation',
          backdrop: 'swal2-noanimation',
        },
        hideClass: {
          popup: '',
          backdrop: '',
        },
      });
    }
  
    function hideMessage() {
      Swal.close();
    }
  });
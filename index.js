document.addEventListener('DOMContentLoaded', function() {
  const viewButtons = document.querySelectorAll('.view-btn');
  const addTransactionBtn = document.getElementById('addTransactionBtn');
  const addModal = document.getElementById('addModal');
  const detailsModal = document.getElementById('detailsModal');
  const addForm = document.getElementById('addTransactionForm');
  
 
  function attachViewListener(button) {
    button.addEventListener('click', function() {
      const row = this.closest('tr');
      const cells = row.querySelectorAll('td');
      
      const id = cells[0].textContent;
      const customer = cells[1].textContent;
      const amount = cells[2].textContent;
      const status = cells[3].textContent;
      const date = cells[4].textContent;
      const paymentMethod = row.dataset.payment;
      const reference = row.dataset.reference;
      
      document.getElementById('modal-id').textContent = id;
      document.getElementById('modal-name').textContent = customer;
      document.getElementById('modal-amount').textContent = amount;
      document.getElementById('modal-status').textContent = status;
      document.getElementById('modal-date').textContent = date;
      document.getElementById('modal-payment').textContent = paymentMethod;
      document.getElementById('modal-reference').textContent = reference;
      
      detailsModal.style.display = 'block';
    });
  }
  

  viewButtons.forEach(button => {
    attachViewListener(button);
  });
  
 
  if (addTransactionBtn) {
    addTransactionBtn.addEventListener('click', function() {
      addModal.style.display = 'block';
    });
  }
  
 
  const closeAddBtn = document.querySelector('.close-add');
  if (closeAddBtn) {
    closeAddBtn.addEventListener('click', function() {
      addModal.style.display = 'none';
      addForm.reset();
    });
  }
  
 
  const cancelBtn = document.querySelector('.cancel-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
      addModal.style.display = 'none';
      addForm.reset();
    });
  }
  

  addForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newId = document.getElementById('new-id').value;
    const newCustomer = document.getElementById('new-customer').value;
    const newAmount = document.getElementById('new-amount').value;
    const newStatus = document.getElementById('new-status').value;
    const newDate = document.getElementById('new-date').value;
    const newPayment = document.getElementById('new-payment').value;
    const newReference = document.getElementById('new-reference').value;
    
   
    const tbody = document.querySelector('.transactions tbody');
    const newRow = document.createElement('tr');
    newRow.dataset.payment = newPayment;
    newRow.dataset.reference = newReference;
    
    newRow.innerHTML = `
      <td>${newId}</td>
      <td>${newCustomer}</td>
      <td>${newAmount}</td>
      <td>${newStatus}</td>
      <td>${newDate}</td>
      <td>
        <button class="action-btn view-btn">View</button>
      </td>
    `;
    
    tbody.appendChild(newRow);
    
   
    const newViewBtn = newRow.querySelector('.view-btn');
    attachViewListener(newViewBtn);
    
   
    addModal.style.display = 'none';
    addForm.reset();
   
    alert('Transaction added successfully!');
  });
  

  const closeX = document.querySelector('.close');
  if (closeX) {
    closeX.addEventListener('click', function() {
      detailsModal.style.display = 'none';
    });
  }
  
  const closeButton = document.querySelector('.close-btn');
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      detailsModal.style.display = 'none';
    });
  }
  
  
  window.addEventListener('click', function(event) {
    if (event.target == detailsModal) {
      detailsModal.style.display = 'none';
    }
    if (event.target == addModal) {
      addModal.style.display = 'none';
      addForm.reset();
    }
  });
  

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      detailsModal.style.display = 'none';
      addModal.style.display = 'none';
      addForm.reset();
    }
  });
});
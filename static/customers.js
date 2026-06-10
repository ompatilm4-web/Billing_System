document.addEventListener('DOMContentLoaded', () => {
    console.log('Customers module loaded');

    const searchInput = document.getElementById('customerSearch');
    const tableBody = document.getElementById('customerTableBody');
    const addBtn = document.getElementById('addCustomerBtn');

    // Basic search filtering
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const rows = tableBody.querySelectorAll('tr');

        rows.forEach(row => {
            const name = row.querySelector('.client-name').textContent.toLowerCase();
            const email = row.querySelector('.client-email').textContent.toLowerCase();
            
            if (name.includes(term) || email.includes(term)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    const modalOverlay = document.getElementById('modalOverlay');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const customerForm = document.getElementById('customerForm');

    const toggleModal = (show) => {
        modalOverlay.classList.toggle('active', show);
        if (!show) customerForm.reset();
    };

    addBtn.addEventListener('click', () => toggleModal(true));
    closeModal.addEventListener('click', () => toggleModal(false));
    cancelBtn.addEventListener('click', () => toggleModal(false));

    window.addEventListener('click', (e) => {
        if (e.target === modalOverlay) toggleModal(false);
    });

    customerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('custName').value;
        const email = document.getElementById('custEmail').value;
        const phone = document.getElementById('custPhone').value;
        const location = document.getElementById('custLocation').value;

        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>
                <div class="client-info">
                    <div class="client-avatar" style="background: linear-gradient(135deg, #4f46e5, #818cf8);">${initials}</div>
                    <div>
                        <span class="client-name">${name}</span>
                        <span class="client-email">${email}</span>
                    </div>
                </div>
            </td>
            <td>${phone}</td>
            <td>${location}</td>
            <td>0 Invoices</td>
            <td><span class="status-badge status-active">Active</span></td>
            <td>
                <button class="action-btn" title="Edit">✏️</button>
                <button class="action-btn" title="View History">📜</button>
            </td>
        `;

        tableBody.prepend(newRow);
        toggleModal(false);
        console.log(`New customer added: ${name}`);
    });

    // Handle action buttons
    tableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('action-btn')) {
            const action = e.target.title;
            const customerName = e.target.closest('tr').querySelector('.client-name').textContent;
            console.log(`${action} customer: ${customerName}`);
        }
    });

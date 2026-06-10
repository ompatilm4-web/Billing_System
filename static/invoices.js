document.addEventListener('DOMContentLoaded', () => {
    console.log('Invoices module loaded');

    const searchInput = document.getElementById('invoiceSearch');
    const tableBody = document.getElementById('invoiceTableBody');
    const statusFilter = document.getElementById('statusFilter');
    const newInvoiceBtn = document.getElementById('newInvoiceBtn');

    // Filtering logic
    const filterTable = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const statusTerm = statusFilter.value.toLowerCase();
        const rows = tableBody.querySelectorAll('tr');

        rows.forEach(row => {
            const invoiceId = row.querySelector('.invoice-id').textContent.toLowerCase();
            const customer = row.querySelector('.client-name').textContent.toLowerCase();
            const status = row.querySelector('.status-badge').textContent.toLowerCase();
            
            const matchesSearch = invoiceId.includes(searchTerm) || customer.includes(searchTerm);
            const matchesStatus = statusTerm === 'all' || status === statusTerm;

            if (matchesSearch && matchesStatus) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    };

    searchInput.addEventListener('input', filterTable);
    statusFilter.addEventListener('change', filterTable);

    const modalOverlay = document.getElementById('modalOverlay');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const invoiceForm = document.getElementById('invoiceForm');

    const toggleModal = (show) => {
        modalOverlay.classList.toggle('active', show);
        if (!show) invoiceForm.reset();
    };

    newInvoiceBtn.addEventListener('click', () => toggleModal(true));
    closeModal.addEventListener('click', () => toggleModal(false));
    cancelBtn.addEventListener('click', () => toggleModal(false));

    window.addEventListener('click', (e) => {
        if (e.target === modalOverlay) toggleModal(false);
    });

    invoiceForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('custName').value;
        const email = document.getElementById('custEmail').value;
        const amount = document.getElementById('invAmount').value;
        const dueDate = document.getElementById('invDueDate').value;
        const status = document.getElementById('invStatus').value;

        const newRow = document.createElement('tr');
        const invId = `#INV-2025-0${tableBody.rows.length + 1}`;
        const issueDate = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        const formattedDueDate = new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

        newRow.innerHTML = `
            <td class="invoice-id">${invId}</td>
            <td>
                <span class="client-name">${name}</span>
                <span class="client-email">${email}</span>
            </td>
            <td>₹${parseFloat(amount).toLocaleString()}</td>
            <td>${issueDate}</td>
            <td>${formattedDueDate}</td>
            <td><span class="status-badge status-${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
            <td>
                <a href="#" class="action-btn">View</a>
                <button class="action-btn">PDF</button>
            </td>
        `;

        tableBody.prepend(newRow);
        toggleModal(false);
        console.log(`New invoice created: ${invId}`);
    });

    // Action buttons
    tableBody.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
            const action = e.target.textContent;
            const id = e.target.closest('tr').querySelector('.invoice-id').textContent;
            console.log(`Action: ${action} on Invoice: ${id}`);
        }
    });

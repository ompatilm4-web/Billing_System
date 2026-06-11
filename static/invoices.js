sdocument.addEventListener('DOMContentLoaded', () => {
    console.log('Invoices module loaded');

    const searchInput = document.getElementById('invoiceSearch');
    const tableBody = document.getElementById('invoiceTableBody');
    const statusFilter = document.getElementById('statusFilter');
    const newInvoiceBtn = document.getElementById('newInvoiceBtn');

    // Filtering logic
    const filterTable = () => {
        if (!searchInput || !statusFilter || !tableBody) return;

        const searchTerm = searchInput.value.toLowerCase();
        const statusTerm = statusFilter.value.toLowerCase();
        const rows = tableBody.querySelectorAll('tr');

        rows.forEach(row => {
            const invoiceId =
                row.querySelector('.invoice-id')?.textContent.toLowerCase() || '';

            const customer =
                row.querySelector('.client-name')?.textContent.toLowerCase() || '';

            const status =
                row.querySelector('.status-badge')?.textContent.toLowerCase() || '';

            const matchesSearch =
                invoiceId.includes(searchTerm) ||
                customer.includes(searchTerm);

            const matchesStatus =
                statusTerm === 'all' ||
                status === statusTerm;

            row.style.display =
                matchesSearch && matchesStatus ? '' : 'none';
        });
    };

    if (searchInput) {
        searchInput.addEventListener('input', filterTable);
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', filterTable);
    }

    // Modal Elements
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const invoiceForm = document.getElementById('invoiceForm');

    const toggleModal = (show) => {
        if (!modalOverlay) return;

        modalOverlay.classList.toggle('active', show);

        if (!show && invoiceForm) {
            invoiceForm.reset();
        }
    };

    // Open Modal
    if (newInvoiceBtn) {
        newInvoiceBtn.addEventListener('click', () => toggleModal(true));
    }

    // Close Modal
    if (closeModal) {
        closeModal.addEventListener('click', () => toggleModal(false));
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => toggleModal(false));
    }

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            toggleModal(false);
        }
    });

    // Form Submit
    if (invoiceForm && tableBody) {
        invoiceForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name =
                document.getElementById('custName')?.value || '';

            const email =
                document.getElementById('custEmail')?.value || '';

            const amount =
                document.getElementById('invAmount')?.value || '0';

            const dueDate =
                document.getElementById('invDueDate')?.value || '';

            const status =
                document.getElementById('invStatus')?.value || 'pending';

            const newRow = document.createElement('tr');

            const invId =
                `#INV-2025-${String(tableBody.rows.length + 1).padStart(3, '0')}`;

            const issueDate = new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
            });

            const formattedDueDate = dueDate
                ? new Date(dueDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric'
                  })
                : '-';

            newRow.innerHTML = `
                <td class="invoice-id">${invId}</td>
                <td>
                    <span class="client-name">${name}</span>
                    <span class="client-email">${email}</span>
                </td>
                <td>₹${parseFloat(amount).toLocaleString()}</td>
                <td>${issueDate}</td>
                <td>${formattedDueDate}</td>
                <td>
                    <span class="status-badge status-${status}">
                        ${status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                </td>
                <td>
                    <a href="#" class="action-btn">View</a>
                    <button type="button" class="action-btn">PDF</button>
                </td>
            `;

            tableBody.prepend(newRow);

            toggleModal(false);

            console.log(`New invoice created: ${invId}`);
        });
    }

    // Action Buttons
    if (tableBody) {
        tableBody.addEventListener('click', (e) => {
            if (
                e.target.tagName === 'BUTTON' ||
                e.target.tagName === 'A'
            ) {
                e.preventDefault();

                const action = e.target.textContent;

                const id = e.target
                    .closest('tr')
                    ?.querySelector('.invoice-id')
                    ?.textContent;

                console.log(`Action: ${action} on Invoice: ${id}`);
            }
        });
    }
});
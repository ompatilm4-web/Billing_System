document.addEventListener('DOMContentLoaded', () => {
    console.log('Payments module loaded');

    const searchInput = document.getElementById('paymentSearch');
    const tableBody = document.getElementById('paymentTableBody');
    const recordBtn = document.getElementById('recordPaymentBtn');

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const rows = tableBody.querySelectorAll('tr');

        rows.forEach(row => {
            const txnId = row.cells[0].textContent.toLowerCase();
            const invoice = row.cells[1].textContent.toLowerCase();
            const customer = row.cells[2].textContent.toLowerCase();
            
            if (txnId.includes(term) || invoice.includes(term) || customer.includes(term)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    const modalOverlay = document.getElementById('modalOverlay');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const paymentForm = document.getElementById('paymentForm');

    const toggleModal = (show) => {
        modalOverlay.classList.toggle('active', show);
        if (!show) paymentForm.reset();
    };

    recordBtn.addEventListener('click', () => toggleModal(true));
    closeModal.addEventListener('click', () => toggleModal(false));
    cancelBtn.addEventListener('click', () => toggleModal(false));

    window.addEventListener('click', (e) => {
        if (e.target === modalOverlay) toggleModal(false);
    });

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const invId = document.getElementById('payInvId').value;
        const name = document.getElementById('payCustName').value;
        const amount = document.getElementById('payAmount').value;
        const method = document.getElementById('payMethod').value;
        const date = document.getElementById('payDate').value;

        const txnId = `TXN-${Math.floor(Math.random() * 900000) + 100000}`;
        const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>${txnId}</td>
            <td>${invId}</td>
            <td>${name}</td>
            <td>${formattedDate}</td>
            <td><span class="method-tag">${method}</span></td>
            <td class="amount-received">+₹${parseFloat(amount).toLocaleString()}</td>
        `;

        tableBody.prepend(newRow);
        toggleModal(false);
        console.log(`New payment recorded: ${txnId}`);
    });

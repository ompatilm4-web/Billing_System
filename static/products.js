document.addEventListener('DOMContentLoaded', () => {
    console.log('Products module loaded');

    const searchInput = document.getElementById('productSearch');
    const tableBody = document.getElementById('productTableBody');
    const addBtn = document.getElementById('addProductBtn');

    // Search Products
    if (searchInput && tableBody) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const rows = tableBody.querySelectorAll('tr');

            rows.forEach(row => {
                const name =
                    row.querySelector('.product-name')?.textContent.toLowerCase() || '';

                const desc =
                    row.querySelector('.product-desc')?.textContent.toLowerCase() || '';

                row.style.display =
                    name.includes(term) || desc.includes(term)
                        ? ''
                        : 'none';
            });
        });
    }

    // Modal Elements
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const productForm = document.getElementById('productForm');

    const toggleModal = (show) => {
        if (!modalOverlay) return;

        modalOverlay.classList.toggle('active', show);

        if (!show && productForm) {
            productForm.reset();
        }
    };

    // Open Modal
    if (addBtn) {
        addBtn.addEventListener('click', () => toggleModal(true));
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

    // Product Form Submit
    if (productForm && tableBody) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('prodName')?.value || '';
            const desc = document.getElementById('prodDesc')?.value || '';
            const category = document.getElementById('prodCategory')?.value || '';
            const price = document.getElementById('prodPrice')?.value || '0';
            const tax = document.getElementById('prodTax')?.value || '0';

            const newRow = document.createElement('tr');

            newRow.innerHTML = `
                <td>
                    <span class="product-name">${name}</span>
                    <span class="product-desc">${desc}</span>
                </td>
                <td>
                    <span class="tax-badge">${category}</span>
                </td>
                <td class="price-tag">
                    ₹${parseFloat(price).toLocaleString()}
                </td>
                <td>
                    ${tax}% GST
                </td>
                <td>
                    <span style="color:#059669;font-weight:600;">
                        Available
                    </span>
                </td>
                <td>
                    <button class="action-btn">✏️</button>
                    <button class="action-btn">🗑️</button>
                </td>
            `;

        tableBody.prepend(newRow);
        toggleModal(false);
        console.log(`New product added: ${name}`);
    });
});

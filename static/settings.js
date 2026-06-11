document.addEventListener('DOMContentLoaded', () => {
    console.log('Settings module loaded');

    const tabs = document.querySelectorAll('.tab-btn');
    const content = document.getElementById('settingsContent');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const tabName = tab.dataset.tab;
            console.log(`Switching to tab: ${tabName}`);
        });
    });

    const saveBtn = document.querySelector('.btn-save');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            alert('Settings saved successfully!');
        });
    }

    const deleteBtn = document.querySelector('.btn-danger');
    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            alert('Account deletion requested.');
        }
    });
});

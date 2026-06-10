document.addEventListener('DOMContentLoaded', () => {
    console.log('Settings module loaded');

    const tabs = document.querySelectorAll('.tab-btn');
    const content = document.getElementById('settingsContent');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            const tabName = tab.dataset.tab;
            console.log(`Switching to tab: ${tabName}`);
            
            // In a real app, we would switch the content here
            // For now, we just update the UI state
        });
    });

    const saveBtn = document.querySelector('.btn-save');
    saveBtn.addEventListener('click', () => {
        alert('Settings saved successfully!');
    });

    const deleteBtn = document.querySelector('.btn-danger');
    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            alert('Account deletion requested.');
        }
    });
});

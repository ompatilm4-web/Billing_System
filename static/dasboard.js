// ── Auth guard ──────────────────────────────────────────────
const user = JSON.parse(localStorage.getItem('bf_user') || 'null');
if (!user) {
    window.location.href = 'login.html';
} else {
    // Sidebar avatar & name
    const firstName = user.name ? user.name.split(' ')[0] : user.email.split('@')[0];
    const initials = user.name
        ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
        : user.email.slice(0, 2).toUpperCase();

    document.getElementById('sidebarAvatar').textContent = initials;
    document.getElementById('sidebarName').textContent = user.name || user.email;

    // Greeting
    const hour = new Date().getHours();
    const tod = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
    document.getElementById('greetingText').innerHTML =
        `Good ${tod}, <span style="color:var(--accent)">${firstName}</span> 👋`;

    // Topbar date
    document.getElementById('topbarDate').textContent =
        new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', function () {
    localStorage.removeItem('bf_user');
    window.location.href = 'login.html';
});

// ── Render bar chart ────────────────────────────────────────
const chartData = [
    { label: 'Mon', income: 72, expense: 40 },
    { label: 'Tue', income: 55, expense: 30 },
    { label: 'Wed', income: 90, expense: 50 },
    { label: 'Thu', income: 60, expense: 35 },
    { label: 'Fri', income: 100, expense: 45 },
    { label: 'Sat', income: 40, expense: 20 },
    { label: 'Sun', income: 65, expense: 28 },
];

const container = document.getElementById('chartBars');
chartData.forEach(d => {
    const g = document.createElement('div');
    g.className = 'bar-group';

    const incomeBar = document.createElement('div');
    incomeBar.className = 'bar bar-income';
    incomeBar.style.height = d.income + '%';

    const expenseBar = document.createElement('div');
    expenseBar.className = 'bar bar-expense';
    expenseBar.style.height = d.expense + '%';

    const label = document.createElement('div');
    label.className = 'bar-label';
    label.textContent = d.label;

    const barsWrap = document.createElement('div');
    barsWrap.style.cssText = 'display:flex;gap:3px;align-items:flex-end;height:120px;width:100%';
    barsWrap.appendChild(incomeBar);
    barsWrap.appendChild(expenseBar);

    g.appendChild(barsWrap);
    g.appendChild(label);
    container.appendChild(g);
});
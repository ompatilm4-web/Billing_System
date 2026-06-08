(function () {
    const user = JSON.parse(localStorage.getItem('bf_user') || 'null');
    const cta = document.getElementById('navCta');

    if (user) {
        // Logged-in state: avatar + Dashboard + Logout
        const initials = user.name
            ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
            : user.email.slice(0, 2).toUpperCase();

        cta.innerHTML = `
        <div class="nav-avatar" title="${user.name || user.email}">${initials}</div>
        <a href="dashboard.html" class="btn-primary">Dashboard →</a>
        <button class="btn-logout" id="logoutBtn">Log out</button>
      `;
        document.getElementById('logoutBtn').addEventListener('click', function () {
            localStorage.removeItem('bf_user');
            window.location.reload();
        });
    } else {
        // Guest state: Login + Get Started
        cta.innerHTML = `
        <a href="login.html" class="btn-ghost">Log in</a>
        <a href="login.html" class="btn-primary">Get Started</a>
      `;
    }
})();
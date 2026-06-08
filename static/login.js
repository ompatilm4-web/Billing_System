function switchTab(tab) {
    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach((b, i) => b.classList.toggle('active', (i === 0 && tab === 'login') || (i === 1 && tab === 'register')));
    document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
    const hint = document.getElementById('switchHint');
    hint.innerHTML = tab === 'login'
        ? `Don't have an account? <a href="#" onclick="switchTab('register')">Sign up free</a>`
        : `Already have an account? <a href="#" onclick="switchTab('login')">Sign in</a>`;
}

function togglePw(id, btn) {
    const input = document.getElementById(id);
    if (input.type === 'password') { input.type = 'text'; btn.textContent = '🙈'; }
    else { input.type = 'password'; btn.textContent = '👁'; }
}
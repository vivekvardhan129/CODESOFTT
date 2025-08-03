document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginStatus = document.getElementById('loginStatus');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = loginForm.username.value.trim();
    const password = loginForm.password.value.trim();

    if (!username || !password) {
      loginStatus.textContent = 'Please enter both username and password.';
      loginStatus.style.color = 'red';
      return;
    }

    // Basic mock authentication logic - replace with real backend process in production
    loginStatus.textContent = 'Login successful! Redirecting...';
    loginStatus.style.color = 'green';

    setTimeout(() => {
      // Redirect based on username keyword (for demo)
      if (username.toLowerCase().includes('employer')) {
        window.location.href = 'employer.html';
      } else if (username.toLowerCase().includes('candidate')) {
        window.location.href = 'candidate.html';
      } else {
        window.location.href = 'index.html';
      }
    }, 1500);
  });
});

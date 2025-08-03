document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const signupStatus = document.getElementById('signupStatus');

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(signupForm);
    const username = formData.get('username').trim();
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const role = formData.get('role');

    if (!username || !email || !password || !role) {
      signupStatus.textContent = 'Please fill in all the required fields.';
      signupStatus.style.color = 'red';
      return;
    }

    // Demo: Save user data in localStorage (simple example)
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.username === username)) {
      signupStatus.textContent = 'Username already exists. Choose another.';
      signupStatus.style.color = 'red';
      return;
    }

    users.push({ username, email, password, role });
    localStorage.setItem('users', JSON.stringify(users));

    signupStatus.textContent = 'Account created successfully! You can now log in.';
    signupStatus.style.color = 'green';
    signupForm.reset();

    setTimeout(() => {
      signupStatus.textContent = '';
      window.location.href = 'login.html'; // Redirect to login after successful signup
    }, 3000);
  });
});


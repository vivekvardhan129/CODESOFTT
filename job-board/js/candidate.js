document.addEventListener('DOMContentLoaded', () => {
  const profileForm = document.getElementById('profileForm');
  const profileUpdateStatus = document.getElementById('profileUpdateStatus');
  const myApplicationsDiv = document.getElementById('myApplications');

  let profile = JSON.parse(localStorage.getItem('candidateProfile')) || { fullName: '', email: '' };
  let applications = JSON.parse(localStorage.getItem('applications')) || [];

  profileForm.fullName.value = profile.fullName || '';
  profileForm.email.value = profile.email || '';

  function renderApplications() {
    if (applications.length === 0) {
      myApplicationsDiv.innerHTML = '<p>You have not applied for any jobs yet.</p>';
      return;
    }

    // Filter applications made by this candidate email (or all for demo)
    const myApps = applications.filter(app => app.email === profile.email);
    if (myApps.length === 0) {
      myApplicationsDiv.innerHTML = '<p>You have not applied for any jobs yet.</p>';
      return;
    }

    myApplicationsDiv.innerHTML = myApps.map(app => `
      <div class="job-card">
        <strong>Job ID: ${app.jobId}</strong><br/>
        <small>Applied on: ${new Date(app.date).toLocaleDateString()}</small><br/>
        <small>Resume: ${app.resumeName}</small>
      </div>
    `).join('');
  }

  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = profileForm.fullName.value.trim();
    const email = profileForm.email.value.trim();

    if (!fullName || !email) {
      profileUpdateStatus.textContent = 'Please fill in all profile fields.';
      profileUpdateStatus.style.color = 'red';
      return;
    }

    profile = { fullName, email };
    localStorage.setItem('candidateProfile', JSON.stringify(profile));

    profileUpdateStatus.textContent = 'Profile updated successfully!';
    profileUpdateStatus.style.color = 'green';

    renderApplications();

    setTimeout(() => { profileUpdateStatus.textContent = ''; }, 3000);
  });

  renderApplications();
});


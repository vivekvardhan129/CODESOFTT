document.addEventListener('DOMContentLoaded', () => {
  const postJobForm = document.getElementById('postJobForm');
  const employerJobs = document.getElementById('employerJobs');
  const jobPostStatus = document.getElementById('jobPostStatus');

  // Load posted jobs or create empty array
  let postedJobs = JSON.parse(localStorage.getItem('postedJobs')) || [];

  function renderPostedJobs() {
    if (postedJobs.length === 0) {
      employerJobs.innerHTML = '<p>No jobs posted yet.</p>';
      return;
    }
    employerJobs.innerHTML = postedJobs.map(job => `
      <div class="job-card">
        <strong>${job.title}</strong><br/>
        <small>${job.company} - ${job.location}</small><br/>
        <p>${job.description}</p>
      </div>
    `).join('');
  }

  postJobForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(postJobForm);

    const newJob = {
      id: Date.now().toString(),
      title: formData.get('title').trim(),
      company: formData.get('company').trim(),
      location: formData.get('location').trim(),
      description: formData.get('description').trim()
    };

    if (!newJob.title || !newJob.company || !newJob.location || !newJob.description) {
      jobPostStatus.textContent = 'Please fill in all fields.';
      jobPostStatus.style.color = 'red';
      return;
    }

    postedJobs.push(newJob);
    localStorage.setItem('postedJobs', JSON.stringify(postedJobs));

    jobPostStatus.textContent = 'Job posted successfully!';
    jobPostStatus.style.color = 'green';
    postJobForm.reset();
    renderPostedJobs();

    setTimeout(() => { jobPostStatus.textContent = ''; }, 3000);
  });

  // Initial displayed posted jobs
  renderPostedJobs();
});


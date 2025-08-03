document.addEventListener('DOMContentLoaded', () => {
  const jobDetailSection = document.getElementById('jobDetail');
  const applicationForm = document.getElementById('applicationForm');
  const applicationStatus = document.getElementById('applicationStatus');

  const params = new URLSearchParams(window.location.search);
  const jobId = params.get('id');

  // Demo set of jobs (should match jobs.js or be fetched)
  const jobs = [
    { id: "1", title: "Full Stack Developer", company: "RemoteGen", location: "Remote", description: "Build innovative web applications using modern technologies." },
    { id: "2", title: "Data Analyst", company: "CrunchAI", location: "Hyderabad", description: "Analyze complex datasets to drive business decisions." },
    { id: "3", title: "Project Manager", company: "BuildRight", location: "Mumbai", description: "Lead and manage software development projects." }
  ];

  const job = jobs.find(j => j.id === jobId);

  if (job) {
    jobDetailSection.innerHTML = `
      <h2>${job.title}</h2>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p>${job.description}</p>
    `;
  } else {
    jobDetailSection.innerHTML = '<p>Sorry, this job was not found.</p>';
  }

  applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = applicationForm.name.value.trim();
    const email = applicationForm.email.value.trim();
    const resume = applicationForm.resume.files[0];

    if (!name || !email || !resume) {
      applicationStatus.textContent = 'Please fill all fields and upload your resume.';
      applicationStatus.style.color = 'red';
      return;
    }

    // Simulate saving application (e.g., to localStorage)
    let applications = JSON.parse(localStorage.getItem('applications')) || [];
    applications.push({
      jobId,
      name,
      email,
      resumeName: resume.name,
      date: new Date().toISOString()
    });
    localStorage.setItem('applications', JSON.stringify(applications));

    applicationStatus.textContent = 'Application submitted successfully! We will contact you soon.';
    applicationStatus.style.color = 'green';
    applicationForm.reset();
  });
});


// You can preload some jobs or fetch them from localStorage/backend
const jobs = [
  { id: "1", title: "Full Stack Developer", company: "RemoteGen", location: "Remote" },
  { id: "2", title: "Data Analyst", company: "CrunchAI", location: "Hyderabad" },
  { id: "3", title: "Project Manager", company: "BuildRight", location: "Mumbai" }
];

document.addEventListener('DOMContentLoaded', () => {
  const jobListings = document.getElementById('jobListings');
  const jobSearch = document.getElementById('jobSearch');

  function renderJobs(filter = '') {
    const filteredJobs = jobs.filter(job =>
      job.title.toLowerCase().includes(filter.toLowerCase()) ||
      job.company.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredJobs.length === 0) {
      jobListings.innerHTML = '<p style="text-align:center; color:#888;">No jobs found.</p>';
      return;
    }

    jobListings.innerHTML = filteredJobs.map(job => `
      <div class="job-card">
        <a href="job-detail.html?id=${job.id}">
          <strong>${job.title}</strong>
        </a><br/>
        <span>${job.company} - ${job.location}</span>
      </div>
    `).join('');
  }

  jobSearch.addEventListener('input', () => renderJobs(jobSearch.value));
  renderJobs();
});


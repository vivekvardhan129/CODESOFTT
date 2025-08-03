document.addEventListener('DOMContentLoaded', () => {
  const jobList = [
    { id: "1", title: "Full Stack Developer", company: "RemoteGen", location: "Remote" },
    { id: "2", title: "Data Analyst", company: "CrunchAI", location: "Hyderabad" }
  ];

  const featuredJobs = document.getElementById('featuredJobs');
  featuredJobs.innerHTML = jobList.map(job =>
    `<div class="job-card">
      <a href="job-detail.html?id=${job.id}"><strong>${job.title}</strong></a> @ ${job.company}<br/>
      <span>${job.location}</span>
    </div>`
  ).join('');
});

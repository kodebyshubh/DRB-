function generateResume() {
  document.getElementById('previewName').textContent = document.getElementById('name').value;
  document.getElementById('previewEmail').textContent = document.getElementById('email').value;
  document.getElementById('previewPhone').textContent = document.getElementById('phone').value;
  document.getElementById('previewEducation').textContent = document.getElementById('education').value;
  document.getElementById('previewSkills').textContent = document.getElementById('skills').value;
  document.getElementById('previewExperience').textContent = document.getElementById('experience').value;
  document.getElementById('previewHobbies').textContent = document.getElementById('hobbies').value;
}

// Enable live preview: update on each keystroke in every field
document.getElementById('name').addEventListener('input', generateResume);
document.getElementById('email').addEventListener('input', generateResume);
document.getElementById('phone').addEventListener('input', generateResume);
document.getElementById('education').addEventListener('input', generateResume);
document.getElementById('experience').addEventListener('input', generateResume);
document.getElementById('skills').addEventListener('input', generateResume);
document.getElementById('hobbies').addEventListener('input', generateResume);

// Optional: initialize preview on page load
generateResume();

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ format: "a4", unit: "mm" });
  let y = 20;

  const name = document.getElementById('previewName').textContent;
  const email = document.getElementById('previewEmail').textContent;
  const phone = document.getElementById('previewPhone').textContent;
  const education = document.getElementById('previewEducation').textContent;
  const experience = document.getElementById('previewExperience').textContent;
  const skills = document.getElementById('previewSkills').textContent;
  const hobbies = document.getElementById('previewHobbies').textContent;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(name, 105, y, { align: "center" });
  y += 10;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Email: ${email} | Phone: ${phone}`, 105, y, { align: "center" });
  y += 10;

  function drawSection(title, content) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(title, 20, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const bullets = content.split(/\n|\•|- /).filter(t => t.trim() !== "");
    bullets.forEach(line => {
      if (y > 270) return; // Stay on one A4 page
      doc.text("• " + line.trim(), 25, y);
      y += 6;
    });
    y += 4;
  }

  drawSection("Education", education);
  drawSection("Experience", experience);
  drawSection("Projects", hobbies);
  drawSection("Technical Skills", skills);

  doc.save("My_Resume.pdf");
}

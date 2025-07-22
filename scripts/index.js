// Current Year
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = lastModified;

// COURSE DETAILS
const courseDetails = document.getElementById('course-details');

// HAMBURGER MENU
document.addEventListener('DOMContentLoaded', function () {
  const menu = document.getElementById('MAIN_MENU');
  const hamburger = document.querySelector('.hamburger');

  hamburger.addEventListener('click', function (e) {
    e.preventDefault();
    menu.classList.toggle('menu-open');
    this.textContent = menu.classList.contains('menu-open') ? '✕' : '☰';
  });
});

// DISPLAY COURSES
document.addEventListener('DOMContentLoaded', function () {
  const courses = [
    { 
      code: "🎖️WDD 130", 
      credits: 2, 
      completed: true, 
      department: "WDD",
      title: "Web Fundamentals",
      description: "Introduction to HTML and CSS ",
      technology: ["HTML5", "CSS3"]
    },
    { 
      code: "🎖️WDD 131", 
      credits: 2, 
      completed: true, 
      department: "WDD",
      title: "Dynamic Web Development",
      description: "Advanced client-side web development techniques",
      technology: ["JavaScript", "DOM"]
    },
    { 
      code: "WDD 231", 
      credits: 2, 
      completed: false, 
      department: "WDD",
      title: "Web Frontend Fundaments",
      description: "Introduction to modern frontend frameworks",
      technology: ["APIs","JSON"]
    },
    { 
      code: "🎖️CSE 110", 
      credits: 2, 
      completed: true, 
      department: "CSE",
      title: "Introduction to Programming",
      description: "Fundamentals of programming logic",
      technology: ["Python", "Algorithms"]
    },
    { 
      code: "🎖️CSE 111", 
      credits: 2, 
      completed: true, 
      department: "CSE",
      title: "Programming with Functions",
      description: "Structured programming concepts and techniques",
      technology: ["Python", "Functions"]
    },
    { 
      code: "CSE 210", 
      credits: 2, 
      completed: false, 
      department: "CSE",
      title: "Programming with Classes",
      description: "Principles of C#",
      technology: ["C#"]
    }
  ];

  const coursesSection = document.getElementById('courses');
  const creditsDisplay = document.querySelector('main > p:last-of-type');

  while (coursesSection.children.length > 4) {
    coursesSection.removeChild(coursesSection.lastChild);
  }
  
  document.querySelector('#courses .left').addEventListener('click', () => showCourses('all'));
  document.querySelector('#courses .center').addEventListener('click', () => showCourses('CSE'));
  document.querySelector('#courses .rigth').addEventListener('click', () => showCourses('WDD'));

  function showCourses(filter) {
    const filteredCourses = filter === 'all'
      ? courses
      : courses.filter(c => c.department === filter);

    const elementsToKeep = Array.from(coursesSection.children).slice(0, 4);
    coursesSection.innerHTML = '';
    elementsToKeep.forEach(el => coursesSection.appendChild(el));

    filteredCourses.forEach((course, index) => {
      const p = document.createElement('p');
      p.textContent = course.code;

      const positionClass = ['left', 'center', 'rigth'][index % 3];
      p.classList.add(positionClass);

      if (course.completed) {
        p.classList.add('completed');
      }

      p.addEventListener('click', () => {
        const codeParts = course.code.replace("🎖️", "").split(" ");
        displayCourseDetails({
          subject: codeParts[0],
          number: codeParts[1],
          title: course.title,
          credits: course.credits,
          certificate: course.completed ? "Yes" : "No",
          description: course.description,
          technology: course.technology
        });
      });

      coursesSection.appendChild(p);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditsDisplay.textContent = `The total credits for courses listed above is ${totalCredits}`;
  }

  showCourses('all');
});

function displayCourseDetails(course) {
  courseDetails.innerHTML = '';
  courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits:</strong> ${course.credits}</p>
    <p><strong>Certificate:</strong> ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
  `;
  courseDetails.showModal();

  document.getElementById('closeModal').addEventListener("click", () => {
    courseDetails.close();
  });

  // Close when clicking outside modal
  courseDetails.addEventListener("click", (e) => {
    if (e.target === courseDetails) {
      courseDetails.close();
    }
  });
}
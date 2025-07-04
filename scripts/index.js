// Current Year
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = lastModified;

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

//DISPLAY COURSES
document.addEventListener('DOMContentLoaded', function () {

  const courses = [
    { code: "🎖️WDD 130", credits: 2, completed: true, department: "WDD" },
    { code: "🎖️WDD 131", credits: 2, completed: true, department: "WDD" },
    { code: "WDD 231", credits: 2, completed: false, department: "WDD" },
    { code: "🎖️CSE 110", credits: 2, completed: true, department: "CSE" },
    { code: "🎖️CSE 111", credits: 2, completed: true, department: "CSE" },
    { code: "CSE 210", credits: 2, completed: false, department: "CSE" },

    // ADD COURSES
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

      coursesSection.appendChild(p);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditsDisplay.textContent = `The total credits for course listed above is ${totalCredits}`;
  }

  showCourses('all');
});
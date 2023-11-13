if (PerformanceNavigationTiming === 1) {
  // Page is refreshed, remove the sticky class
  let header = document.querySelector('.header');

  header.classList.remove('sticky');
}

window.onscroll = () => {
  let header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.classList.add('sticky');

  } else {
    header.classList.remove('sticky');
  }
};
// /**
//  * navbar toggle
//  */

const navToggle = document.getElementById('navToggle');
const navbar = document.getElementById('navbar');

const blurMain = document.querySelector('main')

// Function to toggle the blur effect on the main content
function toggleBlur() {
  blurMain.classList.toggle('blured');
}

function hideMenu() {
  navbar.classList.remove('active');
  blurMain.classList.remove('blured');
}


navToggle.addEventListener('click', function () {
  navbar.classList.toggle('active');
  toggleBlur()
});


const sections = document.querySelectorAll('section');
const navbarItems = document.querySelectorAll('.nav-navbar .navbar-item');

navbarItems.forEach(item => {
  item.addEventListener('click', hideMenu);
});

window.addEventListener('scroll', function () {
  let currentSection = null;

  sections.forEach(sections => {

    const sectionTop = sections.offsetTop - 90;
    const sectionBottom = sectionTop + sections.clientHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      currentSection = sections;
    }
  });

  navbarItems.forEach(item => {
    item.classList.remove('active');
  });

  if (currentSection) {
    const correspondingNavItem = document.querySelector(`a[href="#${currentSection.id}"]`);
    if (correspondingNavItem) {
      correspondingNavItem.parentElement.classList.add('active');
    }
  }

  hideMenu();
});


// form submit 
const scriptURL = 'https://script.google.com/macros/s/AKfycbz1vij2gv6CNJoF8_lnphm7PReue3oqNgfwGIzmW0ItULnhG85rfIORg_pZY5pS2KiDOg/exec';
const form = document.forms['submit-message-google'];

const submitButton = document.getElementById('btn-submit');
const loadingButton = document.getElementById('btn-loading');

let submitSucces = document.querySelector('.submit-success');
let submitFail = document.querySelector('.submit-fail')

form.addEventListener('submit', e => {
  e.preventDefault();

  submitButton.style.display = "none";
  loadingButton.style.display = "flex";
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(
      response => {
        console.log('Success!', response);
        submitButton.style.display = "block";
        loadingButton.style.display = "none";
        submitSucces.classList.add('show');
        setTimeout(() => {
          submitSucces.classList.remove('show');
        }, 3000);
        form.reset();
      })
    .catch(
      error => {
        console.error('Error!', error.message)
        submitButton.style.display = "block";
        loadingButton.style.display = "none";
        submitFail.classList.add('show');
        setTimeout(() => {
          submitFail.classList.remove('show');
        }, 3000);
      })
});



function displaySkill() {
  fetch('../assets/txt/skill.txt')
    .then(response => response.text())
    .then(data => {
      const lines = data.split('\n');
      const skillList = document.querySelector('.skill-list');

      // Loop through each line to extract skills and percentages.
      lines.forEach(line => {
        const [skill, percentage] = line.split(',');
        const cleanedPercentage = percentage.trim('%');
        // Create the HTML elements for each skill and its percentage.
        const skillItem = document.createElement('i');
        skillItem.classList.add('skill-item');

        const skillWrapper = document.createElement('div');
        skillWrapper.classList.add('skill-wrapper');
        skillWrapper.style.width = percentage;

        const skillTitle = document.createElement('h3');
        skillTitle.classList.add('sw-title');
        skillTitle.textContent = skill;

        const skillsData = document.createElement('data');
        skillsData.classList.add('skills-data');
        skillsData.style.left = percentage;
        skillsData.setAttribute('value', cleanedPercentage);
        skillsData.textContent = percentage;

        const skillBarBox = document.createElement('div');
        skillBarBox.classList.add('skill-bar-box');

        const skillBar = document.createElement('div');
        skillBar.classList.add('skill-bar');
        skillBar.style.width = percentage;

        // Append the elements to the skillList.
        skillWrapper.appendChild(skillTitle);
        skillWrapper.appendChild(skillsData);
        skillItem.appendChild(skillWrapper);
        skillItem.appendChild(skillBarBox);
        skillBarBox.appendChild(skillBar);
        skillList.appendChild(skillItem);
      })

    })
    .catch(error => console.error('Error reading the file:', error));
}

function showExp(item) {
	const exp = document.querySelector('.exp-list');
	item.data.forEach(expData => {
		const expItem = document.createElement('li');
		expItem.classList.add('exp-item');

		const expHeader = document.createElement('div');
		expHeader.classList.add('ie-header');

    const expTitle = document.createElement('h1');
    expTitle.textContent = expData.exp_title;

		const expContent = document.createElement('div');
		expContent.classList.add('ie-content');

    const expJob =  document.createElement('h3');
    expJob.textContent = expData.exp_job;

    const expDesc =  document.createElement('p');
		expDesc.textContent = expData.exp_desc;

		expHeader.appendChild(expTitle);
		expContent.appendChild(expJob);
		expContent.appendChild(expDesc);
    expItem.appendChild(expHeader);
    expItem.appendChild(expContent)
		exp.appendChild(expItem);
	});
}


function displayExp() {
  fetch("../assets/txt/exp.json")
    .then(response => response.json())
    .then(data => {
      // Loop through the JSON data and populate the HTML elements
      data.forEach(item => {
        if (item.name === "exp") {
          showExp(item);
        }
      });
    })
    .catch(error => {
      console.error("Error fetching JSON:", error);
    });

}

displaySkill();

displayExp();

const headerplaceholder = document.getElementById('header-placeholder');

headerplaceholder.innerHTML = `
<header class="global-nav">
  <div id="blur-overlay"></div>
  <nav class="topnav">
    <ul class="nav-list">

      <li class="nav-item">
        <a href="index.html"><img class="logo" src="images/transp-logo.png" alt="Logo"></a>
      </li>

      <li class="nav-item dropdown">
        <a class="nav-link">Departments</a>

        <div class="mega-menu">
          <div class="menu-container">

            <div class="menu-column">
              <h4 id="c">Learn About Our Departments</h4>
              <a href="strategy.html">Strategy</a>
              <a href="outreach.html">Outreach</a>
              <a href="mechanical.html">Mechanical</a>
              <a href="controls.html">Controls</a>
            </div>

          </div>
        </div>
      </li>

      <li class="nav-item"><a href="portfolio.html">Portfolio</a></li>
      <li class="nav-item"><a href="support.html">Support Us</a></li>
      <li class="nav-item"><a href="contact.html">Contact</a></li>
      <li class="nav-item"><a href="prevrobots.html">Previous Robots</a></li>
      <li class="nav-item"><a href="timeline.html">Timeline</a></li>

    </ul>
  </nav>
</header>
`;



const footerPlaceholder = document.getElementById('footer-placeholder');

footerPlaceholder.innerHTML = `
<footer>
  <p id="a">CCA Robo Ravens</p>
  <div class="footer-content">
  <div class="footer-links">
    <a href="" class="href">Donate to the Team</a> 
    <a href="#">7159roboravens@gmail.com</a> 
  </div>
  <div class="other-footer-links">
    <a href="#">5951 Village Center Loop Rd.</a>
    <a href="#">San Diego, CA 92130</a> 
  </div>
  </div>
  <p>© 2025 by FTC Team 7159 Robo Ravens</p>
</footer>
`;


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, {
    threshold: 0.4  
});

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let slowed = false;

const images = {}; // store loaded images
const shapeNames = ["2gear", "3gear", "wrench"];


// Preload images
shapeNames.forEach(name => {
    const img = new Image();
    img.src = `particlefiles/${name}.png`;
    images[name] = img;
});

// Resize canvas
function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;

    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}
resizeCanvas();
window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
});
window.addEventListener("load", () => {
    resizeCanvas();
    initParticles();
});

// Init particles
function initParticles() {
    particles = [];
    const count = 8;
    const rect = canvas.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * rect.width,
            y: Math.random() * rect.height,
            size: Math.random() * 20 + 10,  // bigger for visibility
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            rot: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.02,
            shape: shapeNames[Math.floor(Math.random() * shapeNames.length)]
        });
    }
}

// Draw a particle using SVG
function drawParticle(p) {
    const img = images[p.shape];
    if (!img.complete) return; // wait for image to load

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);

    // --- Step 4: apply dark gray filter ---
    ctx.filter = "grayscale(100%) brightness(30%)"; // makes white icons dark gray

    ctx.drawImage(img, -p.size/2, -p.size/2, p.size, p.size);

    ctx.filter = "none"; // reset filter for next draw
    ctx.restore();
}

// Animate
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rect = canvas.getBoundingClientRect();
    particles.forEach(p => {
        p.x += slowed ? p.speedX * 0.25 : p.speedX;
        p.y += slowed ? p.speedY * 0.25 : p.speedY;
        p.rot += p.rotSpeed;

        // Wrap edges
        if (p.x < -p.size) p.x = rect.width + p.size;
        if (p.x > rect.width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = rect.height + p.size;
        if (p.y > rect.height + p.size) p.y = -p.size;

        drawParticle(p);
    });

    requestAnimationFrame(animate);
}
animate();

// Hover slow
const wrapper = document.querySelector(".particle-wrapper");
wrapper.addEventListener("mouseenter", () => slowed = true);
wrapper.addEventListener("mouseleave", () => slowed = false);



document.addEventListener("DOMContentLoaded", () => {

  const track = document.getElementById("sliderTrack");
  let slides = Array.from(track.children);

  // Clone first + last for infinite loop
  const firstClone = slides[0].cloneNode(true);
  const lastClone  = slides[slides.length - 1].cloneNode(true);

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  slides = Array.from(track.children);

  let index = 1;
  let locked = false;

  function update() {
    const width = track.parentElement.clientWidth;

    slides.forEach(slide => {
      slide.style.minWidth = width + "px";
    });

    track.style.transform = `translateX(${-width * index}px)`;
  }

  window.addEventListener("resize", update);
  window.addEventListener("load", update);
  update();

  /* Slide function */
  function gotoSlide(i) {
    if (locked) return;
    locked = true;

    index = i;
    const width = track.parentElement.clientWidth;

    track.style.transition = "transform 0.45s ease";
    track.style.transform = `translateX(${-width * index}px)`;
  }

  /* Handle loop boundaries */
  track.addEventListener("transitionend", () => {
    const width = track.parentElement.clientWidth;

    if (index === slides.length - 1) {
      track.style.transition = "none";
      index = 1;
      track.style.transform = `translateX(${-width * index}px)`;
    }

    if (index === 0) {
      track.style.transition = "none";
      index = slides.length - 2;
      track.style.transform = `translateX(${-width * index}px)`;
    }

    locked = false;
  });

  /* Buttons */
  document.getElementById("sliderNext").addEventListener("click", () => {
    gotoSlide(index + 1);
  });

  document.getElementById("sliderPrev").addEventListener("click", () => {
    gotoSlide(index - 1);
  });

});

// --- Dropdown Blur Logic (Apple-style) ---

const dropdown = document.querySelector('.dropdown');
const overlay = document.getElementById('blur-overlay');

dropdown.addEventListener('mouseenter', () => {
    overlay.classList.add('active');
});

dropdown.addEventListener('mouseleave', () => {
    overlay.classList.remove('active');
});

// Close blur if user clicks the overlay (optional but nice)
overlay.addEventListener('click', () => {
    overlay.classList.remove('active');
});

// async function animate(startColor, endColor, element, repititions, timeMS, deg1, deg2) {
//     let color = startColor;
//     let increment = [(endColor[0] - startColor[0]) / repititions,(endColor[1] - startColor[1]) / repititions, (endColor[2] - startColor[2]) / repititions];
//     let degree = deg1;
//     for (let i = 0; i < repititions; i++) {
//         // element.innerHTML = color;
//         // element.style.backgroundColor = "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
//         element.style.backgroundImage = "linear-gradient(" + degree + "deg," + "rgb( " + color[0] + "," + color[1] + "," + color[2] + "), rgb(" + color[0] / 1.2 + "," + color[1] / 1.2+"," + color[2] / 1.2 + "))";
//         color = [color[0] + increment[0], color[1] + increment[1], color[2] + increment[2]];
//         await wait(timeMS / repititions);
//         degree += (deg2 - deg1) / repititions;
//     }
// }

// function wait(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function typeEffect(Text, totalTime, element) {
//     let timePer = totalTime / Text.length;
//     text = "";
//     for (let i = 0; i <= Text.length; i++) {
//         element.innerHTML = text;
//         text = text + Text[i];
//         await wait(timePer);
//     }
// }

// function runAnimate() {
//     animate([255, 0, 0], [0, 240, 150], document.getElementById("headerDesc"), 1000, 5000, 0, 180);
//     typeEffect("This is what happens when you press a button and granny is unhappy, you don't want granny unhappy do you?", 5000, document.getElementById("Intro"));
//     // document.getElementById("headerDesc").innerHTML = "You Suck";
// }
// // animate([255, 0, 0], [0, 240, 150], document.getElementById("headerDesx"), 1000, 5000);
// // document.getElementById("body").innerHTML = "This is Javascript Working";
// // document.addEventListener("DOMContentLoaded", function() {
// //     // Your code to run after the DOM is ready
// //     animateBackground();
// //     console.log("DOM is fully loaded and parsed!");
// // });



// async function animateBackground(elementName) {
//   let rand = 100;
//   let rand2 = 100;
//   let ranDegree = Math.random() * 365 + 1;
//   console.log("Randegree1" + ranDegree);
//   let randList1 = [rand * (Math.random() + .5), rand * (Math.random() + .5), rand * (Math.random() + .5)]
//     background = document.getElementById(elementName);
//     while(rand < 256) {
//         console.log(rand);
//         rand = Math.random() * 150 + 52;
//         rand2 = Math.random() * 150 + 52;
//         console.log("Randegree" + ranDegree);
//         let ranDegree2 = Math.random() * 365;
//         let randList2 = [rand2 * (Math.random() + .5), rand2 * (Math.random() + .5), rand2 * (Math.random() + .5)];
//         await animate(randList1, randList2, background, 5000, 500, ranDegree, ranDegree2);
//         await wait(500);
//         ranDegree = Math.random * 365;
//         randList1 = [rand * (Math.random() + .5), rand * (Math.random() + .5), rand * (Math.random() + .5)];
//         await animate(randList2, randList1, background, 5000, 2500, ranDegree2, ranDegree);
//     }
// }

// animateBackground("body")
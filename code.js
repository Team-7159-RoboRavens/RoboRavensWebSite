const headerplaceholder = document.getElementById('header-placeholder');

headerplaceholder.innerHTML = `
<header>
  <nav class="topnav">
    <ul>
  <li><a href="index.html"><img class="logo" src="images/transp-logo.png" alt="Logo"></a></li>
      <li class="dropdown">
        <a>Departments</a>
        <ul class="dropdown-menu">
            <li><a href="strategy.html">Strategy</a></li>
            <li><a href="outreach.html">Outreach</a></li>
            <li><a href="mechanical.html">Mechanical</a></li>
            <li><a href="controls.html">Controls</a></li>
        </ul>
      </li>
      <li><a href="portfolio.html">Portfolio</a></li>
      <li><a href="support.html">Support Us</a></li>
      <li><a href="contact.html">Contact</a></li>
      <li><a href="prevrobots.html">Previous Robots</a></li>
      <li><a href="timeline.html">Timeline</a></li>
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


document.addEventListener("DOMContentLoaded", () => {
  /* ----------------------------------------------------
     PRELOAD IMAGES — prevents images not loading on fast scroll
  ---------------------------------------------------- */
  const preloadImages = (sources) => {
    sources.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  };

  // Add ALL your gallery images here:
  preloadImages([
    "images/homepageimg1.avif",
    "images/logo.png"
    // add more as you add more images
  ]);

  /* ----------------------------------------------------
     SLIDER SETUP
  ---------------------------------------------------- */
  const track = document.getElementById("gallery");
  const container = track.parentElement;
  let images = Array.from(track.querySelectorAll("img"));

  // Force immediate loading for safety
  images.forEach(img => img.loading = "eager");

  // Clone first + last images for loop
  const firstClone = images[0].cloneNode(true);
  const lastClone = images[images.length - 1].cloneNode(true);

  track.appendChild(firstClone);
  track.insertBefore(lastClone, images[0]);

  images = Array.from(track.querySelectorAll("img"));

  let index = 1;
  let isSliding = false; // prevents spam-click bugs

  function updateWidths() {
    const frameWidth = container.clientWidth;

    images.forEach(img => {
      img.style.minWidth = frameWidth + "px";
      img.style.width = frameWidth + "px";
    });

    track.style.transform = `translateX(${-frameWidth * index}px)`;
  }

  window.addEventListener("resize", updateWidths);
  window.addEventListener("load", updateWidths);
  updateWidths();

  /* ----------------------------------------------------
     SLIDE FUNCTION WITH SPAM-PROTECTION
  ---------------------------------------------------- */
  function slideTo(i) {
    if (isSliding) return; // prevents fast button spam from breaking gallery
    isSliding = true;

    const frameWidth = container.clientWidth;
    index = i;

    track.style.transition = "transform 0.45s ease";
    track.style.transform = `translateX(${-frameWidth * index}px)`;
  }

  /* ----------------------------------------------------
     LOOP FIX AFTER TRANSITION
  ---------------------------------------------------- */
  track.addEventListener("transitionend", () => {
    const frameWidth = container.clientWidth;

    // Jump from cloned first → real first
    if (index === images.length - 1) {
      track.style.transition = "none";
      index = 1;
      track.style.transform = `translateX(${-frameWidth * index}px)`;
    }

    // Jump from cloned last → real last
    if (index === 0) {
      track.style.transition = "none";
      index = images.length - 2;
      track.style.transform = `translateX(${-frameWidth * index}px)`;
    }

    isSliding = false; // allow next click
  });

  /* ----------------------------------------------------
     BUTTONS
  ---------------------------------------------------- */
  document.getElementById("nextBtn").addEventListener("click", () => {
    slideTo(index + 1);
  });

  document.getElementById("backBtn").addEventListener("click", () => {
    slideTo(index - 1);
  });
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
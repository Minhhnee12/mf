
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
  // Variables
  var words = ["Software Engineering ", "Full-Stack Engineer", "Web Developer"],
      part,
      i = 0,
      offset = 0,
      len = words.length,
      forwards = true,
      skip_count = 0,
      skip_delay = 15,
      speed = 50;

  const cWAutoTyping = document.querySelector(".codewheel-auto-typing");

  function typingText() {
    setInterval(function () {
      if (forwards) {
        if (offset >= words[i].length) {
          ++skip_count;
          if (skip_count == skip_delay) {
            forwards = false;
            skip_count = 0;
          }
        }
      } else {
        if (offset == 0) {
          forwards = true;
          i++;
          offset = 0;
          if (i >= len) {
            i = 0;
          }
        }
      }
      part = words[i].substr(0, offset);
      if (skip_count == 0) {
        if (forwards) {
          offset++;
        } else {
          offset--;
        }
      }
      cWAutoTyping.textContent = part;
    }, speed);
  }

  typingText();
});

window.addEventListener('load', () => {
  const contentClasses = ['header', '.hero-content', '.avatar-container']; // Mảng chứa tên thẻ và các lớp

  function showContent(index) {
    if (index < contentClasses.length) {
      const selector = contentClasses[index];
      const elements = document.querySelectorAll(selector); 
      elements.forEach(element => element.classList.add('show'));
      setTimeout(() => showContent(index + 1), 300);
    }
  }

  showContent(0);
});

const sections = document.querySelectorAll('.about-section, .section, .portfolio-section, .contacts-section');
let lastScrollTop = 0;

function checkVisibility() {
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const isScrollingDown = currentScrollTop > lastScrollTop;

  // Chỉ xử lý khi cuộn xuống
  if (isScrollingDown) {
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) {
        setTimeout(() => {
          section.classList.add('show');
        }, index * 300); 
      }
    });
  }

  lastScrollTop = currentScrollTop;
}

window.addEventListener('scroll', checkVisibility);
checkVisibility(); 

const skillProgressElements = document.querySelectorAll('.skill-progress');

skillProgressElements.forEach(skillProgress => {
  let width = 0;
  const targetWidth = parseInt(skillProgress.textContent);

  function updateProgressBar() {
    if (width < targetWidth) {
      width++;
      skillProgress.style.width = width + '%';
      skillProgress.textContent = width + '%'; // Cập nhật nội dung hiển thị trước
      requestAnimationFrame(updateProgressBar);
    }
  }

  updateProgressBar();
});

let banner = document.querySelector('.banner');
let canvas = document.getElementById('dotsCanvas');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d');
const dots = [];
const arrayColors = ['#d5c900', '#545454', '#596d91', '#bb5a68', '#696541'];
for (let index = 0; index < 50; index++) {
    dots.push({
        x:  Math.floor(Math.random() * canvas.width),
        y:  Math.floor(Math.random() * canvas.height),
        size: Math.random() * 3 + 5,
        color: arrayColors[Math.floor(Math.random()* 5)]
    });
}
const drawDots = () => {
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI*2);
        ctx.fill();
    })
}
drawDots();
banner.addEventListener('mousemove', (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
    let mouse = {
        x:  event.pageX - banner.getBoundingClientRect().left,
        y:  event.pageY - banner.getBoundingClientRect().top
    }
    dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if(distance < 200){
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    })
})
banner.addEventListener('mouseout', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
})
window.addEventListener('resize', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = banner.offsetWidth;
    canvas.height = banner.offsetHeight;
    dot = [];
    for (let index = 0; index < 50; index++) {
        dots.push({
            x:  Math.floor(Math.random() * canvas.width),
            y:  Math.floor(Math.random() * canvas.height),
            size: Math.random() * 3 + 5,
            color: arrayColors[Math.floor(Math.random()* 5)]
        });
    }
    drawDots();
})
const $next = document.querySelector('.next');
const $prev = document.querySelector('.prev');

$next.addEventListener('click', () => {
    const items = document.querySelectorAll('.item');
    document.querySelector('.slide'). appendChild(items[0]);
}, 
);

$prev.addEventListener('click', () => {
    const items = document.querySelectorAll('.item');
    document.querySelector('.slide'). prepend(items[items.length - 1]);
    }, 
);
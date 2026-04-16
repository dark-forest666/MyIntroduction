// ==================== 导航栏滚动效果 ====================
const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      if (!navbar.classList.contains('scrolled')) {
        navbar.classList.add('scrolled');
      }
    }
  });
}

// ==================== 滚动动画触发 ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const scrollElements = document.querySelectorAll('.scroll-animate');
  scrollElements.forEach(el => {
    observer.observe(el);
  });
});

// ==================== 表单提交（演示） ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('感谢您的留言！/ Thank you for your message!');
    contactForm.reset();
  });
}

console.log('个人网站加载成功！/ Personal website loaded successfully!');

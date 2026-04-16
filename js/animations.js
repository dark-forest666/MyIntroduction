// ==================== 打字机效果 ====================
const typewriter = document.getElementById('typewriter');

if (typewriter) {
  const originalText = '你好，我是朱栎芝';
  const englishText = 'Hello, I am Litchi';
  let isChinese = true;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = isChinese ? originalText : englishText;
    
    if (!isDeleting) {
      typewriter.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      
      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      typewriter.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      
      if (charIndex === 0) {
        isDeleting = false;
        isChinese = !isChinese;
      }
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 500);
}

// ==================== 粒子背景效果 ====================
let particles = [];
let particlesContainer = null;
let mouseX = 0;
let mouseY = 0;

function initParticles() {
  particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;

  const particleCount = 50;

  // 清空现有粒子
  particles = [];
  particlesContainer.innerHTML = '';

  // 创建初始粒子
  for (let i = 0; i < particleCount; i++) {
    createParticle(Math.random() * 100, Math.random() * 100, false);
  }

  // 鼠标移动跟踪
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // 粒子跟随鼠标
  updateParticles();

  // 点击时产生新粒子
  document.addEventListener('click', (e) => {
    if (e.target.closest('.hero')) {
      for (let i = 0; i < 2; i++) {
        setTimeout(() => {
          if (particlesContainer) {
            const rect = particlesContainer.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            createParticle(x, y, true);
          }
        }, i * 100);
      }
    }
  });

  // 窗口大小改变时重绘粒子
  window.addEventListener('resize', () => {
    if (particlesContainer) {
      initParticles();
    }
  });
}

// 创建单个粒子的函数
function createParticle(x, y, isTemporary) {
  if (!particlesContainer) return;

  const particle = document.createElement('div');
  particle.className = 'particle';
  
  // 随机大小（增大尺寸）
  const size = Math.random() * 8 + 4;
  
  // 随机颜色（白色和灰色的组合）
  const colors = ['#FFFFFF', '#808080', '#A9A9A9'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  // 随机透明度
  const opacity = Math.random() * 0.5 + 0.3;
  
  // 随机形状（纯线条勾勒的几何图形）
  const shapes = ['circle', 'square', 'triangle', 'diamond'];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  
  particle.style.left = `${x}%`;
  particle.style.top = `${y}%`;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.opacity = opacity;
  particle.style.position = 'absolute';
  particle.style.pointerEvents = 'none';
  
  // 根据形状设置样式
  if (shape === 'circle') {
    particle.style.border = `1px solid ${color}`;
    particle.style.borderRadius = '50%';
    particle.style.background = 'transparent';
  } else if (shape === 'square') {
    particle.style.border = `1px solid ${color}`;
    particle.style.borderRadius = '0';
    particle.style.background = 'transparent';
  } else if (shape === 'triangle') {
    particle.style.border = 'none';
    particle.style.background = 'transparent';
    particle.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
    particle.style.border = `1px solid ${color}`;
  } else if (shape === 'diamond') {
    particle.style.border = 'none';
    particle.style.background = 'transparent';
    particle.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
    particle.style.border = `1px solid ${color}`;
  }
  
  particlesContainer.appendChild(particle);
  particles.push(particle);
  
  // 临时粒子消失动画
  if (isTemporary) {
    setTimeout(() => {
      particle.style.transition = 'all 1s ease-out';
      particle.style.opacity = '0';
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
          particles.splice(particles.indexOf(particle), 1);
        }
      }, 1000);
    }, 2000);
  }
}

// 粒子跟随鼠标
function updateParticles() {
  if (!particlesContainer) return;

  particles.forEach((particle, index) => {
    if (particle) {
      const rect = particlesContainer.getBoundingClientRect();
      const particleX = parseFloat(particle.style.left) / 100 * rect.width;
      const particleY = parseFloat(particle.style.top) / 100 * rect.height;
      
      const dx = mouseX - rect.left - particleX;
      const dy = mouseY - rect.top - particleY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        const force = (150 - distance) / 150;
        const moveX = (dx / distance) * force * 8;
        const moveY = (dy / distance) * force * 8;
        
        // 缓动效果
        const currentTransform = particle.style.transform || 'translate(0, 0)';
        const match = currentTransform.match(/translate\(([^,]+),\s*([^)]+)\)/);
        const currentX = match ? parseFloat(match[1]) : 0;
        const currentY = match ? parseFloat(match[2]) : 0;
        
        const newX = currentX + (moveX - currentX) * 0.1;
        const newY = currentY + (moveY - currentY) * 0.1;
        
        particle.style.transform = `translate(${newX}px, ${newY}px)`;
      } else {
        // 缓动回到原位
        const currentTransform = particle.style.transform || 'translate(0, 0)';
        const match = currentTransform.match(/translate\(([^,]+),\s*([^)]+)\)/);
        const currentX = match ? parseFloat(match[1]) : 0;
        const currentY = match ? parseFloat(match[2]) : 0;
        
        if (Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1) {
          const newX = currentX * 0.9;
          const newY = currentY * 0.9;
          particle.style.transform = `translate(${newX}px, ${newY}px)`;
        } else {
          particle.style.transform = 'translate(0, 0)';
        }
      }
    }
  });
  requestAnimationFrame(updateParticles);
}

// 初始化粒子效果
initParticles();

// ==================== 背景图片轮播 ====================
const bgSlider = document.querySelector('.bg-slider');
const bgSlides = document.querySelectorAll('.bg-slide');

if (bgSlider && bgSlides.length > 0) {
  let currentSlide = 0;
  
  function nextSlide() {
    bgSlides[currentSlide].style.opacity = '0';
    currentSlide = (currentSlide + 1) % bgSlides.length;
    bgSlides[currentSlide].style.opacity = '1';
  }
  
  // 每5秒切换一次
  setInterval(nextSlide, 5000);
}

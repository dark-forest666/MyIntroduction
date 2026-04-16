// ==================== 自定义鼠标光标 ====================
const cursor = document.querySelector('.custom-cursor');
const cursorGlow = document.querySelector('.cursor-glow');

if (cursor && cursorGlow) {
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;

    cursor.style.left = `${cursorX - 10}px`;
    cursor.style.top = `${cursorY - 10}px`;
    
    cursorGlow.style.left = `${glowX - 50}px`;
    cursorGlow.style.top = `${glowY - 50}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // 悬停交互元素时光标变化
  const interactiveElements = document.querySelectorAll('a, button, .card, input, textarea');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(1.5)';
      cursor.style.background = 'var(--color-primary)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.background = 'transparent';
    });
  });
}

// ==================== 涟漪效果 ====================
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('click', function(e) {
    // 避免在输入框和文本域上触发水波纹
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.closest('input') || e.target.closest('textarea')) {
      return;
    }
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

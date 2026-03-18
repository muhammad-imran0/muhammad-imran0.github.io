document.addEventListener('DOMContentLoaded', () => {

  // ---- CUSTOM CURSOR ----
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower && window.innerWidth > 768) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX - 4 + 'px';
      cursor.style.top = e.clientY - 4 + 'px';
      follower.style.left = e.clientX - 18 + 'px';
      follower.style.top = e.clientY - 18 + 'px';
    });

    document.querySelectorAll('a, button, .exp-card, .mini-card, .project-showcase').forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.style.width = '56px';
        follower.style.height = '56px';
        follower.style.left = parseInt(follower.style.left) - 10 + 'px';
        follower.style.top = parseInt(follower.style.top) - 10 + 'px';
        follower.style.borderColor = 'rgba(129, 140, 248, 0.5)';
      });
      el.addEventListener('mouseleave', () => {
        follower.style.width = '36px';
        follower.style.height = '36px';
        follower.style.borderColor = 'rgba(129, 140, 248, 0.3)';
      });
    });
  }

  // ---- PARTICLES ----
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, particles;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function createParticles() {
      const count = Math.min(60, Math.floor(w * h / 18000));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.5 + 0.5,
          o: Math.random() * 0.3 + 0.05
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${p.o})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${0.04 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();
    window.addEventListener('resize', () => { resize(); createParticles(); });
  }

  // ---- MOBILE NAV ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  // ---- REVEAL ON SCROLL ----
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ---- SKILL BAR ANIMATION ----
  const barObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.bar-fill').forEach((bar, i) => {
            setTimeout(() => bar.classList.add('animate'), i * 100);
          });
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.skills-col').forEach(el => barObserver.observe(el));

  // ---- NAV SCROLL EFFECT ----
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.borderBottomColor = 'rgba(255,255,255,0.08)';
    } else {
      nav.style.borderBottomColor = 'rgba(255,255,255,0.03)';
    }
  });
});

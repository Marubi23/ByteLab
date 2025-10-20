import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faLaptopCode,
  faUserShield,
  faGlobe,
  faFire,
  faBullhorn,      // <-- added announcement icon
  faCertificate
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  // ===== icons & data =====
  stats = [
    { icon: faUserShield as IconDefinition, value: '4.1M+', label: 'Students' },
    { icon: faLaptopCode as IconDefinition, value: '220+', label: 'Challenges' },
    { icon: faGlobe as IconDefinition, value: '80+', label: 'Countries' },
  ];

  features = [
    {
      icon: faLaptopCode,
      title: 'Practical Labs',
      text: 'Get hands-on cybersecurity experience in safe virtual environments.',
      image: '/handsonlab.jpg'
    },
    {
      icon: faUserShield,
      title: 'Guided Mentorship',
      text: 'Learn from cybersecurity professionals step-by-step through your journey.',
      image: '/business.jpg'
    },
    {
      icon: faGlobe,
      title: 'Global Community',
      text: 'Join a worldwide network of learners and defenders sharing insights and wins.',
      image: '/community.jpg'
    },
    {
      icon: faCertificate,
      title: 'Certifications',
      text: 'Earn certificates that showcase your cybersecurity expertise.',
      image: '/cert.JPG'
    }
  ];

  challenges = [
    { image: '/option1.jpg', title: 'Web Exploitation Basics', diff: 'Beginner' },
    { image: '/option2.jpg', title: 'Network Hacking 101', diff: 'Intermediate' },
    { image: '/option3.jpg', title: 'Forensics Deep Dive', diff: 'Advanced' }
  ];

  blogs = [
    {
      image: '/top10.JPG',
      title: 'Top 10 Hacking Labs for Beginners',
      excerpt: 'Start your cybersecurity journey with these beginner-friendly platforms.'
    },
    {
      image: '/security.jpg',
      title: 'Mastering Web Application Security',
      excerpt: 'Explore OWASP top 10 vulnerabilities and how to defend against them.'
    },
    {
      image: '/helphand.JPG',
      title: 'How to Build a Career in Cybersecurity',
      excerpt: 'Your step-by-step guide from newbie to professional ethical hacker.'
    }
  ];

  // Announcement icon property for template
  faBullhorn = faBullhorn;
  faFire = faFire;


  // ===== animation / canvas state =====
  private rafHandles: number[] = [];
  private resizeHandlers: Array<() => void> = [];
  private dynamicTimer: any = null;
  private dynamicDeleteTimers: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.startDynamicTextCycle();

    ['hero-bg', 'cta-bg', 'community-bg', 'blog-bg'].forEach(id => {
      this.initCanvasAnimation(id);
    });
  }

  ngOnDestroy(): void {
    this.rafHandles.forEach(h => cancelAnimationFrame(h));
    this.rafHandles = [];

    this.resizeHandlers.forEach(fn => window.removeEventListener('resize', fn));
    this.resizeHandlers = [];

    if (this.dynamicTimer) clearInterval(this.dynamicTimer);
    this.dynamicDeleteTimers.forEach(t => clearInterval(t));
    this.dynamicDeleteTimers = [];
  }

  // -------------------------
  // Dynamic text typing + delete
  // -------------------------
  private startDynamicTextCycle() {
    const el = document.getElementById('dynamic-text');
    if (!el) return;

    const words = ['Hackers', 'Students', 'Learners', 'Defenders'];
    let index = 0;

    el.textContent = `4.1M+ ${words[index]}`;

    const cycle = () => {
      const currentWord = words[index];
      const nextWord = words[(index + 1) % words.length];
      const base = '4.1M+ ';
      let text = `${base}${currentWord}`;
      let i = text.length;
      const deleteSpeed = 60;
      const del = setInterval(() => {
        if (i > base.length) {
          i--;
          el.textContent = text.slice(0, i);
        } else {
          clearInterval(del);
          const full = `${base}${nextWord}`;
          let j = el.textContent ? el.textContent.length : base.length;
          const typeSpeed = 75;
          const type = setInterval(() => {
            if (j <= full.length) {
              el.textContent = full.slice(0, j++);
            } else {
              clearInterval(type);
              index = (index + 1) % words.length;
              setTimeout(cycle, 1900);
            }
          }, typeSpeed);
          this.dynamicDeleteTimers.push(type);
        }
      }, deleteSpeed);
      this.dynamicDeleteTimers.push(del);
    };

    this.dynamicTimer = setTimeout(cycle, 2200);
  }

  // -------------------------
  // Canvas particle animation
  // -------------------------
  initCanvasAnimation(id: string) {
    const canvas = document.getElementById(id) as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      const height = parent ? parent.clientHeight : 320;
      canvas.width = Math.max(window.innerWidth, 300);
      canvas.height = Math.max(height, 180);
    };
    resize();
    const onResize = () => resize();
    window.addEventListener('resize', onResize);
    this.resizeHandlers.push(onResize);

    type Node = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };
    const nodes: Node[] = [];
    const count = Math.max(14, Math.floor(canvas.width / 80));
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: 0.8 + Math.random() * 2.2,
        alpha: 0.15 + Math.random() * 0.6
      });
    }

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      const grad = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, Math.max(w, h));
      grad.addColorStop(0, 'rgba(0,0,0,0.0)');
      grad.addColorStop(1, 'rgba(0,0,0,0.15)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < -10) n.x = w + 10;
        if (n.x > w + 10) n.x = -10;
        if (n.y < -10) n.y = h + 10;
        if (n.y > h + 10) n.y = -10;

        ctx.beginPath();
        ctx.fillStyle = `rgba(0,255,180,${n.alpha})`;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < Math.min(140, Math.max(80, canvas.width / 10))) {
            const op = 0.06 + (1 - dist / 140) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,255,180,${op})`;
            ctx.lineWidth = 1;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      const raf = requestAnimationFrame(draw);
      this.rafHandles.push(raf);
    };

    draw();
  }
}

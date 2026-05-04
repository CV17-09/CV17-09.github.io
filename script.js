(function () {
  const root = document.documentElement;

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const copyBtn = document.getElementById("copyEmail");

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.getAttribute("data-copy");
      if (!email) return;

      try {
        await navigator.clipboard.writeText(email);
        const original = copyBtn.textContent;
        copyBtn.textContent = "Copied ✓";
        setTimeout(() => (copyBtn.textContent = original), 1200);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  }

  const hyperBtn = document.getElementById("hyperToggle");
  let hyperspace = false;

  if (hyperBtn) {
    hyperBtn.addEventListener("click", () => {
      hyperspace = !hyperspace;
      root.classList.toggle("hyperspace", hyperspace);
    });
  }

  const projects = {
    oil: {
      title: "Oil Field Equipment Monitoring",
      subtitle: "Data Analytics & Automation",
      desc:
        "A monitoring and analytics system that tracks oil field equipment data, stores operational records in Azure SQL, highlights anomalies, and supports predictive maintenance workflows.",
      impact: [
        "Improves visibility into equipment health with dashboard-style reporting",
        "Uses Azure SQL to store and organize operational equipment data",
        "Flags anomalies early to support faster maintenance decisions",
        "Reduces manual monitoring by centralizing key metrics"
      ],
      tags: ["Python", "Azure SQL", "SQL", "Power BI", "Anomaly Detection"],
      repo: "https://github.com/CV17-09/Oil-Field-Euipment-Monitoring.git",
      img: "assets/project-oilfield.png"
    },

    dealership: {
      title: "Car Dealership Management System",
      subtitle: "Database System",
      desc:
        "A relational database solution for tracking dealership inventory, vehicle sales, customer records, and service operations using SQL.",
      impact: [
        "Centralizes sales and service data for cleaner reporting",
        "Supports faster lookups through structured SQL queries",
        "Improves data consistency using relational database design",
        "Uses SQL logic such as triggers, procedures, and reports"
      ],
      tags: ["MySQL", "SQL", "Stored Procedures", "Triggers", "Reporting"],
      repo: "https://github.com/CV17-09/Car-Dealership-Management-System.git",
      img: "assets/project-dealership.png"
    },

    budget: {
      title: "Budget Tracker Web App",
      subtitle: "Personal Finance Web Application",
      desc:
        "A lightweight budgeting web application to track income, expenses, savings goals, and spending patterns through a clean dashboard interface.",
      impact: [
        "Helps users track budgets with quick summaries",
        "Reduces manual calculations by automating totals",
        "Organizes spending into easier-to-read categories",
        "Improves usability with a simple dashboard layout"
      ],
      tags: ["JavaScript", "HTML", "CSS", "Dashboard", "Web App"],
      repo: "https://github.com/CV17-09/Budget-Tracker-Web-App.git",
      img: "assets/project-budget.png"
    },

    ai: {
      title: "AI Assistant – General Knowledge",
      subtitle: "RAG & AI Application",
      desc:
        "An AI-powered assistant that answers questions using Retrieval-Augmented Generation with document search, semantic understanding, and a FastAPI backend.",
      impact: [
        "Uses RAG to retrieve relevant document context before answering",
        "Supports natural language Q&A through a FastAPI backend",
        "Improves answer quality with semantic search",
        "Combines OpenAI, LlamaIndex, ChromaDB, and PostgreSQL"
      ],
      tags: ["Python", "FastAPI", "OpenAI API", "LlamaIndex", "ChromaDB", "PostgreSQL"],
      repo: "https://github.com/CV17-09/AI-Assistant-General-Knowledge.git",
      img: "assets/project-ai-assistant.png"
    }
  };

  const modal = document.getElementById("projectModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalTitle = document.getElementById("modalTitle");
  const modalSubtitle = document.getElementById("modalSubtitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalImpact = document.getElementById("modalImpact");
  const modalTags = document.getElementById("modalTags");
  const modalRepo = document.getElementById("modalRepo");
  const modalImg = document.getElementById("modalImg");

  function openProject(key) {
    const p = projects[key];
    if (!p || !modal) return;

    modalTitle.textContent = p.title;
    modalSubtitle.textContent = p.subtitle;
    modalDesc.textContent = p.desc;

    modalImpact.innerHTML = "";
    p.impact.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      modalImpact.appendChild(li);
    });

    modalTags.innerHTML = "";
    p.tags.forEach((t) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = t;
      modalTags.appendChild(span);
    });

    modalRepo.href = p.repo;
    modalImg.src = p.img;

    modalImg.onerror = () => {
      modalImg.style.display = "none";
    };

    modal.showModal();
  }

  function closeModal() {
    if (!modal) return;
    modal.close();
  }

  document.querySelectorAll("[data-project]").forEach((btn) => {
    btn.addEventListener("click", () => openProject(btn.getAttribute("data-project")));
  });

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  const canvas = document.getElementById("starfield");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  let w = 0;
  let h = 0;
  let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  function resize() {
    w = Math.floor(window.innerWidth);
    h = Math.floor(window.innerHeight);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener("resize", resize);
  resize();

  const stars = [];

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function initStars() {
    stars.length = 0;
    const count = Math.max(120, Math.floor((w * h) / 9000));

    for (let i = 0; i < count; i++) {
      stars.push({
        x: rand(0, w),
        y: rand(0, h),
        z: rand(0.2, 1.0),
        r: rand(0.6, 1.8),
        tw: rand(0, Math.PI * 2)
      });
    }
  }

  initStars();

  let mouseX = w / 2;
  let mouseY = h / 2;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  let last = performance.now();

  function tick(t) {
    const dt = Math.min(32, t - last);
    last = t;

    ctx.clearRect(0, 0, w, h);

    const px = (mouseX - w / 2) * 0.012;
    const py = (mouseY - h / 2) * 0.012;

    const baseSpeed = hyperspace ? 1.5 : 0.28;
    const speed = baseSpeed * (dt / 16);

    for (const s of stars) {
      s.y += speed * (1.5 + (1 - s.z) * 3.0);
      s.x += px * (1 - s.z) * 0.08;
      s.y += py * (1 - s.z) * 0.08;

      if (s.y > h + 10) {
        s.y = -10;
        s.x = rand(0, w);
      }

      if (s.x > w + 10) s.x = -10;
      if (s.x < -10) s.x = w + 10;

      s.tw += 0.02;

      const twinkle = 0.65 + 0.35 * Math.sin(s.tw);
      const alpha = (0.25 + (1 - s.z) * 0.75) * twinkle;

      if (hyperspace) {
        ctx.strokeStyle = `rgba(255, 176, 0, ${alpha * 0.35})`;
        ctx.lineWidth = Math.max(1, s.r * 0.7);
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x, s.y - (10 + (1 - s.z) * 28));
        ctx.stroke();
      } else {
        ctx.fillStyle = `rgba(245, 247, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * (0.7 + (1 - s.z)), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const g = ctx.createRadialGradient(
      w / 2,
      h / 2,
      Math.min(w, h) * 0.15,
      w / 2,
      h / 2,
      Math.max(w, h) * 0.62
    );

    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(1, "rgba(0,0,0,0.55)");

    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);

  let resizeTimer = null;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => initStars(), 150);
  });
})();
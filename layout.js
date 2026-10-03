/* Shared header, footer, icon sprite and contact list for every page. */
(function () {
  const page = document.body.dataset.page || "home";

  const sprite = `
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <symbol id="i-github" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></symbol>
    <symbol id="i-linkedin" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v5M8 8v.01M12 16v-5M12 13c0-1.5 1-2 2-2s2 .8 2 2v3"/></symbol>
    <symbol id="i-instagram" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></symbol>
    <symbol id="i-cube" viewBox="0 0 24 24"><path d="M12 3 4 7.5v9L12 21l8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></symbol>
    <symbol id="i-code" viewBox="0 0 24 24"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6M14 4l-4 16"/></symbol>
    <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></symbol>
    <symbol id="i-send" viewBox="0 0 24 24"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></symbol>
    <symbol id="i-grad" viewBox="0 0 24 24"><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6"/></symbol>
    <symbol id="i-gamepad" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 10.5v4M5 12.5h4M15.5 11v.01M18 14v.01"/></symbol>
    <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
    <symbol id="i-chevron" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></symbol>
    <symbol id="i-blender" viewBox="0 0 24 24"><circle cx="13" cy="14" r="5"/><circle cx="13" cy="14" r="1.8"/><path d="M3 15h5M6 10h6M9 6h6"/></symbol>
    <symbol id="i-cpp" viewBox="0 0 24 24"><path d="M12 2.5 20 7v10l-8 4.5L4 17V7z"/><path d="M15 9.5a4 4 0 1 0 0 5"/></symbol>
    <symbol id="i-godot" viewBox="0 0 24 24"><path d="M5 5c2 0 3 1 4 2h6c1-1 2-2 4-2v7c0 5-3 8-7 8s-7-3-7-8z"/><circle cx="9" cy="12" r="1.4"/><circle cx="15" cy="12" r="1.4"/><path d="M10 16.5h4"/></symbol>
    <symbol id="i-git" viewBox="0 0 24 24"><path d="M12 2.5 21.5 12 12 21.5 2.5 12z"/><circle cx="9.5" cy="9.5" r="1.3"/><circle cx="14.5" cy="14.5" r="1.3"/><circle cx="14.5" cy="9.5" r="1.3"/><path d="M9.5 10.8v2M13.2 9.5h-2.4"/></symbol>
    <symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></symbol>
  </svg>`;

  const gh = SITE.github, li = SITE.linkedin, ig = SITE.instagram;
  const nav = (id, href, label) =>
    `<a href="${href}"${page === id ? ' class="active" aria-current="page"' : ""}>${label}</a>`;

  const header = `
  <header class="nav">
    <div class="wrap">
      <a class="logo" href="index.html" aria-label="Home">${SITE.name.split(" ").map(w => w[0]).join("").toUpperCase()}/</a>
      <nav class="nav-links" aria-label="Primary">
        ${nav("home", "index.html", "Home")}
        ${nav("work", "work.html", "Renders &amp; Projects")}
        ${nav("about", "about.html", "About Me")}
      </nav>
      <div class="nav-social">
        <a class="glow-hover" href="https://github.com/${gh}" aria-label="GitHub"><svg class="icon fill"><use href="#i-github"/></svg></a>
        <a class="glow-hover" href="https://linkedin.com/in/${li}" aria-label="LinkedIn"><svg class="icon"><use href="#i-linkedin"/></svg></a>
        <a class="glow-hover" href="https://instagram.com/${ig}" aria-label="Instagram"><svg class="icon"><use href="#i-instagram"/></svg></a>
        <a class="glow-hover" href="mailto:${SITE.email}" aria-label="Email"><svg class="icon"><use href="#i-mail"/></svg></a>
      </div>
    </div>
  </header>`;

  const footer = `<footer>© ${new Date().getFullYear()} ${SITE.name}</footer>`;

  document.body.insertAdjacentHTML("afterbegin", header);
  document.body.insertAdjacentHTML("afterbegin", sprite);
  document.body.insertAdjacentHTML("beforeend", footer);

  // Fill [data-site] text and [data-contact] lists
  document.querySelectorAll("[data-site]").forEach((el) => {
    el.textContent = SITE[el.dataset.site];
  });
  document.title = document.title.replace("Your Name", SITE.name);

  document.querySelectorAll("[data-contact]").forEach((el) => {
    el.innerHTML = `
      <a href="mailto:${SITE.email}"><svg class="icon"><use href="#i-mail"/></svg>${SITE.email}</a>
      <a href="https://github.com/${gh}"><svg class="icon fill"><use href="#i-github"/></svg>github.com/${gh}</a>
      <a href="https://linkedin.com/in/${li}"><svg class="icon"><use href="#i-linkedin"/></svg>linkedin.com/in/${li}</a>
      <a href="https://instagram.com/${ig}"><svg class="icon"><use href="#i-instagram"/></svg>instagram.com/${ig}</a>`;
  });
})();

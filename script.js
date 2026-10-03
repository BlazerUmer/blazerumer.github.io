/* Page behaviour: renders, projects, lightbox, GitHub stats. */
const $ = (s, r = document) => r.querySelector(s);

/* ---------- Renders ---------- */
function renderTile(r, extra = "") {
  return `<a class="render ${extra}" href="${r.src}" data-title="${r.title}">
    <img src="${r.src}" alt="${r.title}" loading="lazy"></a>`;
}

function initHomeRenders() {
  const grid = $("#render-grid");
  if (!grid) return;
  const [main, ...rest] = SITE.renders;
  if (!main) return;
  const side = rest.slice(0, 3);
  grid.classList.toggle("single", side.length === 0);
  grid.innerHTML =
    renderTile(main, "render-main") +
    (side.length ? `<div class="render-side">${side.map((r) => renderTile(r)).join("")}</div>` : "");
}

function initRenderGallery() {
  const el = $("#render-gallery");
  if (!el) return;
  el.innerHTML = SITE.renders
    .map(
      (r) => `<figure>${renderTile(r, "render-card")}
        <figcaption><strong>${r.title}</strong><span>${r.tools || ""}</span></figcaption></figure>`
    )
    .join("");
}

/* ---------- Projects ---------- */
function projectCard(p) {
  const fill = p.icon === "github" ? " fill" : "";
  return `<a class="project" href="${p.url}" target="_blank" rel="noopener">
    <span class="project-icon"><svg class="icon${fill}"><use href="#i-${p.icon}"/></svg></span>
    <span class="project-body">
      <h3>${p.title}</h3><p>${p.desc}</p>
      <span class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</span>
    </span>
    <svg class="icon"><use href="#i-chevron"/></svg></a>`;
}

function initHomeProjects() {
  const el = $("#project-list");
  if (el) el.innerHTML = SITE.projects.slice(0, 3).map(projectCard).join("");
}

function initProjectGrid() {
  const grid = $("#project-grid");
  if (!grid) return;
  const filters = $("#filters");
  const tags = ["All", ...new Set(SITE.projects.flatMap((p) => p.tags))];

  const draw = (tag) => {
    const list = tag === "All" ? SITE.projects : SITE.projects.filter((p) => p.tags.includes(tag));
    grid.innerHTML = list.map(projectCard).join("");
    filters.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.tag === tag));
  };

  filters.innerHTML = tags.map((t) => `<button type="button" data-tag="${t}">${t}</button>`).join("");
  filters.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) draw(b.dataset.tag);
  });
  draw("All");
}

/* ---------- Lightbox ---------- */
function initLightbox() {
  const dlg = document.createElement("dialog");
  dlg.className = "lightbox";
  dlg.innerHTML = `<button type="button" aria-label="Close"><svg class="icon"><use href="#i-x"/></svg></button>
    <img alt=""><p></p>`;
  document.body.appendChild(dlg);
  const img = $("img", dlg), cap = $("p", dlg);

  document.addEventListener("click", (e) => {
    const tile = e.target.closest("a.render");
    if (tile) {
      e.preventDefault();
      if (tile.querySelector("img.missing")) return;
      img.src = tile.getAttribute("href");
      cap.textContent = tile.dataset.title || "";
      dlg.showModal();
    } else if (e.target === dlg || e.target.closest(".lightbox button")) {
      dlg.close();
    }
  });
}

/* ---------- Hide broken images so gradient placeholders show ---------- */
function hideBrokenImages() {
  document.querySelectorAll(".render img").forEach((img) => {
    const hide = () => img.classList.add("missing");
    img.addEventListener("error", hide);
    if (img.complete && img.naturalWidth === 0) hide();
  });
}

/* ---------- GitHub contributions ---------- */
function fakeDays() {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const days = [];
  const end = new Date();
  for (let i = 370; i >= 0; i--) {
    const d = new Date(Date.UTC(end.getFullYear(), end.getMonth(), end.getDate() - i));
    const r = rand();
    days.push({ date: d.toISOString().slice(0, 10), level: r < 0.45 ? 0 : r < 0.68 ? 1 : r < 0.84 ? 2 : r < 0.95 ? 3 : 4 });
  }
  return days;
}

function drawHeat(days) {
  const heat = $("#heat"), months = $("#months");
  const pad = new Date(days[0].date + "T00:00:00Z").getUTCDay();
  const weeks = Math.ceil((pad + days.length) / 7);

  heat.innerHTML =
    "<i style='visibility:hidden'></i>".repeat(pad) +
    days.map((d) => `<i class="${d.level ? "l" + d.level : ""}" title="${d.date}${d.count != null ? ": " + d.count : ""}"></i>`).join("");

  months.style.gridTemplateColumns = `repeat(${weeks}, 1fr)`;
  const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let last = -1, lastCol = -10, out = "";
  days.forEach((d, i) => {
    const m = new Date(d.date + "T00:00:00Z").getUTCMonth();
    const col = Math.floor((pad + i) / 7) + 1;
    if (m !== last) {
      if (last !== -1 && col - lastCol >= 3) {
        out += `<span style="grid-column:${col}">${names[m]}</span>`;
        lastCol = col;
      } else if (last === -1) {
        lastCol = col;
        out += `<span style="grid-column:${col}">${names[m]}</span>`;
      }
      last = m;
    }
  });
  months.innerHTML = out;
}

async function initGitHub() {
  if (!$("#heat")) return;
  const user = SITE.github;
  let days = null, total = null;

  if (user !== "yourname") {
    try {
      const r = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`);
      const d = await r.json();
      if (d.contributions && d.contributions.length) {
        days = d.contributions.map((c) => ({ date: c.date, level: c.level, count: c.count }));
        total = days.reduce((s, c) => s + c.count, 0);
      }
    } catch (e) { /* fall back to placeholder */ }
  }

  drawHeat(days || fakeDays());
  if (!days) return; // keep the placeholder numbers in the HTML

  $("#gh-total").textContent = total;
  const since = days[0].date;
  const count = async (url, el) => {
    try {
      const r = await fetch(url);
      const j = await r.json();
      $(el).textContent = j.total_count ?? "–";
    } catch (e) { $(el).textContent = "–"; }
  };
  const base = "https://api.github.com/search";
  count(`${base}/issues?q=author:${user}+type:issue+created:>=${since}&per_page=1`, "#gh-issues");
  count(`${base}/issues?q=author:${user}+type:pr+created:>=${since}&per_page=1`, "#gh-prs");
  count(`${base}/commits?q=author:${user}+author-date:>=${since}&per_page=1`, "#gh-commits");
}

/* ---------- Events ---------- */
function initEvents() {
  const el = $("#event-list");
  if (!el) return;
  const events = SITE.events || [];
  if (!events.length) {
    el.innerHTML = `<p class="empty">No events yet.</p>`;
    return;
  }
  el.innerHTML = events
    .map(
      (e, i) => `<details class="event"${i === 0 ? " open" : ""}>
        <summary>
          <span class="event-date">${e.date || ""}</span>
          <h3 class="event-title">${e.title}</h3>
          <span class="event-place">${e.place || ""}</span>
          <svg class="icon chev"><use href="#i-chevron"/></svg>
        </summary>
        <div class="event-main">
          <p>${e.text || ""}</p>
          ${
            e.photos && e.photos.length
              ? `<div class="event-photos">${e.photos.map((p) => renderTile(p, "event-photo")).join("")}</div>`
              : ""
          }
        </div>
      </details>`
    )
    .join("");
}

/* ---------- Go ---------- */
initHomeRenders();
initHomeProjects();
initRenderGallery();
initProjectGrid();
initEvents();
initLightbox();
hideBrokenImages();
initGitHub();

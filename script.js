// script.js – logika strony o kotach

document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "c8635295-e747-43cb-b193-3c2c82c237d0"; // <-- Wklej tutaj swój klucz z TheCatAPI
  const listaKotow = document.getElementById("lista-kotow");

  // --- Dodaj klasę index-page tylko na stronie głównej ---
  if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname === ""
  ) {
    document.body.classList.add("index-page");
  }

  // --- Renderuj rasy kotów tylko na stronie głównej ---
  if (listaKotow) {
    let allCats = [];

    fetch("https://api.thecatapi.com/v1/breeds?limit=10", {
      headers: {
        "x-api-key": API_KEY,
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (Array.isArray(data)) {
          allCats = data;
          renderCats(allCats);
        } else {
          listaKotow.innerHTML = "Nie udało się pobrać ras kotów.";
        }
      })
      .catch((error) => {
        listaKotow.innerHTML = "Błąd podczas pobierania danych z API.";
        console.error(error);
      });

    // Funkcja renderująca koty (zamiast duplikowania kodu)
    async function renderCats(cats) {
      listaKotow.innerHTML =
        '<div class="loading-info" aria-live="polite"><i class="fa-solid fa-spinner"></i> Ładowanie kotów...</div>';
      // Pobierz wszystkie zdjęcia równolegle
      const images = await Promise.all(
        cats.map(async (cat) => {
          let imgUrl = "";
          if (cat.reference_image_id) {
            try {
              const imgRes = await fetch(
                `https://api.thecatapi.com/v1/images/${cat.reference_image_id}`,
                { headers: { "x-api-key": API_KEY } }
              );
              if (imgRes.ok) {
                const imgData = await imgRes.json();
                imgUrl = imgData.url;
              }
            } catch (e) {
              imgUrl = "";
            }
          }
          return imgUrl;
        })
      );
      listaKotow.innerHTML = "";
      // Renderuj wszystkie karty naraz
      cats.forEach((cat, i) => {
        const template = document.getElementById("cat-card-template");
        const card = template.content.cloneNode(true);
        card.querySelector(".cat-name").textContent = cat.name;
        const imgEl = card.querySelector(".cat-img");
        if (images[i]) {
          imgEl.src = images[i];
          imgEl.alt = cat.name;
          imgEl.classList.remove("cat-img-placeholder");
          imgEl.setAttribute("loading", "lazy");
        } else {
          imgEl.src = "";
          imgEl.alt = "Brak zdjęcia";
          imgEl.classList.add("cat-img-placeholder");
          imgEl.removeAttribute("src");
        }
        card.querySelector(".cat-desc").innerHTML = `<strong>Opis:</strong> ${
          cat.description || "Brak opisu"
        }`;
        card.querySelector(".cat-origin").textContent = cat.origin || "?";
        card.querySelector(".cat-life").textContent =
          (cat.life_span || "?") + " lat";
        card.querySelector(".cat-weight").textContent =
          (cat.weight?.metric || "?") + " kg";
        card.querySelector(".cat-temperament").textContent =
          cat.temperament || "?";
        card.querySelector(".cat-hypo").textContent = cat.hypoallergenic
          ? "Tak"
          : "Nie";
        // Statystyki jako grid
        const stats = [
          {
            icon: "fa-heart",
            label: "Zdrowie",
            value:
              cat.health_issues !== undefined ? 5 - cat.health_issues : "?",
            tooltip: "Poziom zdrowia",
          },
          {
            icon: "fa-brush",
            label: "Pielęgnacja",
            value: cat.grooming ?? "?",
            tooltip: "Łatwość pielęgnacji",
          },
          {
            icon: "fa-volume-up",
            label: "Wokalizacja",
            value: cat.vocalisation ?? "?",
            tooltip: "Poziom wokalizacji",
          },
          {
            icon: "fa-bolt",
            label: "Energia",
            value: cat.energy_level ?? "?",
            tooltip: "Poziom energii",
          },
          {
            icon: "fa-dog",
            label: "Przyjazny psom",
            value: cat.dog_friendly ?? "?",
            tooltip: "Przyjazny psom",
          },
          {
            icon: "fa-child",
            label: "Przyjazny dzieciom",
            value: cat.child_friendly ?? "?",
            tooltip: "Przyjazny dzieciom",
          },
          {
            icon: "fa-lightbulb",
            label: "Inteligencja",
            value: cat.intelligence ?? "?",
            tooltip: "Poziom inteligencji",
          },
          {
            icon: "fa-users",
            label: "Towarzyskość",
            value: cat.social_needs ?? "?",
            tooltip: "Poziom towarzyskości",
          },
          {
            icon: "fa-feather",
            label: "Linienie",
            value: cat.shedding_level ?? "?",
            tooltip: "Poziom linienia",
          },
        ];
        const statsGrid = document.createElement("div");
        statsGrid.className = "cat-stats-grid";
        stats.forEach((stat) => {
          const statDiv = document.createElement("div");
          statDiv.className = "stat-grid-item";
          statDiv.title = stat.tooltip;
          statDiv.innerHTML = `<span class="stat-icon"><i class="fa-solid ${stat.icon}"></i></span><span class="stat-value">${stat.value}/5</span>`;
          statsGrid.appendChild(statDiv);
        });
        card.querySelector(".cat-stats-grid").replaceWith(statsGrid);
        // Wikipedia
        const wiki = card.querySelector(".cat-wiki");
        wiki.href = cat.wikipedia_url;
        wiki.textContent = "Wikipedia";
        listaKotow.appendChild(card);
      });
      // Scroll animation: dodaj klasę .visible gdy karta wchodzi do viewportu
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      listaKotow.querySelectorAll(".karta-kota").forEach((card) => {
        observer.observe(card);
      });
    }
  }

  // DARK MODE
  const darkToggle = document.getElementById("darkmode-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark");
  }
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });

  // --- Moja lista: obsługa localStorage i wyświetlanie własnych kotów z losowym zdjęciem z TheCatAPI ---
  if (window.location.pathname.includes("moja-lista.html")) {
    const form = document.getElementById("formularz-kota");
    const komunikat = document.getElementById("komunikat");
    const lista = document.getElementById("moja-lista-kotow");
    const filterInput = document.getElementById("filter-input");
    const sortSelect = document.getElementById("sort-select");

    function getMojeKoty() {
      return JSON.parse(localStorage.getItem("mojeKoty") || "[]");
    }
    function setMojeKoty(koty) {
      localStorage.setItem("mojeKoty", JSON.stringify(koty));
    }
    function filterAndSortKoty(koty) {
      let filtered = koty;
      const query = filterInput.value.trim().toLowerCase();
      if (query.length > 0) {
        filtered = filtered.filter(
          (cat) =>
            cat.imie.toLowerCase().includes(query) ||
            cat.rasa.toLowerCase().includes(query)
        );
      }
      switch (sortSelect.value) {
        case "imie-asc":
          filtered.sort((a, b) => a.imie.localeCompare(b.imie));
          break;
        case "imie-desc":
          filtered.sort((a, b) => b.imie.localeCompare(a.imie));
          break;
        case "rasa-asc":
          filtered.sort((a, b) => a.rasa.localeCompare(b.rasa));
          break;
        case "rasa-desc":
          filtered.sort((a, b) => b.rasa.localeCompare(a.rasa));
          break;
        case "dodane-asc":
          filtered.sort((a, b) => (a.addedAt || 0) - (b.addedAt || 0));
          break;
        case "dodane-desc":
          filtered.sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));
          break;
      }
      return filtered;
    }
    function renderMojeKoty() {
      let koty = getMojeKoty();
      koty = filterAndSortKoty(koty);
      lista.innerHTML = koty.length
        ? koty
            .map(
              (cat, idx) => `
                <div class="karta-kota moja-karta">
                  <h3>${cat.imie}</h3>
                  ${
                    cat.imgUrl
                      ? `<img class="cat-img" src="${cat.imgUrl}" alt="${cat.imie}" loading="lazy">`
                      : '<div class="cat-img-placeholder">Brak zdjęcia</div>'
                  }
                  <p class="cat-desc">${cat.opis ? cat.opis : "Brak opisu"}</p>
                  <ul class="cat-info">
                    <li><strong>Rasa:</strong> ${cat.rasa}</li>
                  </ul>
                  <button class="usun-kota" data-idx="${idx}" title="Usuń kota"><i class="fa-solid fa-trash"></i> Usuń</button>
                </div>
              `
            )
            .join("")
        : '<p style="text-align:center;">Brak kotów na Twojej liście.</p>';
      // Obsługa usuwania
      lista.querySelectorAll(".usun-kota").forEach((btn) => {
        btn.addEventListener("click", function () {
          const idx = this.dataset.idx;
          const koty = getMojeKoty();
          koty.splice(idx, 1);
          setMojeKoty(koty);
          renderMojeKoty();
        });
      });
    }
    filterInput.addEventListener("input", renderMojeKoty);
    sortSelect.addEventListener("change", renderMojeKoty);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const imie = form.imie.value.trim();
      const rasa = form.rasa.value.trim();
      const opis = form.opis.value.trim();
      komunikat.textContent = "";
      komunikat.className = "";
      if (!imie || !rasa) {
        komunikat.textContent = "Uzupełnij wymagane pola: imię i rasa.";
        komunikat.className = "komunikat-error";
        return;
      }
      // Pobierz losowe zdjęcie kota z TheCatAPI
      let imgUrl = "";
      try {
        const res = await fetch(
          "https://api.thecatapi.com/v1/images/search?size=small&mime_types=jpg,png",
          {
            headers: { "x-api-key": "c8635295-e747-43cb-b193-3c2c82c237d0" },
          }
        );
        const data = await res.json();
        if (Array.isArray(data) && data[0]?.url) {
          imgUrl = data[0].url;
        }
      } catch (e) {
        imgUrl = "";
      }
      const koty = getMojeKoty();
      koty.push({ imie, rasa, opis, imgUrl, addedAt: Date.now() });
      setMojeKoty(koty);
      komunikat.textContent = "Kot został dodany!";
      komunikat.className = "komunikat-success";
      form.reset();
      renderMojeKoty();
    });
    renderMojeKoty();
  }

  // Akordeon ciekawostek
  document.querySelectorAll(".akordeon-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const expanded = this.getAttribute("aria-expanded") === "true";
      // Zamknij wszystkie panele
      document
        .querySelectorAll(".akordeon-btn")
        .forEach((b) => b.setAttribute("aria-expanded", "false"));
      document
        .querySelectorAll(".akordeon-panel")
        .forEach((p) => (p.hidden = true));
      // Otwórz wybrany jeśli nie był otwarty
      if (!expanded) {
        this.setAttribute("aria-expanded", "true");
        const panel = document.getElementById(
          this.getAttribute("aria-controls")
        );
        if (panel) panel.hidden = false;
      }
    });
  });

  // W przyszłości: wyszukiwanie tylko w kotach dodanych przez użytkownika (localStorage)
});

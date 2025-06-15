// script.js – logika strony o kotach

document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "c8635295-e747-43cb-b193-3c2c82c237d0"; // <-- Wklej tutaj swój klucz z TheCatAPI
  const listaKotow = document.getElementById("lista-kotow");

  fetch("https://api.thecatapi.com/v1/breeds?limit=10", {
    headers: {
      "x-api-key": API_KEY,
    },
  })
    .then((response) => response.json())
    .then(async (data) => {
      if (Array.isArray(data)) {
        listaKotow.innerHTML = "";
        for (const cat of data) {
          let imgUrl = "";
          if (cat.reference_image_id) {
            try {
              const imgRes = await fetch(
                `https://api.thecatapi.com/v1/images/${cat.reference_image_id}`,
                {
                  headers: { "x-api-key": API_KEY },
                }
              );
              if (imgRes.ok) {
                const imgData = await imgRes.json();
                imgUrl = imgData.url;
              }
            } catch (e) {
              imgUrl = "";
            }
          }
          // Pobierz szablon karty kota
          const template = document.getElementById("cat-card-template");
          const card = template.content.cloneNode(true);
          card.querySelector(".cat-name").textContent = cat.name;
          const imgEl = card.querySelector(".cat-img");
          if (imgUrl) {
            imgEl.src = imgUrl;
            imgEl.alt = cat.name;
            imgEl.classList.remove("cat-img-placeholder");
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
        }
      } else {
        listaKotow.innerHTML = "Nie udało się pobrać ras kotów.";
      }
    })
    .catch((error) => {
      listaKotow.innerHTML = "Błąd podczas pobierania danych z API.";
      console.error(error);
    });
});

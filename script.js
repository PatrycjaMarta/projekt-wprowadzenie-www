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
          // Tabela statystyk z ikonami i tooltipami jako grid
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
          const statsGrid = `<div class='cat-stats-grid'>${stats
            .map(
              (stat) => `
            <div class="stat-grid-item" title="${stat.tooltip}">
              <span class="stat-icon"><i class="fa-solid ${stat.icon}"></i></span>
              <span class="stat-value">${stat.value}/5</span>
            </div>`
            )
            .join("")}</div>`;
          const card = document.createElement("div");
          card.className = "karta-kota";
          card.innerHTML = `
            <h3>${cat.name}</h3>
            ${
              imgUrl
                ? `<img src="${imgUrl}" alt="${cat.name}" class="cat-img">`
                : "<div class='cat-img cat-img-placeholder'>Brak zdjęcia</div>"
            }
            <p><strong>Opis:</strong> ${cat.description || "Brak opisu"}</p>
            <ul class="cat-info">
              <li><strong>Pochodzenie:</strong> ${cat.origin || "?"}</li>
              <li><strong>Długość życia:</strong> ${
                cat.life_span || "?"
              } lat</li>
              <li><strong>Waga:</strong> ${cat.weight?.metric || "?"} kg</li>
              <li><strong>Temperament:</strong> ${cat.temperament || "?"}</li>
              <li><strong>Hipoalergiczny:</strong> ${
                cat.hypoallergenic ? "Tak" : "Nie"
              }</li>
            </ul>
            ${statsGrid}
            <div style="margin-top:0.7rem"><a href="${
              cat.wikipedia_url
            }" target="_blank">Wikipedia</a></div>
          `;
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

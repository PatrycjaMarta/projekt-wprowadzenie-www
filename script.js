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
          const stat = (label, value, max = 5) =>
            `<li><strong>${label}:</strong> <span class='stat-bar'><span class='stat-fill' style='width:${
              (value / max) * 100
            }%'></span></span> (${value}/5)</li>`;
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
              <li><strong>Przyjazny dzieciom:</strong> ${
                cat.child_friendly ?? "?"
              }/5</li>
              <li><strong>Przyjazny psom:</strong> ${
                cat.dog_friendly ?? "?"
              }/5</li>
              <li><strong>Poziom energii:</strong> ${
                cat.energy_level ?? "?"
              }/5</li>
              <li><strong>Poziom inteligencji:</strong> ${
                cat.intelligence ?? "?"
              }/5</li>
              <li><strong>Poziom towarzyskości:</strong> ${
                cat.social_needs ?? "?"
              }/5</li>
              <li><strong>Poziom wokalizacji:</strong> ${
                cat.vocalisation ?? "?"
              }/5</li>
              <li><strong>Łatwość pielęgnacji:</strong> ${
                cat.grooming ?? "?"
              }/5</li>
              <li><strong>Poziom linienia:</strong> ${
                cat.shedding_level ?? "?"
              }/5</li>
              <li><strong>Poziom zdrowia:</strong> ${
                cat.health_issues !== undefined ? 5 - cat.health_issues : "?"
              }/5</li>
              <li><a href="${
                cat.wikipedia_url
              }" target="_blank">Wikipedia</a></li>
            </ul>
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

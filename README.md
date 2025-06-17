# Kociaki – katalog ras kotów

Projekt zaliczeniowy na przedmiot "Wprowadzenie do aplikacji WWW".

## Opis

Strona prezentuje katalog ras kotów z danymi pobieranymi z publicznego API [TheCatAPI](https://thecatapi.com/). Umożliwia przeglądanie ras, wyświetlanie szczegółowych statystyk (w formie ikon), a także dodawanie własnych kotów przez formularz. Całość wykonana w nowoczesnym stylu, responsywna, dostępna i przyjazna użytkownikowi.

## Funkcjonalności

- Pobieranie i wyświetlanie ras kotów z TheCatAPI (Fetch API)
- Nowoczesny, responsywny design (HTML, CSS, JS, Flexbox/Grid)
- Statystyki prezentowane w formie ikon i ocen
- Karuzela losowych zdjęć kotów (dynamiczna, przewijana)
- Sekcja „Ciekawostki o kotach” z akordeonem (dostępność, aria)
- Formularz do dodawania własnych kotów (walidacja, komunikaty)
- Własne koty przechowywane w localStorage (dodawanie, usuwanie, losowe zdjęcie z API)
- Dynamiczne filtrowanie i sortowanie własnych kotów
- Tryb ciemny (dark mode) z przełącznikiem i zapamiętywaniem w localStorage
- Lazy loading wszystkich zdjęć kotów (optymalizacja ładowania)
- Animacje pojawiania się kart kotów (IntersectionObserver)
- Spinner ładowania podczas pobierania danych
- Obsługa błędów (brak połączenia, brak zdjęcia, niepoprawne dane)
- Modularny, czytelny kod JS z komentarzami
- Pełna dostępność (WCAG): aria-label, aria-live, role, focus-visible, kontrast, nawigacja klawiaturą
- Historia commitów, praca etapami

## Uwaga dotycząca bezpieczeństwa klucza API

**Nigdy nie publikuj swojego klucza API w publicznym repozytorium!**

W tym projekcie klucz API do TheCatAPI został dodany w pliku `script.js` w miejscu:

```js
const API_KEY = "";
```

Klucz API nie powinien być przechowywany w repozytorium ani udostępniany publicznie, ponieważ każdy może go podejrzeć i wykorzystać. W prawdziwych projektach produkcyjnych klucze API przechowuje się po stronie serwera lub w zmiennych środowiskowych.

## Uruchomienie lokalnie

1. Sklonuj repozytorium:
   ```
   git clone https://github.com/PatrycjaMarta/projekt-wprowadzenie-www.git
   ```
2. Dodaj swój klucz API do pliku `script.js` lub użyj istniejącego.
3. Otwórz plik `index.html` w przeglądarce lub uruchom serwer lokalny (np. `python -m http.server` lub używając rozszerzenia live server).

## Autor

Patrycja Grajek

---

Projekt edukacyjny – nie do użytku produkcyjnego.

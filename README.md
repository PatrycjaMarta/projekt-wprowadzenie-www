# Kociaki – katalog ras kotów

Projekt zaliczeniowy na przedmiot "Wprowadzenie do aplikacji WWW".

## Opis

Strona prezentuje katalog ras kotów z danymi pobieranymi z publicznego API [TheCatAPI](https://thecatapi.com/). Umożliwia przeglądanie ras, wyświetlanie szczegółowych statystyk (w formie ikon), a także dodawanie własnych kotów przez formularz. Całość wykonana w nowoczesnym stylu, responsywna i przyjazna użytkownikowi.

## Funkcjonalności

- Pobieranie i wyświetlanie ras kotów z TheCatAPI
- Nowoczesny, responsywny design (HTML, CSS, JS)
- Statystyki prezentowane w formie ikon i ocen
- Formularz do dodawania własnych kotów
- Obsługa błędów i placeholderów dla brakujących zdjęć

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
   git clone ...
   ```
2. Dodaj swój klucz API do pliku `script.js` lub użyj istniejącego.
3. Otwórz plik `index.html` w przeglądarce lub uruchom serwer lokalny (np. `python -m http.server` lub używając rozszerzenia live server).

## Autor

Patrycja Grajek

---

Projekt edukacyjny – nie do użytku produkcyjnego.

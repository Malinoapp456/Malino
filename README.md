# Malino 2.0

Kreatywna aplikacja dla dzieci: kolorowanki, puzzle, gry edukacyjne, gwiazdki, nagrody i panel rodzica. Projekt korzysta z Next.js 15 i React 19, a interfejs aplikacji jest obecnie po niemiecku.

## Uruchamianie

```bash
npm install
npm run dev
```

Aplikacja będzie dostępna pod adresem http://localhost:3000.

## Testy i publikacja

```bash
npm test
npm run build
```

GitHub Actions uruchamia testy i kompilację przy otwieraniu pull requestów. Projekt może być publikowany na Vercel, ale zmiany należy najpierw sprawdzić w podglądzie gałęzi.

## Zapisywanie danych

- Profile, statystyki, gwiazdki i metadane galerii są przechowywane lokalnie w `localStorage`.
- Zapisane gry edukacyjne (labirynty, wyszukiwanki, różnice, puzzle i malowanie po numerach) są przypisane do **konkretnego profilu dziecka**, a nie współdzielone na całym urządzeniu.
- Przy pierwszym uruchomieniu po aktualizacji stare kolekcje są przypisywane do aktywnego profilu. Migracja wykonywana jest tylko raz, po potwierdzeniu zapisu danych profili. Stare klucze pozostają nietknięte, aby możliwy był powrót do wcześniejszej wersji.
- Ukończone kolorowanki zapisują **rzeczywisty podgląd obrazka i warstwę rysowania** w IndexedDB, oddzielnie dla każdego profilu. Można je potem zobaczyć w galerii i ponownie otworzyć do malowania.
- Dane **nie są synchronizowane między urządzeniami**. Wyczyszczenie danych witryny lub usunięcie aplikacji może spowodować utratę prac. Ważne obrazy można zapisać jako pliki na urządzeniu.
- W razie braku miejsca lub niedostępności IndexedDB zapis ukończonej pracy zostanie wstrzymany i pokazany zostanie komunikat.
- Starsze pozycje galerii mogą nadal pokazywać oryginalny szablon, ponieważ wcześniejsze wersje nie zapisywały namalowanych kolorów.
- Pojedyncze dotknięcie pędzlem, magicznym pędzlem lub gumką również rysuje/wymazuje punkt. Zmiana rozmiaru płótna przywraca kolory synchronicznie, aby uniknąć nadpisania nowych ruchów.

## Panel rodzica

PIN jest lokalnym zabezpieczeniem przed przypadkowym dostępem dzieci do ustawień, **a nie serwerowym systemem uwierzytelniania**. Zapis nowego PIN-u korzysta z losowej soli i PBKDF2-SHA-256. Po pięciu nieudanych próbach następuje 60 sekund blokady. Starsze czterocyfrowe PIN-y są migrowane przy otwarciu aplikacji bez konieczności ich zmiany.

Dzienny limit czasu zeruje się po zmianie dnia kalendarzowego, również gdy karta pozostaje otwarta.

## PWA i zasoby

`public/manifest.webmanifest` oraz `public/sw.js` realizują instalację i tryb offline. Obrazy i dźwięki znajdują się w katalogu `public`.

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

## Dźwięki — wersja testowa

Codzienne efekty kliknięć, wyboru koloru, sukcesu, gwiazdek i serii są odtwarzane lokalnie przez Web Audio. W wersji bajkowej kliknięcie przypomina ciche «puf», wybór koloru — bąbelek, sukces — drewniany dźwięk z magicznym dzwoneczkiem, a gwiazdki — drobny rozświetlony pył. Seriom towarzyszy łagodny ptasi gwizd, nagrodzie dyskretny magiczny szelest. Brzmienia są krótkie, stonowane i różnią się barwą, zamiast korzystać z jednego syntezatorowego sygnału. To syntezowane efekty, nie nagrania natury. Pliki WAV nadal służą do wyjątkowych animacji skrzyń oraz jako awaryjna ścieżka na starszych urządzeniach.

Do bajkowego pakietu dodano **prawdziwe nagranie ksylofonu**: krótka pogodna czteronutowa melodyjka z sampli akustycznego instrumentu (około 1,3 sekundy). Źródłem jest **VSCO 2 Community Edition** nagrane przez Sama Gossnera i Simona Dalzella (CC0 1.0). Zmontowany plik `public/sounds/xylophone-welcome.wav` jest odtwarzany lokalnie, bez komputerowej imitacji ksylofonu. Szczegóły w `public/sounds/XYLOPHONE-SOURCE.md`. Przeglądarki mobilne nie pozwalają na niezapowiedziane odtwarzanie audio przy samym załadowaniu strony, dlatego powitanie słychać **przy pierwszym dotknięciu ekranu lub naciśnięciu klawisza po otwarciu aplikacji**. Działa raz na załadowanie strony; pierwsze zwykłe kliknięcie nie powinno nałożyć się na powitanie. Powitanie działa również offline po zapisaniu przez PWA.

**Odsłuch na telefonie:** na stronie startowej dostępny jest przycisk **🎶 Xylofon anhören**, który pozwala ręcznie odtworzyć powitalną melodyjkę tyle razy, ile potrzeba. Pomaga to odróżnić problem pierwszego automatycznego odtwarzania od problemu z samym dźwiękiem. Włącz dźwięk w ustawieniach telefonu i aplikacji.

Aplikacja zachowuje istniejący przełącznik **Ton / Sound**: po wyłączeniu dźwięku interfejs nie powinien odtwarzać nowych efektów, włącznie z powitaniem. Nie dodano zewnętrznych bibliotek ani serwisów audio.

Przed publikacją należy odsłuchać wersję testową na telefonie, zwracając uwagę na kliknięcia wielu przycisków, kolorowanie, zdobywanie gwiazdek, otwieranie skrzyń i wyłączenie dźwięku.

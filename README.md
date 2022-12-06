# library-management-system

## Co projekt będzie robił?
System do zarządzania biblioteką multimediów. Będzie miał możliwość dodawania, usuwania, edycji i przeglądania książek, filmów, muzyki, seriali i innych multimediów. Będzie posiadał wsparcie dla kont użytkowników.

## Z jakich wzorców będzie korzystał?

### Wzorce kreacyjne: 
- Singleton - obiekt komunikujący się z bazą danych
- Budowniczy - tworzenie instancji przechowywanych multimediów
- Fabryka abstrakcyjna - umożliwia tworzenie różnych typów multimediów

### Wzorce strukturalne:
- Pełnomocnik - zarządzanie dostępem do multimediów
- Adapter - komunikacja z bazą danych
- Fasada - interfejs użytkownika

### Wzorce behawioralne:
- Iterator - umożliwia wyświetlanie multimediów
- Pamiątka - zapisywanie i przywracanie stanu multimediów podczas edycji
- Polecenie - umożliwia wykonywanie operacji na multimediach
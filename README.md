# ⛳ Ansis appen

Din smarta golfpartner - en Progressive Web App med GPS, live väder och intelligenta klubbrekommendationer.

![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🎯 Funktioner

### ✅ Smarta funktioner
- **GPS-baserad avståndsmätning** - Exakt avstånd till flaggan i realtid
- **Live väderdata** - OpenWeatherMap integration
- **Intelligent klubbval** - Tar hänsyn till vind, temperatur och avstånd
- **Flaggpositionsjustering** - Justera flaggans position på greenen (0-10m åt alla håll)
- **Sikteråd** - Automatisk kompensation för sidovind
- **Auto-väder med manuell override** - Väderdata uppdateras automatiskt, men du kan justera manuellt i 20 sekunder

### 📱 PWA-funktioner
- Installeras som app på hemskärmen
- Fungerar offline
- Fullskärmsläge
- Sparar alla inställningar lokalt
- Snabb och responsiv

### ⚙️ Anpassningsbart
- **13 klubbor** - Lägg in dina egna klubbor och slaglängder
- **18 hål** - Konfigurera hela golfbanan med GPS-koordinater
- **Flaggjustering** - Ange om flaggan är fram/bak eller höger/vänster på greenen

## 🚀 Kom igång

### Alternativ 1: GitHub Pages (Rekommenderas)

1. Forka detta repository
2. Gå till Settings → Pages
3. Under "Source", välj "main" branch
4. Spara och vänta några minuter
5. Din app är live på: `https://dittnamn.github.io/ansis-appen`

### Alternativ 2: Lokal testning

```bash
# Klona repositoryt
git clone https://github.com/dittnamn/ansis-appen.git
cd ansis-appen

# Starta lokal server (Python)
python3 -m http.server 8000

# Eller med Node.js
npx http-server -p 8000

# Öppna: http://localhost:8000
```

### Alternativ 3: Direkt deploy

Ladda upp alla filer till vilken webbhotell som helst:
- Netlify (gratis)
- Vercel (gratis)
- Firebase Hosting (gratis)

## 📱 Installera på telefon

### iPhone/iPad (Safari)
1. Öppna appen i Safari
2. Tryck på delningsknappen (↗️)
3. Välj "Lägg till på hemskärm"
4. Tryck "Lägg till"

### Android (Chrome)
1. Öppna appen i Chrome
2. Banner dyker upp: "Lägg till Ansis appen på startsidan"
3. Tryck "Lägg till"
4. Alternativt: Meny (⋮) → "Lägg till på startsidan"

## 🔧 Konfiguration

### OpenWeatherMap API-nyckel

Appen använder en inkluderad API-nyckel, men du kan byta till din egen:

1. Skaffa gratis API-nyckel på [OpenWeatherMap](https://openweathermap.org/api)
2. Öppna `app.js`
3. Hitta raden: `const API_KEY = '99d688898682ba4fc727529cd0fbd7ac';`
4. Byt ut med din nyckel

### Anpassa standarddata

I `app.js` kan du ändra:

**Klubbor:**
```javascript
const [clubs, setClubs] = useState([
  { id: 1, name: 'Driver', distance: 230 },
  // ... lägg till dina klubbor
]);
```

**Hål:**
```javascript
const [holes, setHoles] = useState([
  { number: 1, flagLat: 59.3293, flagLon: 18.0686, par: 4 },
  // ... dina GPS-koordinater
]);
```

## 🗂️ Filstruktur

```
ansis-appen/
├── index.html          # Huvudfil
├── app.js              # React-app med all logik
├── manifest.json       # PWA-konfiguration
├── sw.js              # Service Worker (offline)
├── icon-192.png       # App-ikon 192x192
├── icon-512.png       # App-ikon 512x512
├── README.md          # Denna fil
└── .gitignore         # Git-ignore
```

## 💡 Användning

### 1. Konfigurera dina klubbor
Gå till "Klubbor"-fliken och lägg in alla dina 13 klubbor med rätt slaglängder.

### 2. Registrera golfbanan
Gå till "Bana"-fliken och:
- Lägg in GPS-koordinater för varje flaggposition
- Du kan använda Google Maps för att hitta exakta koordinater
- Ställ in rätt par för varje hål

### 3. Spela!
- Gå till "Spela"-fliken
- Tillåt GPS-åtkomst
- Välj vilket hål du spelar
- Justera flaggposition om den inte är i mitten
- Se klubbrekommendation och sikteråd

### 4. Flaggjustering
När flaggan **inte** är i mitten av greenen:
- Dra reglaget "Djup" för fram/bak-position
- Dra reglaget "Sidled" för höger/vänster-position
- Avståndsmätningen uppdateras automatiskt

### 5. Väder
- Uppdateras automatiskt var 10:e minut
- Dra i reglagen för att testa andra värden
- Återgår automatiskt efter 20 sekunder

## 🐛 Felsökning

### GPS fungerar inte
- Tillåt platsåtkomst i webbläsaren
- Gå utomhus för bättre signal
- Vänta 10-30 sekunder för GPS-fix
- Kontrollera att platstjänster är på i telefonen

### Väder uppdateras inte
- Kontrollera internetuppkoppling
- Vänta 20 sekunder om du justerat manuellt
- Tryck på 🔄-knappen
- Kontrollera API-nyckeln i `app.js`

### Appen installeras inte
- Använd HTTPS (eller localhost)
- Prova Chrome eller Safari
- Rensa webbläsarens cache

## 📊 Browser Support

- ✅ Chrome/Edge (Android & Desktop)
- ✅ Safari (iOS & macOS)
- ✅ Firefox (Android & Desktop)
- ✅ Samsung Internet

## 🤝 Bidra

Bidrag välkomnas! Forka repot och skicka en Pull Request.

### Utveckling

```bash
# Klona repot
git clone https://github.com/dittnamn/ansis-appen.git

# Gör dina ändringar i app.js

# Testa lokalt
python3 -m http.server 8000

# Committa och pusha
git add .
git commit -m "Din ändring"
git push origin main
```

## 📝 Roadmap

- [ ] Scorekort med slagräkning
- [ ] Statistik över rundor
- [ ] Spara flera banor
- [ ] Höjdkompensation
- [ ] Dela banor med vänner
- [ ] Dark mode

## 📄 Licens

MIT License - fri att använda och modifiera

## ⛳ Lycka till på banan!

Ha en trevlig rond! 🏌️‍♂️

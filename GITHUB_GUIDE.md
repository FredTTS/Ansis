# 🚀 Ladda upp till GitHub

## Steg-för-steg guide

### 1. Skapa GitHub-konto
Om du inte har ett, gå till [github.com](https://github.com) och registrera dig.

### 2. Skapa nytt repository
1. Klicka på "+" uppe till höger → "New repository"
2. Namn: `ansis-appen`
3. Description: "Min smarta golfpartner app"
4. Välj "Public"
5. **VIKTIGT**: Bocka INTE i "Add a README file"
6. Klicka "Create repository"

### 3. Ladda upp filer

Du har två alternativ:

#### Alternativ A: Via webbgränssnittet (Enklast)
1. På din nya repository-sida, klicka "uploading an existing file"
2. Dra och släpp alla filer:
   - index.html
   - app.js
   - manifest.json
   - sw.js
   - README.md
   - .gitignore
   - icon-192.png (skapa först)
   - icon-512.png (skapa först)
3. Lägg till commit-meddelande: "Initial commit"
4. Klicka "Commit changes"

#### Alternativ B: Via kommandoraden
```bash
# Navigera till din mapp med filerna
cd /path/to/ansis-appen

# Initiera git
git init

# Lägg till alla filer
git add .

# Committa
git commit -m "Initial commit"

# Lägg till remote (byt ut DITTNAMN)
git remote add origin https://github.com/DITTNAMN/ansis-appen.git

# Pusha
git branch -M main
git push -u origin main
```

### 4. Aktivera GitHub Pages
1. Gå till ditt repository på GitHub
2. Klicka på "Settings" (uppe till höger)
3. Scrolla ner till "Pages" (vänster meny)
4. Under "Source", välj "main" branch
5. Klicka "Save"
6. Vänta 2-3 minuter

### 5. Testa din app
Din app är nu live på:
```
https://DITTNAMN.github.io/ansis-appen
```

Byt ut DITTNAMN mot ditt GitHub-användarnamn.

## 🎨 Skapa ikoner

Innan du laddar upp, skapa ikonerna:

1. Öppna `create-icons-script.html` i en webbläsare
2. Högerklicka på varje ikon
3. Välj "Spara bild som..."
4. Spara som `icon-192.png` och `icon-512.png`

## ✅ Checklista

- [ ] GitHub-konto skapat
- [ ] Repository skapat
- [ ] Ikoner genererade (icon-192.png, icon-512.png)
- [ ] Alla filer uppladdade
- [ ] GitHub Pages aktiverat
- [ ] Testat appen på telefonen

## 📝 Uppdatera appen senare

För att göra ändringar:

1. Redigera filerna lokalt
2. Gå till ditt repo på GitHub
3. Klicka på filen du vill ändra
4. Klicka på pennikonen (Edit)
5. Gör dina ändringar
6. Scrolla ner och klicka "Commit changes"

Appen uppdateras automatiskt inom 1-2 minuter!

## 🆘 Behöver du hjälp?

- [GitHub Pages dokumentation](https://docs.github.com/en/pages)
- [GitHub Desktop](https://desktop.github.com/) - Enklare att använda än kommandoraden

## 🎉 Klart!

Din app är nu live och tillgänglig för alla! Dela länken med dina golfkompisar! 🏌️‍♂️

# Milledoni  Cadeauwebsite

Een website waar gebruikers het perfecte cadeau kunnen vinden door een formulier in te vullen. De website toont cadeaus die gebruikers kunnen liken.

## Video demo

**Desktop versie**  
 [Bekijk de demo-video (MP4)](./public/assets/images/video.mp4)

**Mobiele versie**  
 [Bekijk de demo-video (MP4)](./public/assets/images/vid.mp4)

## Wat doet de website?

- Gebruikers vullen een formulier in (voor wie, welke gelegenheid, budget)
- Website toont passende cadeaus  
- Gebruikers kunnen cadeaus liken met een hartje
- Filters om snel categorieën te bekijken (trending, luxe, etc.)

## Belangrijke features

### 1. Zoekformulier

Gebruikers kunnen aangeven:

- Voor wie het cadeau is (partner, vriend, familie)
- Welke gelegenheid (verjaardag, kerst, valentijn)
- Hun budget
- Beschrijving van de persoon

**Code voorbeeld:**

```html
<select id="persoon" name="persoon" required>
 <option value="partner">Mijn partner</option>
 <option value="vriend">Beste vriend(in)</option>
 <option value="familie">Familielid</option>
</select>

```

### 2. Loading animatie bij zoeken

Wanneer iemand het formulier verstuurt:

- Button toont "Zoeken naar cadeaus..." met een spinner
- Na 2 seconden: "Cadeaus gevonden! ✓"
- Daarna terug naar normale tekst

**JavaScript code:**

```javascript

document.querySelector('.gift-search-form').addEventListener('submit', function(e) {
 e.preventDefault();
 const btnText = submitBtn.querySelector('.btn-text');
 btnText.textContent = 'Zoeken naar cadeaus...';
 
 setTimeout(() => {
   btnText.textContent = 'Cadeaus gevonden! ✓';
 }, 2000);
});
```

### 3. Like systeem

- Gebruikers kunnen op een hartje klikken
- Hart wordt gevuld en er verschijnt een animatie
- Like wordt opgeslagen in de database via Directus

**Form voor likes:**

```html
<form method="post" action="/like/{{ product.id }}">
 <input type="checkbox" onchange="this.form.submit()">
</form>

```

### 4. Filter buttons

Knoppen voor verschillende categorieën:

- Trending, Luxe, Creatief, Eetbaar, Wonen, Last-minute
- Actieve filter wordt wit met paarse achtergrond

**CSS voor actieve filter:**

```css
.filter-tag.active {
 background: var(--gradient-primary);
 color: white !important;
}
```

## Backend & Database

**Server setup met Express:**

```javascript

import express from 'express';
import { Liquid } from 'liquidjs';

const app = express();
app.engine('liquid', engine.express());
```

**Data ophalen van Directus:**

```javascript

const [productRes, likeRes] = await Promise.all([
 fetch('https://fdnd-agency.directus.app/items/milledoni_products/'),
 fetch('https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products_1/')
]);
```

## UX Design principes

Voor de volledige UX implementatie en design keuzes, zie [user story #29](https://github.com/users/fatimahilali/projects/17/views/1?pane=issue&itemId=124535275&issue=fatimahilali%7Cproof-of-concept-v2%7C29).

## Ontwerpkeuzes

### Kleurenschema

- **Paarse gradient:** Geeft gevoel van luxe en bijzonderheid, past bij cadeaus
- **Wit/transparant:** Clean en moderne uitstraling
- **Hoge contrast:** Zorgt voor goede leesbaarheid

### Card design

- **Witte cards:** Clean en moderne uitstraling
- **Subtiele schaduwen:** Geeft diepte en hiërarchie
- **Afgeronde hoeken:** Vriendelijke, toegankelijke vormgeving

### Gebruikersfeedback

- **Loading states:** 2 seconden spinner + success bericht zorgt dat gebruikers weten wat er gebeurt
- **Hart animatie:** Confetti effect maakt like actie leuk en logisch
- **Hover effecten:** Duidelijke feedback dat elementen klikbaar zijn

### Mobile-first benadering

- **Responsive design:** Meeste gebruikers bezoeken websites op mobiel
- **Progressive enhancement:** Basis werkt overal

### Filter interface

- **Snelle toegang:** Geen formulier invullen voor basis categorieën
- **Visueel onderscheid:** Actieve filters krijgen andere kleur
- **Eenvoudig:** Gebruikers begrijpen direct hoe het werkt

## Technische details

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js met Express
- **Database:** Directus CMS
- **Templates:** Liquid template
- **Styling:** CSS met custom properties, responsive design

## Installatie

Volg deze stappen om het project lokaal te draaien:

### 1️⃣ Clone de repository

Open je terminal en voer het volgende commando uit:

```bash
git clone https://github.com/fatimahilali/proof-of-concept-v2.git
cd concept-v2

```

2️⃣ Installeer de afhankelijkheden

Installeer alle benodigde packages met:

```bash
npm install
```

3️⃣ Start de applicatie

```bash
npm start
```

4️⃣ Open in je browser

Ga in je browser naar:

```bash
http://localhost:8000
```

Nu draait je project lokaal!

---

## Bronnen

MDN Web Docs - JavaScript en CSS documentatie

- CSS Loaders - Loading spinner
- Directus Docs - API documentatie

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).

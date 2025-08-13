// Bronnen:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_that_the_fetch_was_successful
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals



// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid()
app.engine('liquid', engine.express())

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')



// Haal de naam en image op
app.get('/', async function (req, res) {
  try {
    // Vraag de data op van de API
    const apiResponse = await fetch('https://fdnd-agency.directus.app/items/milledoni_products/?fields=name,image,img.width,img.height&sort=id');
    
    // Controleer of het antwoord van de API goed is
    if (!apiResponse.ok) {
      throw new Error(`API gaf een fout: ${apiResponse.status} ${apiResponse.statusText}`);
    }
    
    // Zet de response om naar JSON
    const productData = await apiResponse.json();
    
    // Controleer of de data bestaat
    if (!productData || !productData.data) {
      throw new Error('Geen productdata ontvangen van de API.');
    }
    
    // Render de indexpagina met de data
    res.render('index.liquid', { productList: productData.data });
    
  } catch (error) {
    // Log de fout in de console
    console.error('Fout bij ophalen producten:', error.message);
    
    // Stuur  foutmelding
    res.status(500).send('Er ging iets mis bij het ophalen van de producten.');
  }
});

  

// ID van ingelogde gebruiker 
app.post('/like/:id', async (req, res) => {
  await fetch('https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products_1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ milledoni_users_id: 2, milledoni_products_id: req.params.id })
  });
  res.redirect('/');
});



// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
console.log(`Server running at http://localhost:${app.get('port')}`)
})

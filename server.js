
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




// Bronnen:
// - Promise.all: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
// - Array.reduce: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce  
// - Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch_API
// - Directus Items API: https://directus.io/docs/api/items
// - Directus Query Parameters: https://directus.io/docs/guides/connect/query-parameters
// - sprint 10 
// - ChatGPT



app.get('/', async (req, res) => {
  try {
    // Data parallel ophalen 
    const [productRes, likeRes] = await Promise.all([
      fetch('https://fdnd-agency.directus.app/items/milledoni_products/?fields=id,name,image,img.width,img.height&sort=id'),
      fetch('https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products_1/?fields=milledoni_products_id')
    ]);


   // Status checks - controleer of requests succesvol waren
   if (!productRes.ok) throw new Error(`Products HTTP ${productRes.status}`);
    if (!likeRes.ok) throw new Error(`Likes HTTP ${likeRes.status}`);

    // Data arrays uit JSON responses halen
    const { data: products = [] } = await productRes.json();
    const { data: likes = [] } = await likeRes.json();

    // Likes tellen per product-id
    const likeCounts = likes.reduce((acc, row) => {
      const id = row?.milledoni_products_id;
      if (id != null) acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    // Likes toevoegen aan elk product 
    const productList = products.map(p => ({
      ...p,
      likes: likeCounts[p.id] || 0
    }));

   // Renderen naar template
   res.render('index.liquid', { productList });

  } catch (err) {
    console.error('Fout bij ophalen data:', err);
    res.status(500).send('Er ging iets mis bij het ophalen van de data.');
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





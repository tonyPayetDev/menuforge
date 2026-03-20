const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

const dataDir = path.join(__dirname, 'data');
const uploadsDir = path.join(__dirname, 'uploads', 'logos');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const restaurantsFile = path.join(dataDir, 'restaurants.json');
if (!fs.existsSync(restaurantsFile)) {
  fs.writeFileSync(restaurantsFile, '[]');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext || mime) cb(null, true);
    else cb(new Error('Only images allowed'));
  }
});

function readRestaurants() {
  return JSON.parse(fs.readFileSync(restaurantsFile, 'utf8'));
}

function writeRestaurants(data) {
  fs.writeFileSync(restaurantsFile, JSON.stringify(data, null, 2));
}

app.get('/api/restaurants', (req, res) => {
  const restaurants = readRestaurants();
  res.json(restaurants);
});

app.get('/api/restaurants/:id', (req, res) => {
  const restaurants = readRestaurants();
  const restaurant = restaurants.find(r => r.id === req.params.id);
  if (!restaurant) return res.status(404).json({ error: 'Not found' });
  res.json(restaurant);
});

app.post('/api/restaurants', upload.single('logo'), (req, res) => {
  const restaurants = readRestaurants();
  const { name, cuisine, description, menu, schedule } = req.body;
  
  if (!name) return res.status(400).json({ error: 'Name required' });
  
  const restaurant = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    name,
    cuisine: cuisine || '',
    description: description || '',
    menu: menu ? JSON.parse(menu) : [],
    schedule: schedule ? JSON.parse(schedule) : { days: [], lunch: {}, dinner: {} },
    logo: req.file ? '/uploads/logos/' + req.file.filename : null,
    createdAt: new Date().toISOString()
  };
  
  restaurants.push(restaurant);
  writeRestaurants(restaurants);
  res.json(restaurant);
});

app.delete('/api/restaurants/:id', (req, res) => {
  let restaurants = readRestaurants();
  const idx = restaurants.findIndex(r => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  
  const restaurant = restaurants[idx];
  if (restaurant.logo) {
    const logoPath = path.join(__dirname, 'public', restaurant.logo);
    if (fs.existsSync(logoPath)) fs.unlinkSync(logoPath);
  }
  
  restaurants = restaurants.filter(r => r.id !== req.params.id);
  writeRestaurants(restaurants);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

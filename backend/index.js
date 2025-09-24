const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Simple JSON database
const components = require('./data/components.json');

// Health
app.get('/', (req, res) => {
  res.send({ status: 'OK', message: 'Component Reuse Backend running' });
});

// Get components for a device
app.get('/api/components/:device', (req, res) => {
  const device = req.params.device;
  const result = components[device];
  if (!result) {
    return res.status(404).json({ error: 'Device not found', devices: Object.keys(components) });
  }
  res.json({ device, components: result });
});

// Dummy recycling centers (could be replaced by Google Places/Maps later)
app.get('/api/recycling-centers', (req, res) => {
const centers = [
    {
      id: 1,
      name: "Lucknow E-Recycle Hub",
      address: "Sector D, Transport Nagar, Lucknow, Uttar Pradesh",
      lat: 26.8414,
      lng: 80.9424,
      contact: "091234567890",
      types: ["e-waste", "batteries", "mobile parts"],
    },
    {
      id: 2,
      name: "GreenScrap Depot",
      address: "Mohanlalganj Industrial Area, Lucknow, Uttar Pradesh",
      lat: 26.7488,
      lng: 80.947,
      contact: "098765432101",
      types: ["metal scrap", "plastic", "paper"],
    },
    {
      id: 3,
      name: "Old Paper & Plastics Recycling - Triveni Nagar",
      address: "Sitapur Road, Triveni Nagar, Lucknow, Uttar Pradesh",
      lat: 26.889,
      lng: 80.9475,
      contact: "091098765432",
      types: ["paper", "plastic"],
    },
    {
      id: 4,
      name: "Tech Waste Collectors",
      address: "Alambagh, Lucknow, Uttar Pradesh",
      lat: 26.8537,
      lng: 80.9386,
      contact: "090112233445",
      types: ["electronics", "batteries", "screens"],
    },
    {
      id: 5,
      name: "Kabadi Center Qaisar Bagh",
      address: "Kabadi Market, Purniya Chauraha, Qaisar Bagh, Lucknow",
      lat: 26.8447,
      lng: 80.949,
      contact: "089765432100",
      types: ["scrap metal", "paper", "plastic"],
    },
  ];
  res.json(centers);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

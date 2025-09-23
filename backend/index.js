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
    { id: 1, name: 'Green Planet Recycling', address: 'MG Road, Pune', lat: 18.5204, lng: 73.8567 },
    { id: 2, name: 'E-Waste Hub', address: 'Sector 18, Noida', lat: 28.5743, lng: 77.3540 },
    { id: 3, name: 'RecycleIt Center', address: 'Koramangala, Bangalore', lat: 12.9352, lng: 77.6245 }
  ];
  res.json(centers);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

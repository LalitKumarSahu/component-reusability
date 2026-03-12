const express = require('express');
const router  = express.Router();

// Lucknow ke recycling centers ka data
const centers = [
  {
    id:      1,
    name:    "Lucknow E-Recycle Hub",
    address: "Sector D, Transport Nagar, Lucknow, UP",
    lat:     26.8414,
    lng:     80.9424,
    contact: "091234567890",
    types:   ["e-waste", "batteries", "mobile parts"],
  },
  {
    id:      2,
    name:    "GreenScrap Depot",
    address: "Mohanlalganj Industrial Area, Lucknow, UP",
    lat:     26.7488,
    lng:     80.9470,
    contact: "098765432101",
    types:   ["metal scrap", "plastic", "paper"],
  },
  {
    id:      3,
    name:    "Old Paper & Plastics - Triveni Nagar",
    address: "Sitapur Road, Triveni Nagar, Lucknow, UP",
    lat:     26.8890,
    lng:     80.9475,
    contact: "091098765432",
    types:   ["paper", "plastic"],
  },
  {
    id:      4,
    name:    "Tech Waste Collectors",
    address: "Alambagh, Lucknow, UP",
    lat:     26.8537,
    lng:     80.9386,
    contact: "090112233445",
    types:   ["electronics", "batteries", "screens"],
  },
  {
    id:      5,
    name:    "Kabadi Center Qaisar Bagh",
    address: "Qaisar Bagh, Lucknow, UP",
    lat:     26.8447,
    lng:     80.9490,
    contact: "089765432100",
    types:   ["scrap metal", "paper", "plastic"],
  },
];

// ────────────────────────────────────────────────────────────
// GET /api/centers   ← Saare centers ki list
// ────────────────────────────────────────────────────────────
router.get('/', (req, res) => {
  res.json(centers);
});

module.exports = router;
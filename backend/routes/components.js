const express = require('express');
const router  = express.Router();

// Device aur unke components ka data
const components = {
  "Mobile":       ["Battery", "Screen", "Camera", "Charging Port", "Speaker", "Microphone", "Motherboard"],
  "Laptop":       ["RAM", "HDD/SSD", "Keyboard", "Battery", "Screen", "Motherboard", "Touchpad", "Cooling Fan"],
  "TV":           ["Screen", "Power Board", "Speakers", "Remote Sensor", "Motherboard", "HDMI Port"],
  "Tablet":       ["Battery", "Screen", "Charging Port", "Camera", "Speakers", "Motherboard"],
  "Desktop PC":   ["CPU", "GPU", "RAM", "HDD/SSD", "Motherboard", "PSU", "Cooling Fan"],
  "Game Console": ["Motherboard", "HDMI Port", "Controller Port", "Cooling Fan", "HDD/SSD", "Power Supply"],
  "Camera":       ["Lens", "Battery", "Sensor", "Screen", "Memory Card Slot", "Flash"],
  "Headphones":   ["Speakers", "Battery", "Bluetooth Module", "Microphone", "Charging Port"],
  "Printer":      ["Ink Cartridge/Toner", "Paper Tray", "Motherboard", "Power Supply", "Rollers", "Screen"],
};

// ────────────────────────────────────────────────────────────
// GET /api/components   ← Saare devices ki list
// ────────────────────────────────────────────────────────────
router.get('/', (req, res) => {
  res.json({ devices: Object.keys(components) });
});

// ────────────────────────────────────────────────────────────
// GET /api/components/Mobile   ← Ek device ke components
// ────────────────────────────────────────────────────────────
router.get('/:device', (req, res) => {
  const device = req.params.device;
  const result = components[device];

  if (!result) {
    return res.status(404).json({
      error:            'Ye device nahi mila.',
      availableDevices: Object.keys(components),
    });
  }

  res.json({ device, components: result });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const LandHolding = require('../landHolding');

// Get all land holdings
router.get('/', async (req, res) => {
  try {
    const landHoldings = await LandHolding.find();
    res.json(landHoldings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new land holding
router.post('/', async (req, res) => {
  const { name, legalEntity, netMineralAcres, mineralOwnerRoyalty, sectionName, section, township, range, titleSource, owner } = req.body;
  try {
    const landHolding = new LandHolding({ name, legalEntity, netMineralAcres, mineralOwnerRoyalty, sectionName, section, township, range, titleSource, owner });
    await landHolding.save();
    res.status(201).json(landHolding);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a specific land holding
router.get('/:id', async (req, res) => {
  try {
    const landHolding = await LandHolding.findById(req.params.id);
    if (!landHolding) return res.status(404).json({ error: 'Land holding not found' });
    res.json(landHolding);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a land holding
router.put('/:id', async (req, res) => {
  const { name, legalEntity, netMineralAcres, mineralOwnerRoyalty, sectionName, section, township, range, titleSource, owner } = req.body;
  try {
    const landHolding = await LandHolding.findByIdAndUpdate(req.params.id, { name, legalEntity, netMineralAcres, mineralOwnerRoyalty, sectionName, section, township, range, titleSource, owner }, { new: true });
    if (!landHolding) return res.status(404).json({ error: 'Land holding not found' });
    res.json(landHolding);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a land holding
router.delete('/:id', async (req, res) => {
  try {
    const landHolding = await LandHolding.findByIdAndDelete(req.params.id);
    if (!landHolding) return res.status(404).json({ error: 'Land holding not found' });
    res.json({ message: 'Land holding deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

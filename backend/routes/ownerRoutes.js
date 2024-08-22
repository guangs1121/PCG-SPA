const express = require('express');
const router = express.Router();
const Owner = require('../models/owner');
const LandHolding = require('../models/landHolding');

// Get all owners
router.get('/', async (req, res) => {
  try {
    const owners = await Owner.find();
    res.json(owners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new owner
router.post('/', async (req, res) => {
  const { name, entityType, ownerType, address } = req.body;
  try {
    const existingOwner = await Owner.findOne({ name, address });
    if (existingOwner) {
      return res.status(400).json({ error: 'Owner with this name and address already exists' });
    }
    const owner = new Owner({ name, entityType, ownerType, address, totalLandHoldings: 0 });
    await owner.save();
    res.status(201).json(owner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a specific owner
router.get('/:id', async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) return res.status(404).json({ error: 'Owner not found' });
    res.json(owner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an owner
router.put('/:id', async (req, res) => {
  const { name, entityType, ownerType, address } = req.body;
  try {
    const owner = await Owner.findByIdAndUpdate(req.params.id, { name, entityType, ownerType, address }, { new: true });
    if (!owner) return res.status(404).json({ error: 'Owner not found' });
    res.json(owner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an owner and all related land holdings
router.delete('/:id', async (req, res) => {
  try {
    const owner = await Owner.findByIdAndDelete(req.params.id);
    if (!owner) return res.status(404).json({ error: 'Owner not found' });
    await LandHolding.deleteMany({ owner: req.params.id });
    res.json({ message: 'Owner and related land holdings deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  entityType: { type: String, enum: ['Company', 'Individual', 'Investor', 'Trust'] },
  ownerType: { type: String, enum: ['Competitor', 'Seller', 'Investor', 'Professional'] },
  address: { type: String, required: true },
  totalLandHoldings: { type: Number, default: 0 }
});

module.exports = mongoose.model('Owner', ownerSchema);

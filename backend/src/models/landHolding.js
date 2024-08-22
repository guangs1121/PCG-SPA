const mongoose = require('mongoose');

const landHoldingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  legalEntity: { type: String },
  netMineralAcres: { type: Number },
  mineralOwnerRoyalty: { type: Number },
  sectionName: { type: String },
  section: { type: String },
  township: { type: String },
  range: { type: String },
  titleSource: { type: String, enum: ['Class A', 'Class B', 'Class C', 'Class D'] },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true }
});

module.exports = mongoose.model('LandHolding', landHoldingSchema);

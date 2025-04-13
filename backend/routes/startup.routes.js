const express = require('express');
const router = express.Router();
const { authMiddleware, roleCheck } = require('../middleware/auth.middleware');
const Startup = require('../models/startup.model');
const FundingRequest = require('../models/funding-request.model');

// Get all startups (for investors)
router.get('/', authMiddleware, roleCheck(['investor']), async (req, res) => {
  try {
    const startups = await Startup.find().populate('founder', 'name email');
    res.json(startups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching startups', error: error.message });
  }
});

// Create startup profile (for founders)
router.post('/', authMiddleware, roleCheck(['founder']), async (req, res) => {
  try {
    const startup = new Startup({
      ...req.body,
      founder: req.user.userId
    });
    await startup.save();
    res.status(201).json(startup);
  } catch (error) {
    res.status(500).json({ message: 'Error creating startup profile', error: error.message });
  }
});

// Request funding from investor
router.post('/request-funding/:investorId', authMiddleware, roleCheck(['founder']), async (req, res) => {
  try {
    const startup = await Startup.findOne({ founder: req.user.userId });
    if (!startup) {
      return res.status(404).json({ message: 'Startup profile not found' });
    }

    const fundingRequest = new FundingRequest({
      startup: startup._id,
      investor: req.params.investorId
    });
    await fundingRequest.save();
    res.status(201).json(fundingRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error requesting funding', error: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { authMiddleware, roleCheck } = require('../middleware/auth.middleware');
const FundingRequest = require('../models/funding-request.model');
const User = require('../models/user.model');
const Startup = require('../models/startup.model');

// Get all investors (for founders)
router.get('/', authMiddleware, roleCheck(['founder']), async (req, res) => {
  try {
    const investors = await User.find({ role: 'investor' }, '-password');
    res.json(investors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching investors', error: error.message });
  }
});

// Get funding requests for investor
router.get('/requests', authMiddleware, roleCheck(['investor']), async (req, res) => {
  try {
    const requests = await FundingRequest.find({ investor: req.user.userId })
      .populate({
        path: 'startup',
        populate: {
          path: 'founder',
          select: 'name email'
        }
      })
      .populate('investor', 'name email');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching funding requests', error: error.message });
  }
});

// Get funding request by ID
router.get('/requests/:requestId', authMiddleware, roleCheck(['investor']), async (req, res) => {
  try {
    const request = await FundingRequest.findOne({
      _id: req.params.requestId,
      investor: req.user.userId
    })
      .populate({
        path: 'startup',
        populate: {
          path: 'founder',
          select: 'name email'
        }
      })
      .populate('investor', 'name email');

    if (!request) {
      return res.status(404).json({ message: 'Funding request not found' });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching funding request', error: error.message });
  }
});

// Update funding request status
router.patch('/requests/:requestId/status', authMiddleware, roleCheck(['investor']), async (req, res) => {
  try {
    const { status, notes, meetingSchedule } = req.body;
    const validStatuses = ['pending', 'verified', 'in_meeting', 'in_discussion', 'funded', 'rejected'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status',
        validStatuses
      });
    }

    const request = await FundingRequest.findOne({
      _id: req.params.requestId,
      investor: req.user.userId
    });

    if (!request) {
      return res.status(404).json({ message: 'Funding request not found' });
    }

    // Status transition validation
    if (request.status === 'rejected' && status !== 'rejected') {
      return res.status(400).json({ message: 'Cannot change status once rejected' });
    }

    if (request.status === 'funded' && status !== 'funded') {
      return res.status(400).json({ message: 'Cannot change status once funded' });
    }

    // Update the request
    const updatedRequest = await FundingRequest.findOneAndUpdate(
      { _id: req.params.requestId, investor: req.user.userId },
      {
        status,
        notes: notes || request.notes,
        meetingSchedule: meetingSchedule || request.meetingSchedule,
        updatedAt: Date.now()
      },
      { new: true }
    ).populate({
      path: 'startup',
      populate: {
        path: 'founder',
        select: 'name email'
      }
    });

    // Send notification (you can implement this later with WebSocket or email)
    // await notifyFounder(updatedRequest);
    
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error updating funding request', error: error.message });
  }
});

// Get statistics for investor dashboard
router.get('/dashboard-stats', authMiddleware, roleCheck(['investor']), async (req, res) => {
  try {
    const stats = await FundingRequest.aggregate([
      { $match: { investor: req.user.userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedStats = stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {
      pending: 0,
      verified: 0,
      in_meeting: 0,
      in_discussion: 0,
      funded: 0,
      rejected: 0
    });

    res.json(formattedStats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard statistics', error: error.message });
  }
});

module.exports = router;

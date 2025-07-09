const express = require('express');
const Review = require('../models/review.cjs');
const authMiddleware = require('../middleware/authMiddleware.cjs');

const router = express.Router();


router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });


    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error deleting review' });
  }
});

module.exports = router;

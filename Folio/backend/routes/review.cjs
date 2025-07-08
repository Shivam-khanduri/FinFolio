const router = require('express').Router();
const Review = require('../models/review.cjs');
const authMiddleware = require('../middleware/authMiddleware.cjs'); // ✅

/**
 * GET /api/reviews
 * Public – fetch all reviews
 */
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

/**
 * POST /api/reviews
 * Protected – only logged-in users can post
 */
router.post('/', authMiddleware, async (req, res) => {
  const { rating, comment, date } = req.body;

  try {
    const user = req.user; // comes from decoded token in middleware
    const initials = user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

    const newReview = new Review({
      name: user.name || 'Anonymous',
      initials: initials || 'U',
      rating,
      comment,
      date,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: 'Error saving review' });
  }
});

module.exports = router;

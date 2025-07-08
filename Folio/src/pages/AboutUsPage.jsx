import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { AiFillStar } from 'react-icons/ai';

const AboutUsPage = () => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/reviews');
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error('Failed to load reviews:', err);
        setError('Could not load reviews.');
      }
    };

    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) setToken(tokenFromStorage);

    fetchReviews();
  }, []);

  const getFormattedDate = () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim()) return;

    try {
      const newReview = {
        name: 'You',
        initials: 'Y',
        rating,
        comment: review,
        date: getFormattedDate(),
      };

      const res = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newReview),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit review');

      setReviews([data, ...reviews]);
      setReview('');
      setRating(5);
      setHoverRating(0);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error submitting review');
    }
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* About Section */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">About FinFolio</h1>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            FinFolio is a clean and powerful stock market portfolio tracker designed for everyday investors and finance enthusiasts...
          </p>
        </motion.section>

        {/* Features Section */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600 mb-3">What We Offer</h2>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>📈 Real-time stock tracking</li>
            <li>🧶 ROI calculations</li>
            <li>📊 Watchlist support</li>
            <li>🔔 Price alerts</li>
            <li>🔐 Secure experience</li>
          </ul>
        </motion.section>

        {/* FAQ Section */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { question: 'Is FinFolio free to use?', answer: 'Yes! FinFolio is completely free.' },
              { question: 'How real-time is the stock data?', answer: 'A few seconds to a minute delay.' },
              { question: 'Do you provide investment advice?', answer: 'No, we don’t offer financial advice.' },
            ].map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border cursor-pointer" onClick={() => toggleFAQ(index)}>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <span className="text-xl">{openFAQ === index ? '−' : '+'}</span>
                </div>
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-2 text-sm">
                      {faq.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Reviews Section */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
          <h2 className="text-3xl font-semibold text-blue-600 mb-4">Drop a Review</h2>

          {token ? (
            <form onSubmit={handleSubmit} className="mb-6">
              <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Share your thoughts..." className="w-full p-4 border rounded-lg h-28 resize-none dark:bg-gray-700 dark:text-white" />
              <div className="flex items-center space-x-4 mt-4">
                <label>Rating:</label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <AiFillStar
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`text-2xl cursor-pointer ${ (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300' }`}
                    />
                  ))}
                </div>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Submit</button>
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          ) : (
            <p className="text-gray-600 dark:text-gray-300 mb-6">Please log in to submit a review.</p>
          )}

          {reviews.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-blue-700">What others say</h3>
              {reviews.map((rev, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 p-4 rounded-lg border shadow flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                    {rev.initials || 'U'}
                  </div>
                  <div>
                    <p className="font-semibold">{rev.name}</p>
                    <p className="text-sm text-gray-500 mb-1">{rev.date}</p>
                    <div className="flex mb-1">
                      {[...Array(5)].map((_, i) => (
                        <AiFillStar key={i} className={`text-yellow-400 ${i < rev.rating ? '' : 'opacity-30'}`} />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 italic">“{rev.comment}”</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
      <footer className="text-center text-gray-500 dark:text-gray-400 py-6 text-sm">
        © {new Date().getFullYear()} FinFolio. All rights reserved.
      </footer>
    </div>
  );
};

export default AboutUsPage;

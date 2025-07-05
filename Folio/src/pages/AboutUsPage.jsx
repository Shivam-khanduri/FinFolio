import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { AiFillStar } from 'react-icons/ai';

const getFormattedDate = () => {
  const now = new Date();
  return now.toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  });
};

const dummyReviews = [
  {
    name: 'Aarav M.',
    initials: 'AM',
    rating: 5,
    comment: 'Absolutely love the UI and speed. I can track my portfolio with ease!',
    date: 'June 28, 2025 · 2:15 PM',
  },
  {
    name: 'Nisha R.',
    initials: 'NR',
    rating: 4,
    comment: 'Clean design and accurate stock info. Keep it up team!',
    date: 'June 27, 2025 · 10:45 AM',
  },
  {
    name: 'Kabir S.',
    initials: 'KS',
    rating: 5,
    comment: 'Great tool for casual investors like me. Rebalancing insights are a plus.',
    date: 'June 26, 2025 · 8:30 PM',
  },
];

const AboutUsPage = () => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviews, setReviews] = useState(dummyReviews);
  const [openFAQ, setOpenFAQ] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.trim() === '') return;

    const newReview = {
      name: 'You',
      initials: 'Y',
      rating,
      comment: review,
      date: getFormattedDate(),
    };

    setReviews((prev) => [newReview, ...prev]);
    setReview('');
    setRating(5);
    setHoverRating(0);
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
            FinFolio is a clean and powerful stock market portfolio tracker designed for everyday investors and finance enthusiasts. Built with performance and user experience in mind, FinFolio helps you track your investments, monitor live stock prices, analyze returns, and get insights — all in one place.
          </p>
        </motion.section>

        {/* Features Section */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600 mb-3">What We Offer</h2>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>📈 Real-time stock tracking with dynamic charts</li>
            <li>🧶 Profit/loss and ROI calculation on your holdings</li>
            <li>📊 Watchlist to monitor your favorite stocks</li>
            <li>🔔 Price alerts and market movement notifications</li>
            <li>🔐 Secure and intuitive user experience</li>
          </ul>
        </motion.section>

        {/* FAQ Section */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { question: 'Is FinFolio free to use?', answer: 'Yes! FinFolio is completely free for individual investors and finance learners.' },
              { question: 'How real-time is the stock data?', answer: 'We use trusted third-party APIs to fetch near real-time data. Delays may be a few seconds to a minute.' },
              { question: 'Do you provide investment advice?', answer: 'No, FinFolio is a tracking and visualization platform only. We do not offer financial advice.' },
            ].map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg border border-blue-100 dark:border-gray-700 cursor-pointer">
                <div onClick={() => toggleFAQ(index)} className="flex justify-between items-center">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-400">{faq.question}</h3>
                  <span className="text-xl">{openFAQ === index ? '−' : '+'}</span>
                </div>
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="text-gray-700 dark:text-gray-300 mt-2">
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
          <form onSubmit={handleSubmit} className="mb-6">
            <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Share your thoughts about FinFolio..." className="w-full p-4 border rounded-lg resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"></textarea>
            <div className="flex items-center space-x-4 mt-4">
              <label className="font-medium text-gray-700 dark:text-gray-300">Rating:</label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <AiFillStar
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`text-2xl cursor-pointer transition ${
                      (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Submit Review
              </button>
            </div>
          </form>

          {reviews.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-blue-700">What others say</h3>
              {reviews.map((rev, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                    {rev.initials || 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{rev.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{rev.date}</p>
                    <div className="flex items-center mb-1">
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

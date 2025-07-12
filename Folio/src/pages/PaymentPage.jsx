import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { stock } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);

  if (!stock) {
    return (
      <div className="flex items-center justify-center h-screen text-center text-xl text-red-600">
        No stock selected for payment.
      </div>
    );
  }

  const total = (stock.livePrice * stock.shares).toFixed(2);

  const isCardNumberValid =
    cardNumber.replace(/\s+/g, "").length === 16 &&
    /^\d+$/.test(cardNumber.replace(/\s+/g, ""));
  const isCvvValid = cvv.length === 3 && /^\d+$/.test(cvv);
  const isExpiryValid = /^(\d{2})\/(\d{2})$/.test(expiry);
  const isNameValid = name.trim().length > 0;

  const isFormValid =
    isCardNumberValid && isCvvValid && isExpiryValid && isNameValid;

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setProcessing(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const userName = user?.name || "Guest";

    try {
      await axios.post(
        "http://localhost:5000/api/portfolio",
        {
          ...stock,
          userName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Payment of $${total} for ${stock.symbol} completed!`);
      navigate("/portfolio");
    } catch (err) {
      console.error("Error saving portfolio:", err);
      alert("Payment succeeded but failed to save stock.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          🏦 Stock Payment
        </h2>

        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6 text-sm text-gray-700 dark:text-gray-200">
          <p>
            <strong>Stock:</strong> {stock.name} ({stock.symbol})
          </p>
          <p>
            <strong>Shares:</strong> {stock.shares}
          </p>
          <p>
            <strong>Live Price:</strong> ${stock.livePrice}
          </p>
          <p>
            <strong>Total:</strong> ${total}
          </p>
        </div>

        <form onSubmit={handlePayment} className="space-y-5" noValidate>
          {/* Cardholder Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
              Cardholder Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={processing}
              autoComplete="cc-name"
            />
          </div>

          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
              Card Number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className={`w-full p-3 rounded-lg border ${
                isCardNumberValid || cardNumber === ""
                  ? "border-gray-300"
                  : "border-red-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              value={cardNumber}
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, "").slice(0, 16);
                val = val.replace(/(\d{4})/g, "$1 ").trim();
                setCardNumber(val);
              }}
              required
              disabled={processing}
              autoComplete="cc-number"
            />
            {!isCardNumberValid && cardNumber !== "" && (
              <p className="text-red-500 text-xs mt-1">
                Enter a valid 16-digit card number
              </p>
            )}
          </div>

          {/* Expiry & CVV */}
          <div className="flex space-x-4">
            {/* Expiry */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                Expiry (MM/YY)
              </label>
              <input
                type="text"
                placeholder="09/25"
                className={`w-full p-3 rounded-lg border ${
                  isExpiryValid || expiry === ""
                    ? "border-gray-300"
                    : "border-red-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                value={expiry}
                onChange={(e) => {
                  let val = e.target.value;
                  if (val.length === 2 && expiry.length < val.length) {
                    val += "/";
                  }
                  if (val.length > 5) val = val.slice(0, 5);
                  setExpiry(val);
                }}
                required
                disabled={processing}
                autoComplete="cc-exp"
              />
              {!isExpiryValid && expiry !== "" && (
                <p className="text-red-500 text-xs mt-1">
                  Enter expiry as MM/YY
                </p>
              )}
            </div>

            {/* CVV */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                CVV
              </label>
              <input
                type="password"
                placeholder="123"
                className={`w-full p-3 rounded-lg border ${
                  isCvvValid || cvv === ""
                    ? "border-gray-300"
                    : "border-red-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                value={cvv}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 3);
                  setCvv(val);
                }}
                required
                disabled={processing}
                autoComplete="cc-csc"
              />
              {!isCvvValid && cvv !== "" && (
                <p className="text-red-500 text-xs mt-1">
                  Enter a valid 3-digit CVV
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={processing || !isFormValid}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              processing || !isFormValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {processing ? "Processing..." : `Pay $${total}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;

import React from "react";

const Notification = ({ message, type = "success", onClose }) => {
  const colors = {
    success: "bg-green-100 text-green-800 border-green-300",
    error: "bg-red-100 text-red-800 border-red-300",
    info: "bg-blue-100 text-blue-800 border-blue-300",
  };

  return (
    <div
      className={`fixed top-6 right-6 border px-4 py-3 rounded-xl shadow-xl z-50 ${colors[type]}`}
    >
      <div className="flex items-center justify-between space-x-4">
        <span>{message}</span>
        <button onClick={onClose} className="text-lg font-bold">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;

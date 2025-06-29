import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('user@example.com');
  const [phone, setPhone] = useState('+91 9876543210');
  const [username, setUsername] = useState('johndoe');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [twoFA, setTwoFA] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [timezone, setTimezone] = useState('GMT');
  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState('Light');
  const [notificationEmail, setNotificationEmail] = useState(true);
  const [notificationPush, setNotificationPush] = useState(false);
  const [notificationSMS, setNotificationSMS] = useState(false);
  const [portfolioGrouping, setPortfolioGrouping] = useState('sector');
  const [dataRefresh, setDataRefresh] = useState('Real-time');
  const [plan, setPlan] = useState('Free');

  const handleSave = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 px-4 py-10">
        
        {/* Sidebar Tabs */}
        <div className="w-64 bg-white dark:bg-gray-800 shadow rounded-2xl p-4 space-y-4 h-fit">
          {['account', 'security', 'preferences', 'portfolio', 'notifications', 'billing', 'accountMgmt'].map((tab) => (
            <button
              key={tab}
              className={`block w-full text-left p-2 rounded transition ${
                activeTab === tab ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'account' && 'Account Info'}
              {tab === 'security' && 'Security'}
              {tab === 'preferences' && 'Preferences'}
              {tab === 'portfolio' && 'Portfolio'}
              {tab === 'notifications' && 'Notifications'}
              {tab === 'billing' && 'Billing'}
              {tab === 'accountMgmt' && 'Account Management'}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="flex-1 ml-6 max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-blue-600">Profile Settings</h2>
          <form className="space-y-6" onSubmit={handleSave}>

            {activeTab === 'account' && (
              <div className="space-y-4">
                <div>
                  <label className="font-semibold">Full Name</label>
                  <input type="text" placeholder="Full Name" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div>
                  <label className="font-semibold">Email Address</label>
                  <input type="email" placeholder="Email Address" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <label className="font-semibold">Phone Number</label>
                  <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                  <label className="font-semibold">Username</label>
                  <input type="text" placeholder="Username" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                  <label className="font-semibold">Date of Birth</label>
                  <input type="date" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-4">
                <div>
                  <label className="font-semibold">New Password</label>
                  <input type="password" placeholder="New Password" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={twoFA} onChange={() => setTwoFA(!twoFA)} />
                  <span>Enable Two-Factor Authentication</span>
                </label>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-4">
                <div>
                  <label className="font-semibold">Currency Preference</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl dark:bg-gray-700 dark:text-white" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="INR">INR</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold">Time Zone</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl dark:bg-gray-700 dark:text-white" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                    <option value="GMT">GMT</option>
                    <option value="IST">IST (India Standard Time)</option>
                    <option value="EST">EST (Eastern Standard Time)</option>
                    <option value="PST">PST (Pacific Standard Time)</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold">Language</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl dark:bg-gray-700 dark:text-white" value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="space-y-4">
                <div>
                  <label className="font-semibold">Grouping Preferences</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl dark:bg-gray-700 dark:text-white" value={portfolioGrouping} onChange={(e) => setPortfolioGrouping(e.target.value)}>
                    <option value="sector">Group by Sector</option>
                    <option value="marketcap">Group by Market Cap</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold">Data Refresh</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl dark:bg-gray-700 dark:text-white" value={dataRefresh} onChange={(e) => setDataRefresh(e.target.value)}>
                    <option value="Real-time">Real-time Data</option>
                    <option value="Delayed">Delayed Data</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={notificationEmail} onChange={() => setNotificationEmail(!notificationEmail)} />
                  <span>Email Notifications</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={notificationPush} onChange={() => setNotificationPush(!notificationPush)} />
                  <span>Push Notifications</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={notificationSMS} onChange={() => setNotificationSMS(!notificationSMS)} />
                  <span>SMS Alerts</span>
                </label>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-4">
                <p className="font-semibold">Current Plan: <strong>{plan}</strong></p>
                <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">Upgrade Plan</button>
              </div>
            )}

            {activeTab === 'accountMgmt' && (
              <div className="space-y-4">
                <button type="button" className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700">Delete Account</button>
              </div>
            )}

            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

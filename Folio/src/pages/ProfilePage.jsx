import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

const countries = ['India', 'USA', 'Canada', 'Germany', 'France', 'Australia', 'UK'];

const inputClass =
  'w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [isOldPasswordValid, setIsOldPasswordValid] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await res.json();
        setFullName(data.name || '');
        setEmail(data.email || '');
        setPhone(data.phone || '');
        setUsername(data.username || '');
        setDob(data.dob || '');
        setCountry(data.country || '');
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const checkUsername = async (value) => {
    setUsername(value);
    if (!value) return;
    try {
      const res = await fetch(`http://localhost:5000/api/auth/check-username/${value}`);
      const data = await res.json();
      setUsernameAvailable(data.available);
    } catch (err) {
      console.error('Username check failed');
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    const updatedData = { name: fullName, email, phone, username, dob, country };
    try {
      const res = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      setMessage(res.ok ? 'Profile updated successfully!' : data.message || 'Update failed');
    } catch (err) {
      setMessage('An error occurred.');
    }
  };

  const handleOldPasswordVerify = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ oldPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setIsOldPasswordValid(false);
        setPasswordMsg(data.message || 'Old password incorrect');
      } else {
        setIsOldPasswordValid(true);
        setPasswordMsg('Old password verified. You can now set a new password.');
      }
    } catch (err) {
      setPasswordMsg('Error verifying old password.');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMsg('Passwords do not match');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json();
      setPasswordMsg(res.ok ? 'Password changed successfully!' : data.message || 'Password update failed');
    } catch (err) {
      setPasswordMsg('An error occurred while changing password.');
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Sidebar />
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Account Settings</h2>

        <div className="mb-6 flex space-x-4">
          <button onClick={() => setActiveTab('profile')} className={`px-4 py-2 rounded ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
            Profile
          </button>
          <button onClick={() => setActiveTab('security')} className={`px-4 py-2 rounded ${activeTab === 'security' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
            Change Password
          </button>
        </div>

        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSave} className="space-y-6 max-w-3xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            {message && <p className="text-green-600 dark:text-green-400">{message}</p>}
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="Full Name" className={inputClass} />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" className={inputClass} />
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className={inputClass} />
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => checkUsername(e.target.value)}
                placeholder="Username"
                className={`${inputClass} ${username && !usernameAvailable ? 'border-red-500 dark:border-red-500' : ''}`}
              />
              {username && !usernameAvailable && <p className="text-sm text-red-600">Username already taken</p>}
            </div>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className={inputClass} />
            <select value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass}>
              <option value="">Select a country</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
              Save Changes
            </button>
          </form>
        )}

        {activeTab === 'security' && (
          <form onSubmit={handlePasswordChange} className="space-y-6 max-w-xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            {passwordMsg && <p className="text-green-600 dark:text-green-400">{passwordMsg}</p>}
            <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required placeholder="Current Password" className={inputClass} />
            <button type="button" onClick={handleOldPasswordVerify} className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600">
              Verify Old Password
            </button>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required placeholder="New Password" className={inputClass} disabled={!isOldPasswordValid} />
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Confirm New Password" className={inputClass} disabled={!isOldPasswordValid} />
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700" disabled={!isOldPasswordValid}>
              Change Password
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;

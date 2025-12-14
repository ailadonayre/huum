// src/pages/Settings/EditProfile.jsx
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import './EditProfile.css';

const EditProfile = ({ onBack, userName, onSave }) => {
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState('john.doe@example.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    onSave(name);
    onBack();
  };

  return (
    <div className="edit-profile-screen">
      <div className="edit-profile-header">
        <button 
          className="edit-profile-back" 
          onClick={onBack}
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="edit-profile-title">Edit Profile</h1>
        <div className="edit-profile-spacer"></div>
      </div>

      <div className="edit-profile-content">
        <div className="edit-profile-avatar-section">
          <div className="edit-profile-avatar">
            {name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
        </div>

        <div className="edit-profile-form">
          <InputField
            label="Nickname"
            type="text"
            placeholder="Enter your nickname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="edit-profile-divider">
            <span>Change Password</span>
          </div>

          <InputField
            label="Current Password"
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <InputField
            label="New Password"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <InputField
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="edit-profile-footer">
        <div className="edit-profile-actions">
          <Button variant="secondary" fullWidth onClick={onBack}>
            Cancel
          </Button>
          <Button variant="purple" fullWidth onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
import { Camera, ChevronLeft, Mail, User } from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import './EditProfile.css';

const EditProfile = ({ onBack, userName, onSave }) => {
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
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
          <button className="edit-profile-avatar-button">
            <Camera size={16} />
            <span>Change Photo</span>
          </button>
        </div>

        <div className="edit-profile-form">
          <div className="edit-profile-section">
            <h2 className="edit-profile-section-title">
              <User size={18} />
              Personal Information
            </h2>
            
            <InputField
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
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

            <InputField
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="edit-profile-divider">
            <span>Security</span>
          </div>

          <div className="edit-profile-section">
            <h2 className="edit-profile-section-title">
              <Mail size={18} />
              Change Password
            </h2>
            
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

            <div className="edit-profile-password-hint">
              <p>Password must contain:</p>
              <ul>
                <li>At least 8 characters</li>
                <li>One uppercase and one lowercase letter</li>
                <li>One number</li>
              </ul>
            </div>
          </div>
        </div>

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
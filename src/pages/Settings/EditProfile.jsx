import { Camera, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import './EditProfile.css';

const EditProfile = ({ onBack, userName, onSave }) => {
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState('john.doe@example.com');
  const [bio, setBio] = useState('');

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
            <Camera size={20} />
            <span>Change Photo</span>
          </button>
        </div>

        <div className="edit-profile-form">
          <InputField
            label="Full Name"
            type="text"
            placeholder="Enter your name"
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

          <div className="input-field">
            <label className="input-label">Bio</label>
            <textarea
              className="edit-profile-textarea"
              placeholder="Tell us about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
            />
          </div>
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
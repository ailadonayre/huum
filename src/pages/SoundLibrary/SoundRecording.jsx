import { Mic } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import { generateWaveformData } from '../../utils/animationHelpers';
import './SoundRecording.css';

const SoundRecording = ({ isOpen, onClose, onSave, soundName }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [waveformData, setWaveformData] = useState(generateWaveformData(7));

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
        setWaveformData(generateWaveformData(7));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRecordToggle = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setRecordingTime(0);
    }
  };

  const handleSave = () => {
    console.log('Saving recording:', {
      name: soundName,
      duration: recordingTime,
    });
    setIsRecording(false);
    setRecordingTime(0);
    onSave();
  };

  const handleClose = () => {
    setIsRecording(false);
    setRecordingTime(0);
    onClose();
  };

  const handleReRecord = () => {
    setRecordingTime(0);
    setIsRecording(false);
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isRecording ? 'Recording...' : 'Ready to record'}
      footer={
        recordingTime > 0 && !isRecording ? (
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', width: '100%' }}>
            <Button variant="purple" fullWidth onClick={handleReRecord}>
              Re-record
            </Button>
            <Button variant="purple" fullWidth onClick={handleSave}>
              Save
            </Button>
          </div>
        ) : null
      }
    >
      <div className="sound-recording-modal-content">
        <p className="sound-recording-subtitle">
          {isRecording 
            ? `Recording "${soundName}"`
            : recordingTime > 0
            ? 'Recording complete!'
            : `Tap the button to start recording "${soundName}"`}
        </p>

        <div className="sound-recording-circle-wrapper">
          <div className="sound-recording-circle">
            {isRecording && (
              <>
                <div className="sound-recording-ripple"></div>
                <div className="sound-recording-ripple"></div>
                <div className="sound-recording-ripple"></div>
              </>
            )}
            <button
              className={`sound-recording-circle-inner ${isRecording ? 'recording' : ''}`}
              onClick={handleRecordToggle}
              aria-label={isRecording ? 'Stop recording' : 'Start recording'}
            >
              {isRecording ? (
                <div className="recording-waveform">
                  {waveformData.map((height, index) => (
                    <div
                      key={index}
                      className="recording-waveform-bar"
                      style={{
                        height: `${height * 40}px`,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <Mic strokeWidth={2} />
              )}
            </button>
          </div>
        </div>

        <div className="sound-recording-timer">
          {formatTime(recordingTime)}
        </div>

        <div className="sound-recording-instructions">
          {isRecording ? (
            <>
              <p className="sound-recording-instruction-text">
                Make the sound you want to record
              </p>
              <p className="sound-recording-hint">
                Tap the button again when you're done
              </p>
            </>
          ) : (
            <>
              <p className="sound-recording-instruction-text">
                {recordingTime > 0 
                  ? 'Recording complete!'
                  : 'Tap the microphone to begin'}
              </p>
              {recordingTime === 0 && (
                <p className="sound-recording-hint">
                  Make sure you're in a quiet environment
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SoundRecording;
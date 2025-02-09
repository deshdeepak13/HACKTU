import React, { useState, useRef } from 'react';
import { Camera, Shield, CheckCircle, RefreshCw, Upload } from 'lucide-react';
import { db, doc, updateDoc } from '../../../firebase'; // Adjust your Firebase import as needed
import { useAuth } from '@/contexts/LoanContext';
import { uploadVidToCloudinary } from '../../../utils/upload'
import { useNavigate } from 'react-router-dom';
// Import the Cloudinary upload function

export function VideoKYC() {
  const { id: userId } = useAuth();
  const [recording, setRecording] = useState<boolean>(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const navigate = useNavigate();
  const startRecording = async () => {
    try {
      if (recording || videoURL) return;
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream as MediaStream;
        videoRef.current.play();
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        chunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoBlob(blob);
        setVideoURL(url);
        chunksRef.current = [];
        // Stop all tracks once done
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
    }
  };

  const retryRecording = () => {
    setVideoURL(null);
    setVideoBlob(null);
  };

  // Use the provided Cloudinary uploader to upload the video,
  // then update the Firebase user document with the secure_url and status.
  const uploadVideo = async () => {
    if (!videoBlob || !userId) return;

    // Upload the video to Cloudinary
    const secureUrl = await uploadVidToCloudinary(videoBlob);

    if (!secureUrl) {
      alert('Upload failed. Please try again.');
      return;
    }

    // Update Firebase: add the video URL and set status to "video-submitted"
    try {
      const userRef = doc(db, 'loanApplications', userId);
      await updateDoc(userRef, {
        videoUrl: secureUrl,
        status: 'video-submitted'
      });
      alert('Video uploaded and status updated successfully!');
      console.log('Firebase update success. Video URL:', secureUrl);
      navigate("/user");
    } catch (error) {
      console.error('Error updating Firebase:', error);
      alert('Error updating status. Please try again.');
    }
  };

  return (
    <div className="space-y-6 px-32">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="text-center">
          <Camera className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Video KYC Verification</h3>
          <p className="mt-1 text-sm text-gray-500">
            Complete your video KYC for instant verification
          </p>
        </div>

        <div className="mt-8">
          {videoURL ? (
            <>
              {/* Recorded Video Preview */}
              <div className="flex justify-center">
                <video
                  src={videoURL}
                  controls
                  className="w-[520px] h-[280px] object-cover rounded-lg"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={retryRecording}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  <RefreshCw className="h-5 w-5 mr-2" /> Retry
                </button>
                <button
                  onClick={uploadVideo}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  <Upload className="h-5 w-5 mr-2" /> Proceed
                </button>
              </div>
            </>
          ) : (
            // Live Camera Preview
            <div className="relative bg-gray-100 rounded-lg flex items-center justify-center">
              <video
                ref={videoRef}
                className="w-[520px] h-[280px] object-cover rounded-lg"
                autoPlay
                muted
              />
            </div>
          )}

          <div className="w-full flex justify-center mt-2">
            {recording && (
              <button
                onClick={stopRecording}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Stop Recording
              </button>
            )}
            {!videoURL && !recording && (
              <button
                onClick={startRecording}
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
              >
                Start Video KYC
              </button>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">
            Verification Steps:
          </h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <p className="text-sm font-medium text-gray-900">
                Face Detection - Position your face within the frame
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-5 w-5 rounded-full bg-gray-200"></div>
              <p className="text-sm font-medium text-gray-900">
                Liveness Check - Follow the on-screen instructions
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-5 w-5 rounded-full bg-gray-200"></div>
              <p className="text-sm font-medium text-gray-900">
                ID Verification - Show your ID card to the camera
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-blue-500" />
            <div className="ml-3">
              <h4 className="text-sm font-medium text-gray-900">Secure Verification</h4>
              <p className="mt-1 text-xs text-gray-500">
                Your video session is encrypted and will only be used for
                verification purposes. We comply with all data protection
                regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef } from 'react';
import { Camera, Shield, CheckCircle, RefreshCw, Upload } from 'lucide-react';

export function VideoKYC() {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      if (recording || videoURL) return; // Prevents starting a new recording if one already exists
      
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoBlob(blob);
        setVideoURL(url);
        chunksRef.current = [];
        
        // Stop video preview after recording
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };
console.log("url",videoURL)
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
  };

  const retryRecording = () => {
    setVideoURL(null);
    setVideoBlob(null);
    // startRecording();
  };

  const uploadVideo = async () => {
    if (!videoBlob) return;
    const formData = new FormData();
    formData.append('video', videoBlob, 'kyc-video.webm');

    try {
      const response = await fetch('https://dummyapi.com/upload', { // Replace with actual API
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      alert('Video uploaded successfully!');
      console.log('Upload Response:', data);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="text-center">
          <Camera className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Video KYC Verification</h3>
          <p className="mt-1 text-sm text-gray-500">Complete your video KYC for instant verification</p>
        </div>

        <div className="mt-8">
          {videoURL ? (
            <>
              <video src={videoURL} controls className="w-full rounded-lg" />
              <div className="mt-4 flex justify-between">
                <button onClick={retryRecording} className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md">
                  <RefreshCw className="h-5 w-5 mr-2" /> Retry
                </button>
                <button onClick={uploadVideo} className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md">
                  <Upload className="h-5 w-5 mr-2" /> Proceed
                </button>
              </div>
            </>
          ) : (
            <div className="relative bg-gray-100 rounded-lg aspect-video flex items-center justify-center ">
              <video ref={videoRef} className="w-full h-full object-cover rounded-lg z-10" autoPlay muted />
            </div>
          )}
          {/* {(recording && !videoURL) ? (
            <button onClick={stopRecording} className="px-4 py-2 bg-red-600 text-white rounded-md">Stop Recording</button>
          ) : (
           !videoURL {
            <button onClick={startRecording} className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md bottom-0 hover:bg-blue-700 ">Start Video KYC</button>}
          )} */}
          <div className='w=full flex justify-center mt-2'>

          {
            recording &&  <button onClick={stopRecording} className="px-4 py-2 bg-red-600 text-white rounded-md">Stop Recording</button>
            
          }
          {
            (!videoURL && !recording) &&  <button onClick={startRecording} className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md bottom-0 hover:bg-blue-700 ">Start Video KYC</button>
          }
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Verification Steps:</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <p className="text-sm font-medium text-gray-900">Face Detection - Position your face within the frame</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-5 w-5 rounded-full bg-gray-200"></div>
              <p className="text-sm font-medium text-gray-900">Liveness Check - Follow the on-screen instructions</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-5 w-5 rounded-full bg-gray-200"></div>
              <p className="text-sm font-medium text-gray-900">ID Verification - Show your ID card to the camera</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-blue-500" />
            <div className="ml-3">
              <h4 className="text-sm font-medium text-gray-900">Secure Verification</h4>
              <p className="mt-1 text-xs text-gray-500">
                Your video session is encrypted and will only be used for verification purposes. We comply with all data protection regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useRef, useState } from "react";
import { Camera, Shield, CheckCircle } from "lucide-react";

export function VideoKYC() {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [videoURL, setVideoURL] = useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        setVideoBlob(blob);
        setVideoURL(URL.createObjectURL(blob));

        // Stop video preview after recording
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const retryRecording = () => {
    setVideoBlob(null);
    setVideoURL(null);
    startRecording();
  };

  const uploadVideo = async () => {
    if (!videoBlob) return;
    
    const formData = new FormData();
    formData.append("video", videoBlob, "recording.webm");

    try {
      const response = await fetch("https://dummyapi.com/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Video uploaded successfully!");
      } else {
        alert("Upload failed!");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="text-center">
          <Camera className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Video KYC Verification</h3>
          <p className="mt-1 text-sm text-gray-500">
            Complete your video KYC for instant verification.
          </p>
        </div>

        <div className="mt-8">
          <div className="relative">
            <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
              {recording || !videoURL ? (
                <video ref={videoRef} className="w-full h-full object-cover rounded-lg" autoPlay muted />
              ) : (
                <video src={videoURL} className="w-full h-full object-cover rounded-lg" controls />
              )}
              {recording && (
                <button
                  onClick={stopRecording}
                  className="absolute bottom-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700"
                >
                  Stop Recording
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            {!recording && !videoBlob && (
              <button
                onClick={startRecording}
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
              >
                Start Video KYC
              </button>
            )}
            {videoBlob && (
              <>
                <button
                  onClick={retryRecording}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600"
                >
                  Retry
                </button>
                <button
                  onClick={uploadVideo}
                  className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700"
                >
                  Upload Video
                </button>
              </>
            )}
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Verification Steps:</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Face Detection</p>
                  <p className="text-xs text-gray-500">Position your face within the frame</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-5 w-5 rounded-full bg-gray-200"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Liveness Check</p>
                  <p className="text-xs text-gray-500">Follow the on-screen instructions</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-5 w-5 rounded-full bg-gray-200"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">ID Verification</p>
                  <p className="text-xs text-gray-500">Show your ID card to the camera</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-blue-500" />
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">Secure Verification</h4>
                <p className="mt-1 text-xs text-gray-500">
                  Your video session is encrypted and will only be used for verification purposes.
                  We comply with all data protection regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

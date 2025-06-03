'use client'
import { useState } from 'react';

export default function StepFlowPage() {
  const [step, setStep] = useState(1);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [yesNo, setYesNo] = useState(null);
  const [location, setLocation] = useState(null);
  const [mode, setMode] = useState(null);
  const [time, setTime] = useState('');

  const resetFlow = () => {
    setStep(1);
    setSelectedNumber(null);
    setYesNo(null);
    setLocation(null);
    setMode(null);
    setTime('');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 space-y-6">
      {/* Step 1 - Select number */}
      {step === 1 && (
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => {
                setSelectedNumber(num);
                setStep(2);
              }}
              className="w-10 h-10 bg-white border rounded-md flex items-center justify-center hover:bg-gray-200"
            >
              {num}
            </button>
          ))}
        </div>
      )}

      {/* Step 2 - Yes/No */}
      {step === 2 && (
        <div className="flex space-x-4">
          <button
            className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600"
            onClick={() => {
              setYesNo('Yes');
              setStep(3);
            }}
          >
            Yes
          </button>
          <button
            className="bg-red-400 text-white px-6 py-2 rounded shadow hover:bg-red-500"
            onClick={() => {
              setYesNo('No');
              setStep(6);
            }}
          >
            No
          </button>
        </div>
      )}

      {/* Step 3 - Mosque/Home */}
      {step === 3 && (
        <div className="flex space-x-4">
          <button
            className="bg-yellow-400 text-black px-6 py-2 rounded shadow hover:bg-yellow-500"
            onClick={() => {
              setLocation('Mosque');
              setStep(4);
            }}
          >
            Mosque
          </button>
          <button
            className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600"
            onClick={() => {
              setLocation('Home');
              setStep(5);
            }}
          >
            Home
          </button>
        </div>
      )}

      {/* Step 4 - Jamaat/Alone */}
      {step === 4 && (
        <div className="flex space-x-4">
          <button
            className="bg-yellow-400 text-black px-6 py-2 rounded shadow hover:bg-yellow-500"
            onClick={() => {
              setMode('Jamaat');
              setStep(6);
            }}
          >
            Jamaat
          </button>
          <button
            className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600"
            onClick={() => {
              setMode('Alon');
              setStep(5);
            }}
          >
            Alon
          </button>
        </div>
      )}

      {/* Step 5 - Time input */}
      {step === 5 && (
        <div className="bg-gray-100 p-4 rounded shadow text-center">
          <label className="block text-lg mb-2">The time?</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="px-2 py-1 rounded border w-40"
          />
          <button
            className="ml-4 bg-white border px-4 py-1 rounded hover:bg-gray-200"
            onClick={() => setStep(6)}
          >
            OK
          </button>
        </div>
      )}

      {/* Step 6 - Summary */}
      {step === 6 && (
        <div className="text-center space-y-2">
          <div className="text-xl font-bold">Flow Summary</div>
          <div>Selected Number: {selectedNumber}</div>
          <div>Answer: {yesNo}</div>
          {yesNo === 'Yes' && (
            <>
              <div>Place: {location}</div>
              {(location === 'Mosque' || location === 'Home') && mode && <div>Mode: {mode}</div>}
              {(location === 'Home' || mode === 'Alon') && <div>Time: {time}</div>}
            </>
          )}
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={resetFlow}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
}

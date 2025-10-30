"use client";

import { FaCog, FaShareAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

interface ControlPanelProps {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  panelOpen: boolean;
  setPanelOpen: (v: boolean) => void;
  shareBlog: () => void;
}

export default function ControlPanel({ darkMode, setDarkMode, fontSize, setFontSize, panelOpen, setPanelOpen, shareBlog }: ControlPanelProps) {
  const playSound = () => {
    const audio = new Audio("/notification.mp3");
    audio.play().catch(() => {});
  };

  return (
    <div className="fixed top-1/3 right-0 z-50 flex flex-col items-end">
      <button
        aria-label="Open Control Panel"
        className="p-4 m-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-l-full shadow-2xl hover:scale-105 transform transition"
        onClick={() => setPanelOpen(!panelOpen)}
      >
        <FaCog size={20} />
      </button>

      {panelOpen && (
        <div className="flex flex-col items-end bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-l-2xl shadow-2xl p-4 space-y-3 text-white">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl shadow-lg hover:scale-105 transform transition font-semibold cursor-pointer"
          >
            {darkMode ? "White Mode" : "Eye Care"}
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setFontSize((f) => Math.max(f - 2, 14))}
              className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-xl font-bold transition"
            >
              -
            </button>
            <button
              onClick={() => setFontSize((f) => Math.min(f + 2, 32))}
              className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-xl font-bold transition"
            >
              +
            </button>
          </div>

          <button
            onClick={() => { shareBlog(); playSound(); }}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl shadow-lg flex items-center gap-2 hover:scale-105 transform transition font-semibold cursor-pointer"
          >
            <FaShareAlt /> Share
          </button>
        </div>
      )}
    </div>
  );
}

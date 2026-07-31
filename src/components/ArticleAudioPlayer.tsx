"use client";

import React, { useState, useEffect, useRef } from "react";
import { HiPlay, HiPause, HiSpeakerWave, HiArrowPath } from "react-icons/hi2";

interface ArticleAudioPlayerProps {
  title: string;
  content: string;
}

export default function ArticleAudioPlayer({ title, content }: ArticleAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [isSupported, setIsSupported] = useState(true);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Extract clean plain text from article HTML
  const cleanText = React.useMemo(() => {
    if (typeof window === "undefined") return "";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    // Remove excessive spaces
    return `${title}. ${text.replace(/\s+/g, " ").trim()}`;
  }, [title, content]);

  const estimatedMinutes = Math.max(1, Math.ceil(cleanText.split(/\s+/).length / 180));

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsSupported(false);
      return;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const startPlayback = () => {
    if (!isSupported || !cleanText) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = speed;
    utterance.pitch = 1.0;
    utterance.lang = "en-US";

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      startProgressTimer();
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      stopProgressTimer();
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      stopProgressTimer();
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const togglePlay = () => {
    if (!isPlaying && !isPaused) {
      startPlayback();
    } else if (isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      stopProgressTimer();
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      startProgressTimer();
    }
  };

  const handleReset = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    stopProgressTimer();
  };

  const handleSpeedChange = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(speed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setSpeed(nextSpeed);

    if (isPlaying || isPaused) {
      // Restart playback at new speed
      startPlayback();
    }
  };

  const startProgressTimer = () => {
    stopProgressTimer();
    const durationSec = (cleanText.split(/\s+/).length / (180 * speed)) * 60;
    const intervalMs = 500;
    const increment = (intervalMs / (durationSec * 1000)) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) {
          stopProgressTimer();
          return 99;
        }
        return prev + increment;
      });
    }, intervalMs);
  };

  const stopProgressTimer = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  if (!isSupported) return null;

  return (
    <div className="bg-gradient-to-r from-[#170e09] to-[#120904] border border-[#ff6b00]/30 p-4 md:p-5 rounded-2xl text-white shadow-xl mb-8 relative overflow-hidden group">
      {/* Background Accent */}
      <div className="absolute right-0 top-0 w-32 h-32 bg-[#ff6b00]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ff6b00]/20 border border-[#ff6b00]/40 flex items-center justify-center text-[#ff6b00] shrink-0">
            <HiSpeakerWave className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ff6b00]">
                Audio Article Listener
              </span>
              <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded-full text-white/70">
                ~{estimatedMinutes} min listen
              </span>
            </div>
            <p className="text-xs text-white/70 line-clamp-1 mt-0.5">
              {title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 bg-[#ff6b00] hover:bg-[#e05e00] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
            aria-label={isPlaying && !isPaused ? "Pause narration" : "Listen to article"}
          >
            {isPlaying && !isPaused ? (
              <>
                <HiPause size={16} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <HiPlay size={16} />
                <span>{isPaused ? "Resume" : "Listen Now"}</span>
              </>
            )}
          </button>

          {/* Speed Toggle */}
          <button
            onClick={handleSpeedChange}
            className="bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold px-3 py-2.5 rounded-xl transition-all"
            title="Change reading speed"
          >
            {speed}x
          </button>

          {/* Reset Button */}
          {(isPlaying || isPaused || progress > 0) && (
            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white transition-all"
              title="Reset audio"
            >
              <HiArrowPath size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {(isPlaying || isPaused || progress > 0) && (
        <div className="mt-3.5 w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-[#ff6b00] h-full transition-all duration-300 rounded-full"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      )}
    </div>
  );
}

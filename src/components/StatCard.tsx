"use client";

import { useEffect, useRef, useState } from "react";
import {
  MdGroup,
  MdCalendarMonth,
  MdAutoStories,
  MdStar,
} from "react-icons/md";

const iconMap = {
  group: MdGroup,
  calendar: MdCalendarMonth,
  stories: MdAutoStories,
  star: MdStar,
};

export type StatIconName = keyof typeof iconMap;

function useCountUp(target: number, decimals = 0, duration = 1800) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ease = (t: number) =>
      t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            setValue(parseFloat((target * ease(progress)).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, decimals, duration]);

  return { value, ref };
}

interface StatCardProps {
  target: number;
  suffix: string;
  decimals: number;
  label: string;
  iconName: StatIconName;
}

export default function StatCard({
  target,
  suffix,
  decimals,
  label,
  iconName,
}: StatCardProps) {
  const { value, ref } = useCountUp(target, decimals);
  const IconComponent = iconMap[iconName] || MdStar;

  return (
    <div
      ref={ref}
      className="bg-[#140b07] rounded-2xl p-5 md:p-6 flex flex-col gap-2.5 border border-white/10 hover:border-[#ff6b00]/50 transition-all duration-300 hover:-translate-y-1 shadow-xl text-white group"
    >
      <div className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center border border-white/10 group-hover:bg-[#ff6b00]/20 group-hover:border-[#ff6b00]/40 transition-colors">
        <IconComponent className="text-[#ff6b00]" size={24} />
      </div>
      <p className="text-white font-black text-2xl md:text-3xl leading-none tabular-nums tracking-tight pt-1">
        {value.toFixed(decimals)}
        <span className="text-[#ff6b00]">{suffix}</span>
      </p>
      <p className="text-white/70 text-xs md:text-sm font-medium">{label}</p>
    </div>
  );
}

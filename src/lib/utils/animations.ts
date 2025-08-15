import { AnimationConfig } from "@/lib/types";
import { ANIMATION_DURATIONS } from "@/lib/constants";

export const fadeInUp = (delay: number = 0, duration: number = ANIMATION_DURATIONS.normal): AnimationConfig => ({
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease: "easeOut" },
});

export const fadeInLeft = (delay: number = 0, duration: number = ANIMATION_DURATIONS.normal): AnimationConfig => ({
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration, delay, ease: "easeOut" },
});

export const fadeInRight = (delay: number = 0, duration: number = ANIMATION_DURATIONS.normal): AnimationConfig => ({
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration, delay, ease: "easeOut" },
});

export const scaleIn = (delay: number = 0, duration: number = ANIMATION_DURATIONS.normal): AnimationConfig => ({
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration, delay, ease: "easeOut" },
});

export const staggerContainer = (staggerChildren: number = 0.1): AnimationConfig => ({
  initial: {},
  animate: {},
  transition: {
    staggerChildren,
  },
});

export const staggerItem = (index: number): AnimationConfig => {
  const positions = [
    { x: -100, y: 40, rotate: -1 },
    { x: 0, y: -60, rotate: 0 },
    { x: 100, y: 40, rotate: 1 },
  ];
  
  const position = positions[index % 3];
  
  return {
    initial: {
      opacity: 0,
      scale: 0.9,
      ...position,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
    },
    transition: {
      duration: 0.7,
      delay: index * 0.1,
      ease: "easeOut",
    },
  };
};

export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: ANIMATION_DURATIONS.fast },
};

export const slideInFromBottom = (delay: number = 0): AnimationConfig => ({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: ANIMATION_DURATIONS.slow, delay, ease: "easeOut" },
});
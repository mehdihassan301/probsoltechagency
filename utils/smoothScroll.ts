// Custom easing function (cubic-bezier-like)
const easeInOutQuart = (t: number): number => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
};

/**
 * Smoothly scrolls the window to a target Y-coordinate.
 * @param targetY The final Y position to scroll to.
 * @param duration The duration of the scroll animation in milliseconds.
 * @returns A promise that resolves when the scroll animation is complete.
 */
export const smoothScrollTo = (targetY: number, duration: number = 800): Promise<void> => {
  return new Promise(resolve => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutQuart(progress);
      
      window.scrollTo(0, startY + distance * easedProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        window.scrollTo(0, targetY); // Ensure final position is exact
        resolve();
      }
    };

    requestAnimationFrame(animation);
  });
};

import { create } from "zustand";

const useClickStore = create((set, get) => ({
  clickCount: 0, // Number of clicks
  lastClickTime: 0, // Timestamp of the last click
  cps: 0, // Clicks per second (CPS)

  incrementClickCount: () => {
    const currentTime = Date.now();
    const { clickCount, lastClickTime } = get();

    // If this is the first click or more than 5 seconds have passed, reset
    if (lastClickTime === 0 || currentTime - lastClickTime >= 5000) {
      set({ clickCount: 1, lastClickTime: currentTime, cps: 0 });
    } else {
      const elapsedTimeInSeconds = (currentTime - lastClickTime) / 60;
      const newCps = (clickCount + 1) / elapsedTimeInSeconds;
      set({
        clickCount: clickCount + 1,
        lastClickTime: currentTime,
        cps: newCps,
      });
    }
  },

  resetClickCount: () => set({ clickCount: 0, lastClickTime: 0, cps: 0 }),
}));

export default useClickStore;

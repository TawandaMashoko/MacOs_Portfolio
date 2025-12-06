import { locations } from '#constants';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    // Require a value, and ignore accidental calls with no argument
    setActiveLocation: (location) =>
      set((state) => {
        // Ignore accidental calls like setActiveLocation()
        if (location === undefined) {
          return;
        }

        // Optional: if you NEVER want null, also guard this:
        // if (location === null) return;

        state.activeLocation = location;
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
  }))
);

export default useLocationStore;

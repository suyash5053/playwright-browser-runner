import { create } from "zustand";

interface uiStates {
  isExpanded: boolean,
  setIsExpanded: (value: boolean) => void;
  isBrowserOpen: boolean,
  setIsBrowserOpen: (value: boolean) => void;
  isReady: boolean,
  setIsReady: (value: boolean) => void
}

const useUiStore = create<uiStates>((set) => ({
  isExpanded: false,
  setIsExpanded: (value: boolean) => set({ isExpanded: value }),
  isBrowserOpen: false,
  setIsBrowserOpen: (value: boolean) => set({ isBrowserOpen: value }),
  isReady: true,
  setIsReady: (value: boolean) => set({ isReady: value })
}))

export default useUiStore

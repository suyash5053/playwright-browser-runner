import { create } from "zustand";

interface Store {
  isExpanded: boolean,
  setIsExpanded: (expanded: boolean) => void;
}

const useStore = create<Store>((set) => ({
  isExpanded: false,
  setIsExpanded: (value: boolean) => set({ isExpanded: value }),
}))

export default useStore

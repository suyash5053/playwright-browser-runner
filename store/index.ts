import { create } from "zustand";

type Url = string | null

interface Store {
  isExpanded: boolean,
  setIsExpanded: (expanded: boolean) => void;
  isBrowserOpen: boolean,
  setIsBrowserOpen: (open: boolean) => void;
  url: Url,
  setUrl: (tempUrl: Url) => void
}

const useStore = create<Store>((set) => ({
  isExpanded: false,
  setIsExpanded: (value: boolean) => set({ isExpanded: value }),
  isBrowserOpen: false,
  setIsBrowserOpen: (value: boolean) => set({ isBrowserOpen: value }),
  url: null,
  setUrl: (value: Url) => set({ url: value })
}))

export default useStore

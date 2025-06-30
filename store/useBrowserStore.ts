import { CommandEntry, Url } from "@/types";
import { create } from "zustand";

interface browserStates {
  url: Url,
  setUrl: (url: Url) => void
  isLoading: boolean,
  setIsLoading: (value: boolean) => void
  commandsHistory: CommandEntry[],
  setCommandsHistory: (value: CommandEntry[] | ((prev: CommandEntry[]) => CommandEntry[])) => void;
  addCommandToHistory: (value: string, success: boolean) => void
}


const useBrowserStore = create<browserStates>((set) => ({
  url: null,
  setUrl: (url: Url) => set({ url }),
  isLoading: false,
  setIsLoading: (value: boolean) => set({ isLoading: value }),
  commandsHistory: [],
  setCommandsHistory: (value) =>
    set((state) => ({
      commandsHistory: typeof value === "function" ? value(state.commandsHistory) : value,
    })),
  addCommandToHistory: (value: string, success: boolean) =>
    set((state) => ({
      commandsHistory: [
        ...state.commandsHistory,
        {
          timestamp: new Date().toLocaleTimeString(),
          message: value,
          success: success
        },
      ],
    })),
}))

export default useBrowserStore

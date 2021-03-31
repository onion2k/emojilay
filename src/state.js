import create from 'zustand'
import { nanoid } from 'nanoid'

export const useStore = create((set, get) => ({
  emoji: { [nanoid()]: "😡" },
  addEmoji: (newEmoji) => set(state => ({ emoji: {...state.emoji, [nanoid()]: newEmoji }})),
  removeEmoji: (id) => {
    const _emoji = get().emoji
    delete _emoji[id]
    set({ emoji: _emoji })
  }
}))

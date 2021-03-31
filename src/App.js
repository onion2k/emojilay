import { useEffect, useRef } from 'react';
import './App.css';
import { useStore } from './state'

function EmojiButton({ emoji }) {
  const addEmoji = useStore(state => state.addEmoji)
  return (
    <button
      onClick={()=>{
        addEmoji(emoji)
      }}
      className="flex-auto bg-gray-600 hover:bg-gray-700 text-white font-bold text-2xl py-2 px-4 rounded">
        {emoji || "None"}
    </button>
  )
}

function EmojiMap() {
  const emojis = ["😂","❤️","😍","🤣","😊","🙏","💕","😭","😘","👍","😅","👏","😁","🔥","💔","💖","😢","🤔","😆","🙄","💪","😉","☺️","👌","🤗","😔","😎","😇","🌹","🤦","🎉","💞","✌️","✨","🤷","😱","😌","🌸","🙌","😋","😏","🙂","🤩","😄","😀","😃","💯","🙈","👇","🎶","😒","🤭","❣️","❗","😜","💋","👀","😪","😑","💥","🙋","😞","😩","😡","🤪","👊","☀️","😥","🤤","👉","💃","😳","✋","😚","😝","😴","🌟","😬","🙃","🍀","🌷","😻","😓","⭐","✅","🌈","😈","🤘","💦","✔️","😣","🏃","💐","☹️","🎊","💘","😠","😕","🌺"];

  return (
    <div className="p-1 bg-gray-900 flex flex-row flex-wrap items-start gap-1 content-start overflow-scroll" style={{ flex: 1 }}>
      { emojis.map((emoji, index)=>{ return (<EmojiButton key={`emoji-${index}`} emoji={emoji} />) }) }
    </div>
  )
}

function ScaleUpEmoji({emoji, id}) {
  const eRef = useRef()
  const removeEmoji = useStore(state=>state.removeEmoji)
  useEffect(()=>{
    if (eRef.current) {
      eRef.current.addEventListener('animationend', () => {
        removeEmoji(id)
      });
    }
    return () => {
      // Nothing to do here but return the function anyway
    }
  }, [id, removeEmoji]);
  return (<div ref={eRef} className="absolute scaleup">{emoji}</div>)
}

function App() {
  const emoji = useStore(state => state.emoji)
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-col items-center">
        <EmojiMap />
        <div className="w-full h-full grid place-items-center relative border border-red-500 border-solid" style={{ flex: 2 }}>
          {
            Object.entries(emoji).map(
              ([id, emoji])=>(<ScaleUpEmoji key={`emoji-${id}`} id={id} emoji={emoji} />)
            )}
        </div>
      </div>
    </div>
  );
}

export default App;

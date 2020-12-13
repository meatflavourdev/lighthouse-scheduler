import { useState } from "react"

export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode]);

  function transition(mode, replace = false) {
    setMode(mode)
    setHistory((prev) => {
      if (replace) prev.pop() // Remove last element and replace it
      return [...prev, mode]
    })
  }

  function back() {
    if (history.length <= 1) return; // Cannot go back if this is the last item in history
    setHistory((prev) => {
      prev.pop()
      setMode(prev.slice(-1)[0])
      return prev
    })

  }

  return { mode, transition, back }
}

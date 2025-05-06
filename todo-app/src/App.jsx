import { useState } from 'react'
import ToDoApp from './ToDoApp';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ToDoApp /> {/* 👈 Render your ToDoApp here */}
    </div>
  )
}

export default App

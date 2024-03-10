/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import duck from './assets/duck.jpg'
import egg from './assets/egg.png'
import book from './assets/book.png'
import ball from './assets/ball.jpeg'
import flower from './assets/flower.jpeg'

interface MemoryData {
  name: string
  class: string
  src: string
}

const App = () => {
  const [selectedItems, setSelectedItems] = useState<any>([])
  const [clickedTimes, setClickedTimes] = useState<number>(0)
  const [memoryData, setMemoryData] = useState<MemoryData[]>(
    [
      {
        name: 'duck',
        class: 'hidden',
        src: duck,
      },
      {
        name: 'duck',
        class: 'hidden',
        src: duck,
      },
      {
        name: 'egg',
        class: 'hidden',
        src: egg,
      },
      {
        name: 'egg',
        class: 'hidden',
        src: egg,
      },
      {
        name: 'book',
        class: 'hidden',
        src: book,
      },
      {
        name: 'book',
        class: 'hidden',
        src: book,
      },
      {
        name: 'ball',
        class: 'hidden',
        src: ball,
      },
      {
        name: 'ball',
        class: 'hidden',
        src: ball,
      },
      {
        name: 'flower',
        class: 'hidden',
        src: flower,
      },
      {
        name: 'flower',
        class: 'hidden',
        src: flower,
      },
    ].sort(() => Math.random() - 0.5)
  )

  const handleMemoryClick = (memoryIdx: number) => {
    let idExists = false
    selectedItems.forEach((item: any) => {
      if (item.id === memoryIdx) {
        idExists = true
      } else {
        idExists = false
      }
    })
    if (idExists) {
      return
    }
    setClickedTimes((prev) => prev + 1)
    const newMemoryData = [...memoryData]
    const firstSelectedItem = selectedItems[0]
    const secondSelectedItem = selectedItems[1]
    setSelectedItems((prev: any) => [
      ...prev,
      { ...memoryData[memoryIdx], id: memoryIdx },
    ])

    if (clickedTimes < 2) {
      newMemoryData[memoryIdx].class = 'shown'
    } else if (
      clickedTimes > 1 &&
      firstSelectedItem?.name !== secondSelectedItem?.name
    ) {
      for (const memory of newMemoryData) {
        memory.class = 'hidden'
        setClickedTimes(0)
        setSelectedItems([])
      }
    } else if (firstSelectedItem?.name === secondSelectedItem?.name) {
      setSelectedItems([])
      setClickedTimes(0)
    }

    const allGuessed = memoryData.every((item) => item.class === 'shown')

    if (allGuessed) {
      memoryData.forEach((memory) => {
        memory.class = 'hidden'
      })
    }

    setMemoryData(newMemoryData)
  }

  return (
    <main>
      <div className='memory-game'>
        {memoryData.map((item, idx) => (
          <div
            key={idx}
            className={item.class}
            onClick={() => handleMemoryClick(idx)}
          >
            <img src={item.src} alt={item.name} />
          </div>
        ))}
      </div>
    </main>
  )
}

export default App

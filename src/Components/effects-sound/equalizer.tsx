"use client"

import { useEffect, useState } from "react"

export default function Equalizer() {
  const [bars, setBars] = useState<number[]>([])

  useEffect(() => {
    const generateBars = () => {
      const newBars = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
      setBars(newBars)
    }

    generateBars()

    const interval = setInterval(() => {
      generateBars()
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-8 items-end justify-center space-x-1">
      {bars.map((height, index) => (
        <div
          key={index}
          className="w-1 bg-gradient-to-t from-pink-500 to-purple-500"
          style={{
            height: `${Math.max(10, height)}%`,
            transition: "height 0.2s ease-in-out",
          }}
        />
      ))}
    </div>
  )
}


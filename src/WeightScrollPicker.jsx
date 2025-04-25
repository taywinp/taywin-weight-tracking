import { useEffect, useRef, useState } from "react";

export default function WeightScrollPicker({ value, onChange }) {
  const intRef = useRef(null)
  const decRef = useRef(null)

  const intList = Array.from({ length: 101 }, (_, i) => 30 + i) // 30 - 130
  const decList = Array.from({ length: 10 }, (_, i) => i)

  const scrollTo = (ref, index) => {
    if (ref.current) {
      ref.current.scrollTo({
        top: index * 40,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    if (value >= 30) { // Ensure value is within the valid range
      scrollTo(intRef, Math.floor(value) - 30);
      scrollTo(decRef, Math.round((value % 1) * 10));
    }
  }, [value])

  const handleScroll = (ref, setVal, offset = 0) => {
    const idx = Math.round(ref.current.scrollTop / 40)
    setVal(idx + offset)
  }

  const wrapperStyle = "w-20 h-[120px] overflow-y-scroll snap-y snap-mandatory bg-gray-700 rounded text-center text-white text-xl"

  return (
    <div className="flex items-center justify-center space-x-2 mb-4">
      <div
        ref={intRef}
        className={wrapperStyle}
        onScroll={() => handleScroll(intRef, int => onChange(int + Math.round((value % 1) * 10) / 10), 30)}
      >
        {intList.map(i => (
          <div key={i} className="snap-center h-10 flex items-center justify-center">{i}</div>
        ))}
      </div>

      <span className="text-white text-xl">.</span>

      <div
        ref={decRef}
        className={wrapperStyle}
        onScroll={() => handleScroll(decRef, dec => onChange(Math.floor(value) + dec / 10))}
      >
        {decList.map(i => (
          <div key={i} className="snap-center h-10 flex items-center justify-center">{i}</div>
        ))}
      </div>

      <span className="text-white text-xl ml-1">kg</span>
    </div>
  )
}

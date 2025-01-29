import React, { useState, useEffect } from "react"

const Clock = () => {
  const [hora, setHora] = useState("")

  useEffect(() => {
    const updateHour = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const ampm = hours >= 12 ? "pm" : "am"
      const hours12 = hours % 12 || 12

      const hourFormat = `${hours12}:${minutes.toString().padStart(2, "0")} ${ampm}`
      setHora(hourFormat)
    }

    updateHour()
    const interval = setInterval(updateHour, 1000)

    return () => clearInterval(interval)
  }, [])

  return <div className="text-3xl font-bold text-center p-2 bg-gray-100 rounded-lg shadow">{hora}</div>
}

// to do: fast time when event click to work, sleep, phone.

export default Clock;
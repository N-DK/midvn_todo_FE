import { useState, useEffect } from "react"

const useDebounce = (value: any, delay: number) => {
  const [debounceValue, setDebounceValue] = useState<any>(value)

  useEffect(() => {
    const handle = setTimeout(() => setDebounceValue(value), delay)

    return () => clearTimeout(handle)
  }, [value, delay])
  return debounceValue
}

export default useDebounce

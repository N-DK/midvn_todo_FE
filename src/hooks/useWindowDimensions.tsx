// import { useState, useEffect } from "react"
// import { lg_screen, md_screen } from "../constants"

// function getWindowDimensions() {
//   const { innerWidth: width, innerHeight: height } = window
//   return {
//     width,
//     height,
//   }
// }

// export default function useWindowDimensions() {
//   const [windowDimensions, setWindowDimensions] = useState(
//     getWindowDimensions(),
//   )

//   const { height, width } = getWindowDimensions()

//   const isMD = width < lg_screen

//   useEffect(() => {
//     function handleResize() {
//       setWindowDimensions(getWindowDimensions())
//     }

//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [])

//   return { ...windowDimensions, isMD }
// }

import getTime from "./getTime"

export const _log = (...args: any[]) => {
  //   return
  const currTime = getTime.currTime()
  console.log(`${currTime} >>`, ...args)
}

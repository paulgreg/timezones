type updateFnType = (nb: number) => void

const subscribers: Record<string, updateFnType> = {}
let timeout: NodeJS.Timeout

const registerTick = (key: string, updateFn: updateFnType) => {
  subscribers[key] = updateFn
}

const unregisterTick = (key: string) => {
  delete subscribers[key]
}

const getMsUntilNextSecond = (date: Date) => 1000 - date.getMilliseconds()

const start = () => {
  stop()
  tick()
}

const stop = () => clearTimeout(timeout)

const tick = () => {
  const date = new Date()
  const timestamp = +date
  for (let key in subscribers) {
    subscribers[key](timestamp)
  }
  timeout = setTimeout(tick, getMsUntilNextSecond(date))
}

const handleVisibilityChange = () => (document.hidden ? stop() : start())

document.addEventListener('visibilitychange', handleVisibilityChange, false)

start()

export { registerTick, unregisterTick }

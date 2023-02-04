const subscribers = {}
let timeout

const registerTick = (key, updateFn) => {
  subscribers[key] = updateFn
}

const unregisterTick = (key) => {
  delete subscribers[key]
}

const getMsUntilNextMinute = (date) => {
  const msUntilNextSecond = 1000 - date.getMilliseconds()
  const secondUntilNextMinute = 60 - date.getSeconds()
  return msUntilNextSecond + secondUntilNextMinute * 1000
}

const start = () => {
  stop()
  tick()
}

const stop = () => clearTimeout(timeout)

const tick = () => {
  const date = new Date()
  const timestamp = +date
  for (var key in subscribers) {
    subscribers[key](timestamp)
  }
  timeout = setTimeout(tick, getMsUntilNextMinute(date))
}

const handleVisibilityChange = () => (document.hidden ? stop() : start())

document.addEventListener('visibilitychange', handleVisibilityChange, false)

start()

export { registerTick, unregisterTick }

const subscribers = {}
let timeout

const registerTick = (key, updateFn) => {
  subscribers[key] = updateFn
}

const unregisterTick = (key) => {
  delete subscribers[key]
}

const getMsUntilNextSecond = (date) => 1000 - date.getMilliseconds()

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
  timeout = setTimeout(tick, getMsUntilNextSecond(date))
}

const handleVisibilityChange = () => (document.hidden ? stop() : start())

document.addEventListener('visibilitychange', handleVisibilityChange, false)

start()

export { registerTick, unregisterTick }

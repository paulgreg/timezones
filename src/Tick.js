const subscribers = {}
let timeout

function registerTick (l, fn) {
  subscribers[l] = fn
}

function unregisterTick (l) {
  delete subscribers[l]
}

function getMsUntilNextMinute (date) {
  const msUntilNextSecond = 1000 - date.getMilliseconds()
  const secondUntilNextMinute = 60 - date.getSeconds()
  return msUntilNextSecond + secondUntilNextMinute * 1000
}

function start () {
  stop()
  tick()
  timeout = setTimeout(tick, getMsUntilNextMinute(new Date()))
}

function stop() {
  clearTimeout(timeout)
}

function tick () {
  const date = new Date()
  const timestamp = +date
  for (var key in subscribers) {
    subscribers[key](timestamp)
  }
  timeout = setTimeout(tick, getMsUntilNextMinute(date))
}

function handleVisibilityChange() {
  document.hidden ? stop() : start()
}
document.addEventListener("visibilitychange", handleVisibilityChange, false);

start()

export { registerTick, unregisterTick }

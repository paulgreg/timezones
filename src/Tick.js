const subscribers = {}
let interval

function registerTick (l, fn) {
  subscribers[l] = fn
}

function unregisterTick (l) {
  delete subscribers[l]
}

function start () {
  stop()
  tick()
  interval = setInterval(tick, 1000)
}

function stop() {
  clearInterval(interval)
}

function tick () {
  const timestamp = +new Date()
  for (var key in subscribers) {
    subscribers[key](timestamp)
  }
}

function handleVisibilityChange() {
  document.hidden ? stop() : start()
}
document.addEventListener("visibilitychange", handleVisibilityChange, false);

start()

export { registerTick, unregisterTick }

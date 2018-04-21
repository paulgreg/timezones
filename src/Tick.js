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
  const date = new Date()

  for (var key in subscribers) {
    subscribers[key](date)
  }
}

function handleVisibilityChange() {
  document.hidden ? stop() : start()
}
document.addEventListener("visibilitychange", handleVisibilityChange, false);

start()

export { registerTick, unregisterTick }

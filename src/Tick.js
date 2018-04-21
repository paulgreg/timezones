
const subscribers = {}

function registerTick (l, fn) {
  subscribers[l] = fn
}

function unregisterTick (l) {
  delete subscribers[l]
}

let interval = setInterval(tick, 1000)

function tick () {
  const date = new Date()

  for (var key in subscribers) {
    subscribers[key](date)
  }
}

export { registerTick, unregisterTick }

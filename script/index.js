let mqtt
const host = "smartbox.frandika.com"
const port = 9001
let ledInterval
let ledTime = 0
let acInterval
let acTime = 0

function MQTTConnect() {
  mqtt = new Paho.MQTT.Client(host, port, "clientjs")

  const options = {
    timeout: 3,
    onSuccess: function() {
      console.log("Connected to MQTT!")
    },
  }

  mqtt.connect(options)
}

function sendLamp(status) {
  const msg = new Paho.MQTT.Message(status)
  msg.destinationName = "led"
  mqtt.send(msg)
}

function clickLamp() {
  const button = document.getElementById("lamp-input")
  const timer = document.getElementById("led-timer")
  
  if (button.checked) {
    sendLamp("1")
    ledTime = 0
    timer.innerHTML = ledTime
    ledInterval = setInterval(function() {
      ledTime++;
      timer.innerHTML = ledTime
    }, 1000)
  } else {
    sendLamp("0")
    clearInterval(ledInterval)
  }
}

function timerLamp() {
  const input = document.getElementById("lamp-time")
  const button = document.getElementById("lamp-input")
  const time = parseInt(input.value) * 1000

  setTimeout(function() {
    button.checked = true
    clickLamp()
  }, time)
}

function sendAc(status) {
  const msg = new Paho.MQTT.Message(status)
  msg.destinationName = "ac"
  mqtt.send(msg)
}

function clickAc() {
  const button = document.getElementById("ac-input")
  const timer = document.getElementById("ac-timer")
  
  if (button.checked) {
    sendAc("1")
    acTime = 0 
    timer.innerHTML = acTime
    acInterval = setInterval(function() {
      acTime++;
      timer.innerHTML = acTime
    }, 1000)
  } else {
    sendAc("0")
    clearInterval(acInterval)
  }
}

function timerAc() {
  const input = document.getElementById("ac-time")
  const button = document.getElementById("ac-input")
  const time = parseInt(input.value) * 1000

  setTimeout(function() {
    button.checked = true
    clickAc()
  }, time)

}

MQTTConnect()
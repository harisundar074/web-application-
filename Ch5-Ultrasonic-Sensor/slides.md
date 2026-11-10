---
theme: slidev-theme-tahta
title: Using Ultrasonic Sensor on Spark bot
themeConfig:
  variant: minimal
addons:
  - addons/logos
mdc: true
layout: cover
kicker: e-Yantra Embedded Workshop · IIT Bombay
subtitle: "e-Yantra Team<br>Embedded Real-Time Systems (ERTS) Lab<br>Indian Institute of Technology, Bombay"
---

---
title: Agenda for Discussion
kicker: Outline
routeAlias: agenda
class: agenda-slide
---

<div class="agenda-single">
  <div class="kicker">1 · Ultrasonic Sensor</div>
  <Link to="what" class="agenda-item"><div class="agenda-num">01</div><div class="agenda-topic">What is Ultrasonic Sensor?</div></Link>
  <Link to="features" class="agenda-item"><div class="agenda-num">02</div><div class="agenda-topic">HC-SR04 Features</div></Link>
  <Link to="pins" class="agenda-item"><div class="agenda-num">03</div><div class="agenda-topic">Pin Description</div></Link>
  <Link to="working" class="agenda-item"><div class="agenda-num">04</div><div class="agenda-topic">Working Principle</div></Link>
  <Link to="distance" class="agenda-item"><div class="agenda-num">05</div><div class="agenda-topic">Distance Calculation</div></Link>
</div>

---
title: What is an Ultrasonic Sensor?
kicker: Ultrasonic Sensor · What is Ultrasonic Sensor?
routeAlias: what
class: centered wide-gaps big-pts
---

<div class="check">
<v-clicks>

- Ultrasonic sensor is a non-contact distance measurement sensor.
- Works on ultrasonic wave reflection principle.
- Uses high-frequency 40 kHz sound pulses.
- Provides accurate short-range distance sensing.

</v-clicks>
</div>

---
title: HC-SR04 Features
kicker: Ultrasonic Sensor · HC-SR04 Features
routeAlias: features
class: centered us-gaps big-pts
---

<div class="check">
<v-clicks>

- Operating Voltage: 5V DC.
- Operating Current: 15 mA.
- Frequency: 40 kHz ultrasonic sound.
- Range: 2 cm to 400 cm (approx. 4 m).
- Accuracy: around 3 mm.

</v-clicks>
</div>

---
title: HC-SR04 Pin Connections
kicker: Ultrasonic Sensor · HC-SR04 Features
class: us-fig-slide
---

<img class="pwm-fig" style="height: 23rem" src="./images/hcsr04_pins.png" alt="HC-SR04 module with its four pins labelled VCC (red), Trig (green), Echo (yellow) and GND (black)" />

---
title: HC-SR04 Pin Description
kicker: Ultrasonic Sensor · Pin Description
routeAlias: pins
class: centered wide-gaps big-pts
---

<div class="check">
<v-clicks>

- VCC — Power input (5V).
- TRIG — Input pin to start measurement.
- ECHO — Output pulse proportional to distance.
- GND — Ground connection.

</v-clicks>
</div>

---
title: How does the Ultrasonic Sensor Work?
kicker: Ultrasonic Sensor · Working Principle
routeAlias: working
class: centered wide-gaps big-pts
---

<div class="check">
<v-clicks>

- Microcontroller sends a $\geq 10\mu s$ trigger pulse.
- Sensor emits 8 pulses at 40 kHz.
- Sound waves travel and hit an obstacle.
- Echo pin stays HIGH for the duration of return time.

</v-clicks>
</div>

---
title: How is Distance Calculated?
kicker: Ultrasonic Sensor · Distance Calculation
routeAlias: distance
class: centered wide-gaps big-pts
---

<div class="check">
<v-clicks>

- Measurement is based on time-of-flight of sound.
- Speed of sound $\approx$ 0.0343 cm/$\mu$s.
- Formula: Distance = (Time $\times$ Speed of sound) / 2.
- Division by 2 because sound travels to object and back.

</v-clicks>
</div>

---
title: Distance Measurement
kicker: Ultrasonic Sensor · Distance Calculation
class: us-fig-slide
---

<img class="pwm-fig" style="height: 19rem" src="./images/distance_measurement.png" alt="HC-SR04: the transmitter sends the original wave to an obstacle and the receiver gets the reflected wave back" />

<div v-click class="us-formula">

Distance = (Time $\times$ Speed of sound) / 2.

</div>

---
title: HC-SR04 Working
kicker: Ultrasonic Sensor · Distance Calculation
class: us-fig-slide
---

<img class="pwm-fig" style="height: 22rem" src="./images/hcsr04_timing.png" alt="Timing diagram: 10 us trigger pulse on the Trig pin, eight 40 kHz pulses from the module, then the ECHO pin stays HIGH for the time taken by the pulse to leave and return" />

---
layout: end
title: Thank You!
subtitle: e-Yantra Workshop Series · IIT Bombay
contact: "Post your queries on: support@e-yantra.org"
---

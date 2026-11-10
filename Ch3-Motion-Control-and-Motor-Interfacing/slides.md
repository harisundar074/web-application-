---
theme: slidev-theme-tahta
title: Motion Control and Motor Interfacing
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

<div class="agenda-two">
  <div>
    <div class="kicker">1 · Basic Movements of Robot</div>
    <Link to="motions" class="agenda-item"><div class="agenda-num">01</div><div class="agenda-topic">Motions of Robot</div></Link>
    <Link to="tb6612" class="agenda-item"><div class="agenda-num">02</div><div class="agenda-topic">Understanding TB6612FNG IC</div></Link>
    <div class="kicker sec2">2 · Motor Interfacing on Spark bot</div>
    <Link to="pins" class="agenda-item"><div class="agenda-num">03</div><div class="agenda-topic">Pin connections</div></Link>
    <Link to="logic" class="agenda-item"><div class="agenda-num">04</div><div class="agenda-topic">Logic Table</div></Link>
  </div>
  <div>
    <div class="kicker">3 · Wheel Encoders on Spark Bot</div>
    <Link to="encoder" class="agenda-item"><div class="agenda-num">05</div><div class="agenda-topic">Encoder &amp; its working</div></Link>
    <Link to="encoder-motion" class="agenda-item"><div class="agenda-num">06</div><div class="agenda-topic">Encoders in motion control</div></Link>
    <Link to="encoder-circuit" class="agenda-item"><div class="agenda-num">07</div><div class="agenda-topic">IR sensor + Schmitt trigger</div></Link>
    <Link to="encoder-interface" class="agenda-item"><div class="agenda-num">08</div><div class="agenda-topic">Interfacing the encoder</div></Link>
  </div>
</div>

---
title: Types of Motions
kicker: Basic Movements of Robot · Motions of Robot
routeAlias: motions
---

<div class="mgrid">
  <div class="mcell" v-click>
    <div class="mbot"><span class="arr">↑</span><img src="./images/robot_top.png" alt="Robot, top view" /><span class="arr">↑</span></div>
    <div class="mlabel">Forward</div>
  </div>
  <div class="mcell" v-click>
    <div class="mbot"><span class="arr">↓</span><img src="./images/robot_top.png" alt="Robot, top view" /><span class="arr">↓</span></div>
    <div class="mlabel">Backward</div>
  </div>
  <div class="mcell" v-click>
    <div class="mbot"><span class="arr">↓</span><img src="./images/robot_top.png" alt="Robot, top view" /><span class="arr">↑</span></div>
    <div class="mlabel">Left</div>
  </div>
  <div class="mcell" v-click>
    <div class="mbot"><span class="arr">↑</span><img src="./images/robot_top.png" alt="Robot, top view" /><span class="arr">↓</span></div>
    <div class="mlabel">Right</div>
  </div>
</div>

---
title: Types of Motion (Contd..)
kicker: Basic Movements of Robot · Motions of Robot
---

<div class="mgrid">
  <div class="mcell" v-click>
    <div class="mbot"><span class="arr">↑</span><img src="./images/robot_top.png" alt="Robot, top view" /><span class="arr"></span></div>
    <div class="mlabel">Soft-Right</div>
  </div>
  <div class="mcell" v-click>
    <div class="mbot"><span class="arr"></span><img src="./images/robot_top.png" alt="Robot, top view" /><span class="arr">↑</span></div>
    <div class="mlabel">Soft-Left</div>
  </div>
  <div class="mcell" v-click>
    <div class="mbot"><span class="arr">↓</span><img src="./images/robot_top.png" alt="Robot, top view" /><span class="arr"></span></div>
    <div class="mlabel">Backward Left</div>
  </div>
  <div class="mcell" v-click>
    <div class="mbot"><span class="arr"></span><img src="./images/robot_top.png" alt="Robot, top view" /><span class="arr">↓</span></div>
    <div class="mlabel">Backward Right</div>
  </div>
</div>

---
title: Direction Control of DC Motor
kicker: Basic Movements of Robot · Motions of Robot
---

<div class="motor-pair">
  <figure v-click>
    <figcaption>Anti-Clockwise Motion</figcaption>
    <img src="./images/motor_acw.png" alt="DC motor with + on top and - at the bottom of the battery: anti-clockwise (ACW) rotation" />
  </figure>
  <figure v-click>
    <figcaption>Clockwise Motion</figcaption>
    <img src="./images/motor_cw.png" alt="DC motor with the battery reversed: clockwise (CW) rotation" />
  </figure>
</div>

---
title: H-Bridge Motor Driver Circuit
kicker: Basic Movements of Robot · Motions of Robot
---

<div class="split">
<div>

<v-clicks>

- An H-Bridge is used to control the direction of a DC motor.
- It consists of four switching elements (Q1–Q4).
- The motor is placed in the center of the bridge.
- Diodes protect the circuit from back EMF.

</v-clicks>

</div>
<img src="./images/hbridge.png" alt="H-Bridge: four transistors Q1-Q4 with diodes D1-D4 around a motor M" />
</div>

---
title: Current Flow in H-Bridge
kicker: Basic Movements of Robot · Motions of Robot
---

<div class="split">
<div>

<v-clicks>

- When Q1 and Q4 turn ON, current flows in one direction.
- The motor rotates in the forward direction.
- When Q2 and Q3 turn ON, current direction reverses.
- Motor rotates in the opposite direction.

</v-clicks>

</div>
<img v-click="1" src="./images/hbridge_current.png" alt="H-Bridge with the current path through Q1, the motor and Q4 drawn in red" />
</div>

---
title: Need for TB6612FNG Motor Driver IC
kicker: Basic Movements of Robot · Understanding TB6612FNG IC
routeAlias: tb6612
class: centered gap-6
---

<v-clicks>

1. A microcontroller I/O pin can source only about 20 mA of current.
2. This limitation restricts it from driving high-power devices directly.
3. Motors require much higher current during operation.
4. Direct connection can result in unreliable behavior.
5. A dedicated interface is therefore needed between the controller and the motor.
6. TB6612FNG performs this role by handling the load safely.

</v-clicks>

---
title: TB6612FNG IC
kicker: Basic Movements of Robot · Understanding TB6612FNG IC
---

<img class="photo" style="height: 24rem; max-height: none; width: auto" src="./images/tb6612_pinout.png" alt="TB6612FNG pinout: VM, VCC, GND, A1, A2 to motor 1, B1, B2 to motor 2, GND on the left; ENA, AIN2, AIN1, STBY, BIN1, BIN2, ENB, GND on the right" />

---
title: TB6612FNG IC
kicker: Basic Movements of Robot · Understanding TB6612FNG IC
class: centered
---

<img class="photo" style="width: 100%; max-height: 24rem" src="./images/tb6612_wiring.png" alt="TB6612FNG wiring: motor power 4.5-13.5 V to VMOT, logic power 2.7-5.5 V to VCC, DC motor on AO1/AO2, microcontroller PWM to ENA and GPIO to AIN1/AIN2, STBY to logic power" />

---
title: Motor Pin Connection
kicker: Motor Interfacing on Spark bot · Pin connections
routeAlias: pins
class: alpha-sub title-gap
---

<v-clicks depth="2">

1. Four Pins are used for Direction control
   1. AIN1 - Left Motor Control
   2. AIN2 - Left Motor Control
   3. BIN1 - Right Motor Control
   4. BIN2 - Right Motor Control
2. Two Pins are used for Enabling Motor Driver IC
   1. ENA - Left Channel Enable
   2. ENB - Right Channel Enable

</v-clicks>

---
title: Logic Table
kicker: Motor Interfacing on Spark bot · Logic Table
routeAlias: logic
---

<table class="logic">
  <thead>
    <tr><th rowspan="2">Direction</th><th>AIN1</th><th>AIN2</th><th>BIN1</th><th>BIN2</th></tr>
    <tr><th>LF</th><th>LB</th><th>RB</th><th>RF</th></tr>
  </thead>
  <tbody>
    <tr><td>Forward</td><td><span v-click="1" class="one">1</span></td><td><span v-click="1">0</span></td><td><span v-click="1">0</span></td><td><span v-click="1" class="one">1</span></td></tr>
    <tr><td>Backward</td><td><span v-click="2">0</span></td><td><span v-click="2" class="one">1</span></td><td><span v-click="2" class="one">1</span></td><td><span v-click="2">0</span></td></tr>
    <tr><td>Left</td><td><span v-click="3">0</span></td><td><span v-click="3" class="one">1</span></td><td><span v-click="3">0</span></td><td><span v-click="3" class="one">1</span></td></tr>
    <tr><td>Right</td><td><span v-click="4" class="one">1</span></td><td><span v-click="4">0</span></td><td><span v-click="4" class="one">1</span></td><td><span v-click="4">0</span></td></tr>
    <tr><td>Soft Left</td><td><span v-click="5">0</span></td><td><span v-click="5">0</span></td><td><span v-click="5">0</span></td><td><span v-click="5" class="one">1</span></td></tr>
    <tr><td>Soft Right</td><td><span v-click="6" class="one">1</span></td><td><span v-click="6">0</span></td><td><span v-click="6">0</span></td><td><span v-click="6">0</span></td></tr>
    <tr><td>Stop</td><td><span v-click="7">0</span></td><td><span v-click="7">0</span></td><td><span v-click="7">0</span></td><td><span v-click="7">0</span></td></tr>
  </tbody>
</table>

---
title: How the Motor Driver is Connected
kicker: Motor Interfacing on Spark Bot · Interfacing
routeAlias: motor-interface
class: enc-slide
---

<div class="chain">
  <div class="chain-box" v-click="1"><b>Master controller</b><span>Arduino Uno (ATmega328P)</span><span></span></div>
  <div class="chain-link" v-click="2"><span>Direction +<br>speed signals</span><i>→</i></div>
  <div class="chain-box" v-click="2"><b>Motor driver</b><span>TB6612FNG (U11)</span><span></span></div>
  <div class="chain-link" v-click="3"><span>Motor<br>power</span><i>→</i></div>
  <div class="chain-box" v-click="3"><b>DC motors</b><span>Right + Left wheel</span><span></span></div>
</div>

<v-clicks at="4">

1. **Master controller:** decides the direction and speed of each motor and sends these signals directly to the motor driver.
2. **Motor driver:** takes these logic signals and switches the motor supply to the motors.
3. **DC motors:** one channel drives the right motor, the other drives the left motor.

</v-clicks>

---
title: What is an Encoder?
kicker: Wheel Encoders on Spark Bot · Encoder
routeAlias: encoder
class: enc-slide
---

<v-clicks>

- An encoder converts the rotation of a wheel into electrical pulses.
- A disc with alternating marks turns with the wheel; a sensor detects each mark.
- Counting pulses tells how far and how fast the wheel has turned.

</v-clicks>

<img v-click class="enc-fig" style="height: 14rem" src="./images/encoder_concept.svg" alt="Striped encoder disc next to an IR sensor; the sensor output is a train of square pulses, one per mark" />

---
title: Working of a Reflective IR Encoder
kicker: Wheel Encoders on Spark Bot · Encoder
class: enc-slide
---

<v-clicks>

- The sensor has an IR LED and a photo-transistor side by side, facing the marks.
- White mark → IR light reflects back → photo-transistor turns **ON**.
- Black mark → IR light is absorbed → photo-transistor stays **OFF**.
- As the wheel turns, ON / OFF repeats → one pulse per mark.

</v-clicks>

<img v-click="1" class="enc-fig" style="height: 13rem" src="./images/reflective_working.svg" alt="Left: IR light from the LED reflects off a white mark into the photo-transistor. Right: a black mark absorbs the light, so nothing returns" />

---
title: Encoders in Motion Control
kicker: Wheel Encoders on Spark Bot · Motion control
routeAlias: encoder-motion
class: title-gap roomy
---

<v-clicks>

- **Distance:** count pulses to move an exact distance
- **Speed:** pulses per second gives wheel speed
- **Straight line:** match left and right pulse counts
- **Accurate turns:** count pulses to turn by an angle
- **Stall check:** motor ON but no pulses → wheel is stuck

</v-clicks>

---
title: Encoder Circuit on Spark Bot
kicker: Wheel Encoders on Spark Bot · IR sensor + Schmitt trigger
routeAlias: encoder-circuit
layout: two-cols
class: cols-center enc-circuit
---

<img class="photo" style="height: 25rem; max-height: none; width: auto" src="./images/encoder_schematic.png" alt="Spark Bot encoder schematic: GP2S700HCP sensors A1/A2 with 1K and 100K resistors feeding SN74LVC2G14 Schmitt-trigger inverters U12/U13; outputs ENC_L / ENC_R and yellow LEDs LED4 / LED5" />

::right::

<v-clicks>

1. **GP2S700HCP** – reflective IR sensor (IR LED + photo-transistor)
2. **SN74LVC2G14** – dual Schmitt-trigger inverter cleans the signal
3. **ENC_L / ENC_R** – encoder output signal for each wheel

</v-clicks>

---
title: Why a Schmitt Trigger?
kicker: Wheel Encoders on Spark Bot · IR sensor + Schmitt trigger
class: enc-slide
---

<v-clicks>

- The photo-transistor output changes **slowly** and carries **noise**.
- A gate with **one threshold** flips many times near it → false extra counts.
- A **Schmitt trigger** has two thresholds: goes HIGH above **VT+**, LOW only below **VT−**.

</v-clicks>

<img v-click="3" class="enc-fig" style="height: 12rem" src="./images/schmitt.svg" alt="Noisy slow sensor signal with VT+ and VT- lines; a single-threshold output chatters with extra pulses, the Schmitt-trigger output is one clean pulse per mark" />

---
title: How the Encoder is Connected
kicker: Wheel Encoders on Spark Bot · Interfacing
routeAlias: encoder-interface
class: enc-slide
---

<div class="chain">
  <div class="chain-box" v-click="1"><b>Encoder</b><span>GP2S700HCP + SN74LVC2G14</span><span></span></div>
  <div class="chain-link" v-click="2"><span>ENCODER_DATA<br>ENC_L / ENC_R</span><i>→</i></div>
  <div class="chain-box" v-click="2"><b>Slave controller</b><span>ATmega328P (U5)</span><span></span></div>
  <div class="chain-link" v-click="3"><span>I2C<br>(SDA / SCL)</span><i>→</i></div>
  <div class="chain-box" v-click="3"><b>Master controller</b><span>Arduino Uno (ATmega328P)</span><span></span></div>
</div>

<v-clicks at="4">

1. **Encoder:** turns each wheel mark into a clean pulse for the left and right wheel.
2. **Slave controller:** receives the pulses as interrupts and counts them.
3. **Master controller:** reads the counts from the slave over I2C and uses them for motion control.

</v-clicks>

---
layout: end
title: Thank You!
subtitle: e-Yantra Workshop Series · IIT Bombay
contact: "Post your queries on: support@e-yantra.org"
---

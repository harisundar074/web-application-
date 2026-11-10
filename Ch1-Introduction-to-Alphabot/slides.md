---
theme: slidev-theme-tahta
title: Introduction to Spark bot
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
routeAlias: agenda
---

<Fit>
<div class="agenda-groups">
  <div class="agenda-group">
    <div class="kicker">Introduction to Robotics</div>
    <Link to="flowchart" class="agenda-item"><div class="agenda-num">01</div><div class="agenda-topic">Flowchart</div></Link>
    <Link to="what-is-a-robot" class="agenda-item"><div class="agenda-num">02</div><div class="agenda-topic">What is a Robot?</div></Link>
    <Link to="robot-components" class="agenda-item"><div class="agenda-num">03</div><div class="agenda-topic">Major components of a robot</div></Link>
    <Link to="quick-recap" class="agenda-item"><div class="agenda-num">04</div><div class="agenda-topic">Quick recap</div></Link>
    <Link to="alphabot" class="agenda-item"><div class="agenda-num">05</div><div class="agenda-topic">Spark bot</div></Link>
  </div>
  <div class="agenda-group">
    <div class="kicker">Components on Spark bot</div>
    <Link to="sensors" class="agenda-item"><div class="agenda-num">06</div><div class="agenda-topic">Sensors</div></Link>
    <Link to="actuators" class="agenda-item"><div class="agenda-num">07</div><div class="agenda-topic">Actuators</div></Link>
    <Link to="control" class="agenda-item"><div class="agenda-num">08</div><div class="agenda-topic">Control</div></Link>
    <Link to="power" class="agenda-item"><div class="agenda-num">09</div><div class="agenda-topic">Power</div></Link>
    <Link to="communication" class="agenda-item"><div class="agenda-num">10</div><div class="agenda-topic">Communication</div></Link>
    <Link to="indicating-devices" class="agenda-item"><div class="agenda-num">11</div><div class="agenda-topic">Indicating devices</div></Link>
    <Link to="alphabot-recap" class="agenda-item"><div class="agenda-num">12</div><div class="agenda-topic">Quick recap</div></Link>
  </div>
</div>
</Fit>

<style>
.agenda-groups { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--sp-12); align-items: start; }
.agenda-group { display: flex; flex-direction: column; gap: var(--sp-3); }
.agenda-group .kicker { margin-bottom: var(--sp-2); }
.agenda-groups a.agenda-item { color: inherit; text-decoration: none; border-bottom: none; cursor: pointer; }
.agenda-groups a.agenda-item:hover .agenda-topic { color: var(--accent); }
</style>

---
title: Workshop Flowchart
kicker: Introduction to Robotics
routeAlias: flowchart
---

<div class="flow">
  <div class="flow-box" style="grid-area: 1 / 1" v-click="1">Introduction to Spark bot</div>
  <div class="flow-arrow right" style="grid-area: 1 / 2" v-click="2"></div>
  <div class="flow-box" style="grid-area: 1 / 3" v-click="2">I/O Masking</div>
  <div class="flow-arrow right" style="grid-area: 1 / 4" v-click="3"></div>
  <div class="flow-box" style="grid-area: 1 / 5" v-click="3">Motion Control</div>
  <div class="flow-arrow down" style="grid-area: 2 / 5" v-click="4"></div>
  <div class="flow-box" style="grid-area: 3 / 5" v-click="4">PWM</div>
  <div class="flow-arrow left" style="grid-area: 3 / 4" v-click="5"></div>
  <div class="flow-box" style="grid-area: 3 / 3" v-click="5">Ultrasonic Sensor</div>
  <div class="flow-arrow left" style="grid-area: 3 / 2" v-click="6"></div>
  <div class="flow-box" style="grid-area: 3 / 1" v-click="6">ADC</div>
  <div class="flow-arrow down" style="grid-area: 4 / 1" v-click="7"></div>
  <div class="flow-box" style="grid-area: 5 / 1" v-click="7">White Line Following</div>
</div>

---
title: Robot vs Machine
kicker: Introduction to Robotics
routeAlias: what-is-a-robot
class: body-top
---
<v-clicks depth="2">

- **What is a Robot?**
  - A machine that can sense, decide, and act automatically.
- **Is a washing machine a robot?**
  - It performs mechanical tasks but cannot make intelligent decisions.
- **How can we convert a washing machine into a robot?**
  - By adding sensors, controllers, and autonomous decision logic.

</v-clicks>

---
title: Difference between a robot and a machine
kicker: Introduction to Robotics
class: big-table body-top
---

| Machine | Robot |
|---|---|
| Performs mechanical work | Performs tasks automatically |
| Fixed behavior | Can adapt based on conditions |
| No sensing capability (mostly) | Uses sensors to detect environment |
| Cannot make decisions | Makes decisions based on logic/program |
| Cannot be reprogrammed | Easily reprogrammable |
| Example: Washing machine | Example: Spark bot |

---
layout: two-cols
kicker: Introduction to Robotics
routeAlias: robot-components
class: cols-center
---

<div class="lead-question">What are the Major Components needed for designing a Robot?</div>

::right::

<img class="photo photo-lg" src="./images/robot_question.jpg" alt="Robot scratching its head with a question mark" />

---
title: Major components of robot
kicker: Introduction to Robotics
class: body-top highlight-current
---

<div style="height: 2rem"></div> <!-- ← GAP between title and list: change 2rem -->

<v-clicks>

1. **Sensors:** For sensing the environment
2. **Actuators:** For movement of the robot and its parts
3. **Control:** Controller/Processor as the brain of the robot
4. **Intelligence:** User-written command(s) to perform a desired set of actions
5. **Power:** Energy required for a robot to operate and perform its tasks
6. **Communication:** Robot can talk to another robot/PC

</v-clicks>

---
title: Test your understanding
kicker: Introduction to Robotics · Quick recap
routeAlias: quick-recap
class: highlight-current quiz
---

<v-clicks>

1. What is the difference between a machine and a robot?
2. What are the major components of a robot?
3. Why do we need sensors in a robot?
4. What is the role of an actuator in a robot?

</v-clicks>

---
layout: nofit
title: Spark bot
kicker: Introduction to Robotics
routeAlias: alphabot
---

<figure class="fig">
  <img class="photo" style="height: 16.5rem; max-height: none; border-radius: 0" src="./images/sparkbot.jpg" alt="The robot: two-layer round chassis with an HC-SR04 ultrasonic sensor at the front, side IR sensors, OLED display, joystick and buzzer on the top board, and rubber wheels" /> <!-- ← image size: change 16.5rem -->
  <figcaption>Spark bot</figcaption>
</figure>

---
layout: two-cols
title: IR Proximity Sensors
kicker: Sensors on Spark bot · 1 of 4
routeAlias: sensors
class: cols-center big-points
---

<img class="photo" src="./images/spark_ir_proximity.jpg" alt="IR proximity sensors on the front of Spark bot, circled" />

::right::

<v-clicks>

1. **Transmitter:** IR LED<br>**Receiver:** Phototransistor
2. **Count on Spark Bot:** 02
   - IRP_L(Left)
   - IRP_R(Right)

3. **Connected to:** Slave controller (ATmega328P)


</v-clicks>

---
layout: two-cols
title: White Line Sensors
kicker: Sensors on Spark bot · 2 of 4
class: cols-center big-points
---

<img class="photo" src="./images/spark_white_line.jpg" alt="White line sensor array on the Spark bot base, boxed" />

::right::

<v-clicks>

1. **Transmitter:** IR LED<br>**Receiver:** Phototransistor
2. **Count on Spark Bot:** 01
3. **Connected to:** Slave controller (ATmega328P) internal ADC

</v-clicks>

---
layout: two-cols
title: Ultrasonic Sensor
kicker: Sensors on Spark bot · 3 of 4
class: cols-center big-points
---

<img class="photo" src="./images/spark_ultrasonic.jpg" alt="HC-SR04 ultrasonic sensor on the front of Spark bot, boxed" />

::right::

<v-clicks>

1. **Transmitter:** Ultrasonic wave transmitter and receiver
2. **Count on Spark bot:** 01
3. **Connected to:** Master controller (ATmega328P)

</v-clicks>

---
layout: nofit
title: Infrared TSOP Receiver
kicker: Sensors on Spark bot · 4 of 4
---

<div class="tsop-grid">
<div class="tsop-imgs">
  <img class="tsop-mod" src="./images/tsop.jpg" alt="TSOP infrared receiver module" />
  <img class="tsop-bot" v-click src="./images/spark_tsop.jpg" alt="TSOP receiver on top of Spark bot, circled" />
</div>
<div class="tsop-pts">

<v-clicks>

1. **Receiver:** TSOP IR Receiver
2. **Count on Spark Bot:** 01
3. **Connected to:** Master controller (ATmega328P)

</v-clicks>

</div>
</div>

---
layout: nofit
title: Actuators
kicker: Components on Spark bot
routeAlias: actuators
class: img-top
---

<div class="act-row">
<div class="act-text">

<v-clicks>

1. **Motor:** DC Gear Motor
2. **Connected to:** Master controller (ATmega328P)
3. **Wheel encoders:** GP2S700HCP reflective sensors
4. **Connected to:** Slave controller (ATmega328P)
5. **Count on Spark Bot:** 02 (Left and Right)

</v-clicks>

</div>
<div class="act-figs">
  <figure class="fig">
    <img class="act-img" src="./images/spark_motors.jpg" alt="Spark bot base with the two DC gear motors circled" />
    <figcaption>Motor</figcaption>
  </figure>
  <figure class="fig">
    <img class="act-img" src="./images/spark_encoder_clean.jpg" alt="Spark bot underside with the two wheel encoders circled" />
    <figcaption>Encoder</figcaption>
  </figure>
</div>
</div>

---
title: Robot control system
kicker: Components on Spark bot
routeAlias: control
---

<v-clicks>

1. **Arduino Uno: Main control board**<br>
   <span class="dim">Based on ATmega328P microcontroller; interfaces with sensors and actuators.</span>
2. **ATmega328P MCU: AVR architecture by ATMEL**<br>
   <span class="dim">Features 16 MHz clock, 32 KB flash memory, 2 KB SRAM, and 14 digital I/O pins.</span>
3. **Control Functions:**<br>
   <span class="dim">Reads sensor data, executes logic, drives motors, and communicates with peripherals.</span>

</v-clicks>

---
title: How is a robot made intelligent
kicker: Components on Spark bot
class: body-top big-list
---

<v-clicks>

1. Intelligence is achieved by implementing control logic in software.
2. The software is written in embedded C for the ATmega328P microcontroller.
3. Embedded C provides direct access to registers, ports, timers, and interrupts.
4. This enables the robot to process sensor data and generate actuator commands.

</v-clicks>

---
title: Powering the robot
kicker: Components on Spark bot
routeAlias: power
---

1. **Battery Powered:** 7.4V, 1100mAh, Li-ion battery

<div class="media-row">
  <figure class="fig">
    <img class="photo photo-md" src="./images/spark_battery.jpg" alt="18650 Li-ion cell installed in the Spark bot battery holder" />
    <figcaption>Battery</figcaption>
  </figure>
  <figure class="fig">
    <img class="photo photo-md" src="./images/battery_polarity.jpg" alt="Two Li-ion cells with positive and negative ends marked" />
    <figcaption>Battery Polarity</figcaption>
  </figure>
</div>

<v-click>

2. 5V USB battery charging port

</v-click>

---
title: Communication
kicker: Components on Spark bot
routeAlias: communication
---

<div class="comm">
  <div>
    <div class="comm-head">✔ Wired Communication <span class="dim">— between Robot and System</span></div>
    <ol><li>USB</li></ol>
  </div>
  <div v-click>
    <div class="comm-head">✔ Wireless Communication <span class="dim">— between Robot and System, and Robot and Robot</span></div>
    <ol>
      <li>XBee and Bluetooth
        <div class="thumbs">
          <img src="./images/xbee.jpg" alt="XBee module" />
          <img src="./images/bluetooth.png" alt="Bluetooth module" />
        </div>
      </li>
      <li v-click>Infrared Remote
        <div class="thumbs"><img src="./images/ir_remote.jpg" alt="Infrared remote control" /></div>
      </li>
    </ol>
  </div>
</div>

---
title: Indicating devices
kicker: Components on Spark bot
routeAlias: indicating-devices
---

<div class="cards">
  <div class="card">
    <img src="./images/oled.png" alt="1.3 inch 128x64 OLED module" />
    <div class="card-title">✔ 128x64 OLED</div>
  </div>
  <div class="card" v-click>
    <img src="./images/buzzer.jpg" alt="Buzzer" />
    <div class="card-title">✔ Buzzer</div>
  </div>
  <div class="card" v-click>
    <div class="card-title">✔ LED Array</div>
  </div>
</div>

---
title: Test your understanding
kicker: Components on Spark bot · Quick recap
routeAlias: alphabot-recap
class: body-top big-list
---

1. What sensors are available on Spark bot?
2. Why do we need a 5 white line sensor array on the robot?
3. Why do we need an ADC for interfacing the white line sensor?
4. What are the actuators used in Spark bot?

---
layout: nofit
title: Master and Slave Connections
kicker: Spark Bot · Block diagram
routeAlias: spark-connections
class: conn-slide
---

<img class="conn-fig" src="./images/spark_connections.svg" alt="Spark Bot block diagram: IR sensor array, side IR sensors, wheel encoders and battery voltage connect to the slave controller (ATmega328P), which also drives a buzzer; the ultrasonic sensor connects to the master controller (Arduino Uno); the slave sends sensor data to the master over I2C; the master drives a buzzer and the TB6612FNG motor driver, which drives the left and right motors" />

---
layout: end
title: Thank You!
subtitle: e-Yantra Workshop Series · IIT Bombay
contact: "Post your queries on: support@e-yantra.org"
---

---
theme: slidev-theme-tahta
title: Line Follower Robot
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
    <Link to="wlf" class="agenda-item"><div class="agenda-num">01</div><div class="agenda-topic">WLF sensor</div></Link>
    <Link to="controller" class="agenda-item"><div class="agenda-num">02</div><div class="agenda-topic">What is a Controller?</div></Link>
    <Link to="bangbang" class="agenda-item"><div class="agenda-num">03</div><div class="agenda-topic">Bang-Bang Controller</div></Link>
    <Link to="calibration" class="agenda-item"><div class="agenda-num">05</div><div class="agenda-topic">Calibration</div></Link>
  </div>
  <div>
    <div class="kicker">04 · PID Controller</div>
    <Link to="error" class="agenda-item"><div class="agenda-num">4.1</div><div class="agenda-topic">Error Calculation</div></Link>
    <Link to="weighted" class="agenda-item"><div class="agenda-num">4.2</div><div class="agenda-topic">Weighted Average</div></Link>
    <Link to="p" class="agenda-item"><div class="agenda-num">4.3</div><div class="agenda-topic">P Controller</div></Link>
    <Link to="pd" class="agenda-item"><div class="agenda-num">4.4</div><div class="agenda-topic">PD Controller</div></Link>
    <Link to="pid" class="agenda-item"><div class="agenda-num">4.5</div><div class="agenda-topic">PID Controller</div></Link>
    <Link to="velocity" class="agenda-item"><div class="agenda-num">4.6</div><div class="agenda-topic">Velocity Control</div></Link>
  </div>
</div>

---
title: Line Tracker Sensor
kicker: WLF sensor
routeAlias: wlf
class: lf-split
---

<div class="split">
<div class="check">
<v-clicks>

- Five line sensor - five analog outputs
- Higher infrared reflectance (in white) – larger output value
- Lower infrared reflectance (in black) – smaller output value

</v-clicks>
</div>
<img v-click="4" src="./images/ir_reflection.png" alt="IR LED light reflects from a light coloured surface back to the photodiode; a black surface absorbs it" />
</div>

---
title: WLF Sensor
kicker: WLF sensor
class: lf-wlf centered
---

<div class="wlf-grid">
<div class="check">
<v-clicks>

- CNY70 infrared reflective sensor (IR LED + photo-transistor)
- Operating voltage: 5V
- Induction distance: 0mm – 5mm
- 5 channel
- Connection - slave controller ADC channels

</v-clicks>
</div>
<img class="wlf-photo" src="./images/cny70_photo.png" alt="CNY70 reflective sensor: a small black cube with the IR LED and photo-transistor windows on top and four legs" />
</div>

---
title: What is a Controller?
kicker: What is a Controller?
routeAlias: controller
class: centered wide-gaps big-pts
---

<div class="check">
<v-clicks>

- A controller is the decision maker that constantly adjusts a system’s input based on the difference between desired and actual output.
- We will be using controller to read the position of the bot on the line and keep correcting it as it moves.
- Types of controllers: Bang-Bang Controller, PID Controller, Fuzzy Logic Controller, etc.

</v-clicks>
</div>

---
title: Using a controller
kicker: What is a Controller?
class: lf-fig
---

<img class="pwm-fig" style="height: 17rem" src="./images/controller_block.png" alt="Setpoint minus bot position gives the error; the controller outputs a power difference to the velocity controller, which sets left and right wheel PWM" />

<v-clicks>

- **Setpoint**: Desired position of the robot on the line.
- **Power Difference**: speed difference for differential stearing.

</v-clicks>

---
title: Bang Bang Controller
kicker: Bang-Bang Controller
routeAlias: bangbang
class: lf-bang
---

<div class="check">
<v-clicks>

- Five line sensor - five analog outputs
- 5 sensors data in range 0 to 1023 (Approx. 1000)
- Threshold the value to get binary result \[0 if less then 250 else 1\]
- Total $2^5$ cases

</v-clicks>
</div>

<div v-click="4" class="sensor-row bang-row">
  <div class="sbox">0</div><div class="sbox">1</div><div class="sbox">0</div><div class="sbox">0</div><div class="sbox">0</div>
</div>

<div class="check">
<v-clicks at="5">

- Some cases can be ignored *(e.g., line on both extremes, not in middle)*
- If sensors detect line on left, turn left; else if on right, turn right.
- Multiple turn intensity levels based on sensor patterns (e.g., slight right, hard right).

</v-clicks>
</div>

---
title: Error calculation
kicker: PID Controller · Error Calculation
routeAlias: error
class: lf-fig
---

<div class="lf-lead">What was the problem in previous method?</div>

<img class="pwm-fig" style="height: 15rem" src="./images/bangbang_path.png" alt="Bang-bang control: motor state flips between turn left and turn right, so the bot path zig-zags around the reference line" />

<v-clicks>

- Can we update the turning sensitivity according to the error?
- for that we need to calculate how much error is there from the center of the line

</v-clicks>

---
title: Weighted Average
kicker: PID Controller · Weighted Average
routeAlias: weighted
class: lf-wavg
---

<div class="check">
<v-clicks>

- 5 sensors data in range 0 to 1023 (Approx. 1000)
- Five detectors weight - \[0, 1000, 2000, 3000, 4000\]
- Weighted Average =

</v-clicks>
</div>

<div v-click="3" class="wavg-eq">

$$\frac{0 \times \text{value}_0 + 1000 \times \text{value}_1 + 2000 \times \text{value}_2 + 3000 \times \text{value}_3 + 4000 \times \text{value}_4}{\text{value}_0 + \text{value}_1 + \text{value}_2 + \text{value}_3 + \text{value}_4}$$

</div>

<div class="check">
<v-clicks at="4">

- Cases:

</v-clicks>
</div>

<ol class="wavg-cases">
  <li v-click="5">0 – line is on the leftmost side</li>
  <li v-click="6">2000 – line is in the middle</li>
  <li v-click="7">4000 – line is on the rightmost side</li>
</ol>

<div class="check">
<v-clicks at="8">

- simulation link: <a class="pwm-link" href="https://www.desmos.com/calculator/bhqnvzf0qs" target="_blank">https://www.desmos.com/calculator/bhqnvzf0qs</a>

</v-clicks>
</div>

---
title: Weighted Average Example
kicker: PID Controller · Weighted Average
class: lf-example
---

<div class="wex">
  <div class="wex-head">Sensor Readings</div>
  <div class="wex-row labels"><div>S1</div><div>S2</div><div>S3</div><div>S4</div><div>S5</div></div>
  <div class="wex-row boxes"><div>100</div><div>700</div><div>100</div><div>50</div><div>50</div></div>
  <div class="wex-head" v-click="1">Weights</div>
  <div class="wex-row labels" v-click="1"><div>0</div><div>1000</div><div>2000</div><div>3000</div><div>4000</div></div>
  <div class="wex-row boxes prod" v-click="2"><div>0</div><div>700000</div><div>200000</div><div>150000</div><div>200000</div></div>
</div>

<div v-click="3" class="wex-result">

**Weighted Average:** $\dfrac{1{,}700{,}000}{1000} = \boxed{1700}$

</div>

---
title: Flow for PID Controller
kicker: PID Controller · P Controller
class: lf-fig
---

<div class="stack pid-stack">
  <img v-click.hide="1" src="./images/pid_flow1.png" alt="System block: control signal u(t) in, system output y(t) out" />
  <img v-click="[1, 2]" src="./images/pid_flow2.png" alt="A comparator subtracts the output y(t) from the setpoint r(t) to give the error e(t)" />
  <img v-click="2" src="./images/pid_flow3.png" alt="PID filter: P = Kp e(t), I = Ki ∫ e dt, D = Kd de/dt are added to give u(t) for the system" />
</div>

---
title: Proportional Controller
kicker: PID Controller · P Controller
routeAlias: p
class: lf-p
---

<div class="check">
<v-clicks>

- Setpoint is 2000
- error = weighted average − 2000
- Cases:

</v-clicks>
</div>

<ol class="p-cases">
  <li v-click="4">0 – Perfectly on line or no line</li>
  <li v-click="5">positive – line is on the right side</li>
  <li v-click="6">negative – line is on the left side</li>
</ol>

<div class="check">
<v-clicks at="7">

- P_correction = error ∗ constant
- This constant is called as kp.
- simulation(luis Llamas): <a class="pwm-link" href="https://www.luisllamas.es/en/pid-controller-simulator/" target="_blank">https://www.luisllamas.es/en/pid-controller-simulator/</a>

</v-clicks>
</div>

---
title: Proportional+Derivative controller
kicker: PID Controller · PD Controller
routeAlias: pd
class: centered lf-list
---

<div class="check">
<v-clicks>

- Problem with P controller: **overshooting**
- Derivative term predicts the future error based on its **current rate of change**
- Derivative = (error − previous_error)
- The more the rate of change, the more correction it does.
- PD_correction = P_correction + (derivative ∗ constant)
- This constant is called as kd.

</v-clicks>
</div>

---
title: PID Controller
kicker: PID Controller · PID Controller
routeAlias: pid
class: centered lf-list7
---

<div class="check">
<v-clicks>

- Problem with PD controller: **steady state error**
- Integral term eliminates steady state error by considering the **cumulative sum of past errors**
- integral = (integral + error)
- The more the cumulative error, the more correction is needed
- PID_correction = PD_correction + (integral ∗ constant)
- This constant is called as ki.
- Power_Difference = P∗kp + D∗kd + I∗ki

</v-clicks>
</div>

---
title: Velocity Control
kicker: PID Controller · Velocity Control
routeAlias: velocity
class: lf-vel
---

<div class="lf-lead">Maximum - maximum velocity with which robot should travel</div>

<div class="vel-grid">
<div v-click="1" class="vel-box">

**Power Difference is positive:**

$v_l > v_r$<br>
$v_l = \text{maximum}$<br>
$v_r = \text{maximum} - \text{Power\_Difference}$

</div>
<div v-click="2" class="vel-box">

**Power Difference is negative:**

$v_l < v_r$<br>
$v_l = \text{maximum} + \text{Power\_Difference}$<br>
$v_r = \text{maximum}$

</div>
</div>

<div v-click="3" class="vel-corner">

**Corner cases:**<br>
Power_Difference < (-maximum) then v_l = 0 and v_r = maximum<br>
Power_Difference > maximum then v_l = maximum and v_r = 0

</div>

---
title: Calibration
kicker: Calibration
routeAlias: calibration
class: lf-cal
---

<v-clicks depth="2">

1. Different sensors – different results – same color and distance
2. Environmental Factors – Lighting Conditions – different results
3. We may get:
   1. Actual Min – higher than 0
   2. Actual Max – lower than 1023
4. Normalization process – linear transformation from \[Min, Max\] to the range of \[0, 1000\]
5. Calibrated value = (Value - Min) * 1000 / (Max - Min)
6. For Line switching: Calibrated value = 1000 - Calibrated value

</v-clicks>

---
layout: end
title: Thank You!
subtitle: e-Yantra Workshop Series · IIT Bombay
contact: "Post your queries on: support@e-yantra.org"
---

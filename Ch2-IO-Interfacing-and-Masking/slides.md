---
theme: slidev-theme-tahta
title: Basic I/O Interfacing with ATmega328P
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

<div class="agenda-one">
  <div class="kicker">1 · Input-Output Ports in ATmega328P</div>
  <div class="agenda-grid">
    <Link to="overview-ports" class="agenda-item"><div class="agenda-num">01</div><div class="agenda-topic">Overview of Ports</div></Link>
    <Link to="ports" class="agenda-item"><div class="agenda-num">02</div><div class="agenda-topic">Ports in ATmega328P</div></Link>
    <Link to="registers" class="agenda-item"><div class="agenda-num">03</div><div class="agenda-topic">Overview of Registers</div></Link>
    <Link to="accessing-ports" class="agenda-item"><div class="agenda-num">04</div><div class="agenda-topic">Accessing Ports</div></Link>
    <Link to="led-embedded-c" class="agenda-item"><div class="agenda-num">05</div><div class="agenda-topic">LED Interfacing using Embedded C</div></Link>
    <Link to="need-masking" class="agenda-item"><div class="agenda-num">06</div><div class="agenda-topic">Need for masking</div></Link>
    <Link to="masking-operators" class="agenda-item"><div class="agenda-num">07</div><div class="agenda-topic">Masking Operators</div></Link>
    <Link to="arduino-apis" class="agenda-item"><div class="agenda-num">08</div><div class="agenda-topic">LED Interfacing using Arduino APIs</div></Link>
  </div>
</div>

---
title: What are Ports?
kicker: Overview of Ports
routeAlias: overview-ports
---

<v-clicks depth="3">

- Junctions where peripheral devices are connected.
- Peripheral devices can be:
  1. Input Device:<br>Example: Switch, Sensors, etc...
  2. Output Device:<br>Example: Buzzer, LCD, Motors, LED, etc...

</v-clicks>

<!-- Diagram: input devices → ATmega328P → output devices (sizes: .port-diagram in style.css) -->
<div class="port-diagram">
  <div class="pd-group" v-click="3">
    <div class="pd-head">Input Devices</div>
    <div class="pd-items">
      <div class="pd-item"><Icon name="lucide:toggle-right" size="1.4em" /><span>Switch</span></div>
      <div class="pd-item"><Icon name="lucide:thermometer" size="1.4em" /><span>Sensor</span></div>
    </div>
  </div>
  <div class="pd-link" v-click="3"><span class="pd-label">Input port</span><span class="pd-arrow"></span></div>
  <div class="pd-chip" v-click="3">
    <Icon name="lucide:cpu" size="1.9em" />
    <div class="pd-chip-name">ATmega328P</div>
    <div class="pd-chip-sub">Ports B, C, D</div>
  </div>
  <div class="pd-link" v-click="4"><span class="pd-label">Output port</span><span class="pd-arrow"></span></div>
  <div class="pd-group" v-click="4">
    <div class="pd-head">Output Devices</div>
    <div class="pd-items pd-grid">
      <div class="pd-item"><Icon name="lucide:lightbulb" size="1.4em" /><span>LED</span></div>
      <div class="pd-item"><Icon name="lucide:volume-2" size="1.4em" /><span>Buzzer</span></div>
      <div class="pd-item"><Icon name="lucide:monitor" size="1.4em" /><span>LCD</span></div>
      <div class="pd-item"><Icon name="lucide:cog" size="1.4em" /><span>Motor</span></div>
    </div>
  </div>
</div>

---
title: Ports in ATmega 328P
kicker: Ports in ATmega328P
routeAlias: ports
---

<v-clicks depth="2">

- ATmega328P is a 32 pin micro-controller.
- 23 pins can be used as Input/Output pins.
- Pins are grouped together and are called as Port.
  1. ATmega 328p has two 8-bit Ports<br>Port x; &emsp;&emsp; x = B and D
  2. ATmega 328p has one 7-bit Port<br>Port C;
- All Port pins can be individually configured as Input/Output.

</v-clicks>

---
layout: two-cols
title: Arduino - ATmega 328p pin mapping
kicker: Ports in ATmega328P
class: cols-center
---

<img v-click class="photo" style="max-height: 19.5rem" src="./images/arduino_pin_mapping.png" alt="Arduino Uno Rev3 pinout showing each Arduino pin and its ATmega328P port pin" />

::right::

<v-clicks>

1. Digital I/O Pins
2. Analog Input Pins
3. Power Pins
4. Control and Reference Pins

</v-clicks>

---
title: What are Registers?
kicker: Overview of Registers
routeAlias: registers
class: main-gap
---

<v-clicks depth="2">

- A register is a temporary memory inside the microcontroller that stores one bit.
- Used by CPU to:
  1. Configure peripherals (Example: Setting pin direction)
  2. Write data to I/O pins (Example: Turning ON/OFF an LED)
  3. Read data from I/O pins (Example: Reading switch/sensor input)
- Common Registers in ATmega328P: DDRx, PORTx, PINx

</v-clicks>

---
title: Accessing Ports
kicker: Accessing Ports
routeAlias: accessing-ports
class: center-points
---

<div class="lead-line">Each Port has three associated registers with it:</div>

<div class="center-list">

<v-clicks>

1. <span class="reg-name">DDRx</span> x = B, C and D
2. <span class="reg-name">PINx</span> x = B, C and D
3. <span class="reg-name">PORTx</span> x = B, C and D

</v-clicks>

</div>

---
title: Understanding DDRx Register
kicker: Accessing Ports
class: alpha-sub title-gap
---

<v-clicks depth="2">

- Data Direction Register
- Purpose: To define Port pins as Input/Output
  1. DDRx bit = 0 → Portx pin is defined as Input.
  2. DDRx bit = 1 → Portx pin is defined as Output.
- <span class="red">Example: For Port B, make lower nibble as Input and upper nibble as Output.</span>

</v-clicks>

<RegTable v-click label="DDRB =" bits="11110000" />

<div v-click class="example-line">DDRB = 0xF0</div>

---
title: Understanding PINx Register
kicker: Accessing Ports
class: title-gap
---

<v-clicks>

1. Purpose: To read data present on Port x pins.
2. Save the value of register in a variable.
3. <span class="red">Example:<br>Read data from Port B</span>

</v-clicks>

<RegTable v-click label="PortB =" bits="11110000" prefix="P" />

<div v-click class="example-line">x = PINB<br>x = 0xF0 \\1111 0000</div>

---
title: Understanding PORTx Register
kicker: Accessing Ports
class: title-gap roomy
---

<v-clicks depth="2">

1. The **PORTx register** in the **ATmega328P** is used to control the output value of the pins and to enable or disable the internal pull-up registers for input pins.
2. It works in two cases depending on the pin configuration:
   1. **Case 1 – Output mode**
   2. **Case 2 – Input mode**

</v-clicks>

---
title: Understanding PORTx Register
kicker: Accessing Ports
class: spread
---

Case 1: &emsp; When Port x is defined as Output

<v-clicks>

1. Purpose: Send data on Port x pins
2. <span class="red">Example:</span>

</v-clicks>

<RegTable v-click label="DDRB =" bits="11111111" />

<div class="example-line"><div v-click>DDRB = 0xFF \\1111 1111</div><div v-click>PORTB = 0xFF \\1111 1111</div></div>

---
title: Understanding PORTx Register
kicker: Accessing Ports
class: spread
---

Case 2: &emsp; When Port x is defined as Input

<v-clicks>

1. Purpose: Activate/deactivate Pull-up register

</v-clicks>

<img v-click class="photo" style="height: 12rem; max-height: none; width: auto" src="./images/switch_no_pullup.jpg" alt="Switch between GND and the microcontroller pin" />

---
title: Understanding PORTx Register
kicker: Accessing Ports
class: spread
---

Case 2: &emsp; When Port x is defined as Input

1. Purpose: Activate/deactivate Pull-up register

<img class="photo" style="height: 12rem; max-height: none; width: auto" src="./images/switch_floating.jpg" alt="When switch is closed, pin is connected to ground. When switch is open, pin is in floating state" />

---
title: Understanding PORTx Register
kicker: Accessing Ports
class: spread
---

Case 2: &emsp; When Port x is defined as Input

1. Purpose: Activate/deactivate Pull-up register

<img class="photo" style="height: 14rem; max-height: none; width: auto" src="./images/switch_pullup.png" alt="With a pull-up resistor R to VCC: when switch is closed, pin is connected to ground; when switch is open, pin is connected to VCC" />

---
title: Understanding PORTx Register
kicker: Accessing Ports
class: alpha-sub
---

Case 2: &emsp; When Port x is defined as Input

<v-clicks depth="2">

1. Purpose: Activate/deactivate Pull-up register
   1. PORTx bit = 1 → Pull up is activated on Portx pin.
   2. PORTx bit = 0 → Pull up is deactivated on Portx pin.
2. <span class="red">Example:</span>

</v-clicks>

<RegTable v-click label="DDRB =" bits="00000000" />

<div class="example-line"><div v-click>DDRB = 0x00 \\0000 0000</div><div v-click>PORTB = 0xFF \\1111 1111</div><div v-click>Pull-Up is activated for all Pins of PortB.</div></div>

---
title: Examples
kicker: Accessing Ports
---

- Example 1: Make PortD as output port and send hex value 'D5'.

<v-clicks>

1. Step 1: Make Port D as Output port

</v-clicks>

<RegTable v-click label="DDRD =" bits="11111111" />

<div v-click class="example-line">DDRD = 0xFF \\1111 1111</div>

<v-clicks>

2. Step 2: Put data on the Port D

</v-clicks>

<RegTable v-click label="PORTD =" bits="11010101" />

<div v-click class="example-line">PORTD = 0xD5 \\1101 0101</div>

---
title: Examples (Cont..)
kicker: Accessing Ports
---

- Example 2: Make PortB input port with pull-up activated on all pins

<v-clicks>

1. Step 1: Make Port B as Input port

</v-clicks>

<RegTable v-click label="DDRB =" bits="00000000" />

<div v-click class="example-line">DDRB = 0x00 \\0000 0000</div>

<v-clicks>

2. Step 2: To activate Pull-up register send data on Port B

</v-clicks>

<RegTable v-click label="PORTB =" bits="11111111" />

<div v-click class="example-line">PORTB = 0xFF \\1111 1111</div>

---
title: Examples
kicker: Accessing Ports
---

- Example: Connect LEDs to lower nibble and Switches to upper nibble of PortB. Turn ON alternate LEDs (0 and 2) and activate pull-up for all switches. Read data using PIN register. What will be the content of PINB register if only the switch at pin 5 is pressed?

<img class="photo" style="max-height: 15rem" src="./images/portb_example_blank.png" alt="PINB, PORTB and DDRB registers, all empty; switches on bits 7-4 and LEDs on bits 3-0" />

---
title: Examples
kicker: Accessing Ports
---

- Step 1: Make upper nibble as Input and lower nibble as Output.

<img v-click class="photo" style="max-height: 20rem" src="./images/portb_example_step1.png" alt="DDRB = 0000 1111" />

---
title: Examples
kicker: Accessing Ports
---

- Step 2: Turn ON alternate LEDs (0 and 2) and activate pull up for Switches.

<img v-click class="photo" style="max-height: 19rem" src="./images/portb_example_step2.png" alt="PORTB = 1111 0101, DDRB = 0000 1111; LEDs 0 and 2 are ON" />

---
title: Examples
kicker: Accessing Ports
---

- Step 3: Read data from PINB. On lower nibble we will get the same data and on upper nibble depending on Switch position, data will change.

<img v-click class="photo" style="max-height: 17rem" src="./images/portb_example_step3.png" alt="PINB = 1101 0101, PORTB = 1111 0101, DDRB = 0000 1111; switch at pin 5 pressed" />

---
title: LED Interfacing on Spark bot
kicker: LED Interfacing using Embedded C
routeAlias: led-embedded-c
---

<v-clicks>

1. LED is connected to Port B pin 5 (Digital pin 13)

</v-clicks>

<img v-click class="photo" style="max-height: 11rem" src="./images/led_fritzing.png" alt="Arduino Uno with an LED and resistor connected to digital pin 13 on a breadboard" />

<v-clicks>

2. To turn ON LED: send logic HIGH on pin 5 of Port B
3. To turn OFF LED: send logic LOW on pin 5 of Port B

</v-clicks>

---
title: LED Program
kicker: LED Interfacing using Embedded C
class: title-gap roomy
---

<v-clicks>

1. Configure PB.5 pin as Output.
   <div class="example-line" style="margin-left:0">DDRB = 0x20; // 0010 0000</div>
2. To turn ON the LED set PB.5 output HIGH
   <div class="example-line" style="margin-left:0">PORTB = 0x20; // 0010 0000</div>
3. To turn OFF the LED set PB.5 output LOW
   <div class="example-line" style="margin-left:0">PORTB = 0x00; // 0000 0000</div>

</v-clicks>

---
title: Need for masking
kicker: Need for masking
routeAlias: need-masking
class: centered wide-gaps
---

<v-clicks>

1. Sometimes, we need to change the state of one or more pins of a port while keeping the rest of the pins unchanged.
2. AVR is not bit addressable.
3. No 'address' to a specific bit.

</v-clicks>

---
title: Masking Operators
kicker: Masking Operators
routeAlias: masking-operators
class: spread
---

In general, there are three operators used for masking:

<div class="check">

<v-clicks>

- OR operator → to SET a particular bit
- AND operator → to RESET a particular bit
- EXOR operator → to TOGGLE a particular bit

</v-clicks>

</div>

<div v-click>

Two more operators can be used:

- NOT operator
- Shift operators

</div>

---
title: NOT Operator
kicker: Masking Operators
class: spread
---

<v-clicks>

1. Purpose: To perform negation on all bits.
2. Symbol: ∼
3. Example:

</v-clicks>

<RegTable v-click label="A =" bits="10000011" prefix="B" />

<RegTable v-click label="∼ A =" bits="01111100" prefix="B" />

---
title: Shift Operator
kicker: Masking Operators
---

<v-clicks>

1. Purpose: To shift all bits by specified bit position.
2. Types: Left Shift and Right Shift
3. Symbol: Left shift (<<) and right shift (>>)
4. Example:

</v-clicks>

<RegTable v-click label="A =" bits="10000011" prefix="B" />

<RegTable v-click label="A<<2 =" bits="00001100" prefix="B" />

<RegTable v-click label="A>>2 =" bits="00100000" prefix="B" />

---
title: OR Operator
kicker: Masking Operators
class: spread big-truth
---

<v-clicks>

1. Purpose: To SET particular bit/s.
2. Symbol: |
3. Truth Table:

</v-clicks>

<table v-click class="truth">
  <thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead>
  <tbody>
    <tr><td>0</td><td>0</td><td>0</td></tr>
    <tr><td>0</td><td>1</td><td>1</td></tr>
    <tr><td>1</td><td>0</td><td>1</td></tr>
    <tr><td>1</td><td>1</td><td>1</td></tr>
  </tbody>
</table>

---
title: Example
kicker: Masking Operators
---

<v-clicks>

1. Example: Setting a bit :
2. Consider register has data 0x83 (unknown to us). We want to set 2nd bit of register and keep rest of the data intact.

</v-clicks>

<RegTable v-click label="REGISTER =" bits="10000011" prefix="B" />

<v-clicks>

3. Expected output is:

</v-clicks>

<RegTable v-click label="OUTPUT =" bits="10000111" prefix="B" />

---
title: Example
kicker: Masking Operators
---

<RegTable label="REGISTER =" bits="10000011" prefix="B" />

<div v-click class="op-word">OR</div>

<RegTable v-click label="MASK =" bits="00000100" prefix="B" />

<div v-click="4" class="op-word" style="font-weight:400">Output same as Expected output:</div>

<RegTable v-click="4" label="OUTPUT =" bits="10000111" prefix="B" :red="[2]" />

<v-clicks>

1. register_name = register_name | 0x04;
2. register_name |= 0x04;

</v-clicks>

---
title: Example of Masking with Shift Operator
kicker: Masking Operators
class: centered mid-gaps
---

<v-clicks>

1. <span class="mono">register_name |= 0x04;</span>
2. <span class="mono">0x04</span> can also be written as <span class="mono">1 &lt;&lt; 2</span>
3. In general, a statement can be written as:<br><span class="mono">register_name |= (1 &lt;&lt; pin_no);</span>
4. For setting multiple bits at once:<br><span class="mono">register_name |= ((1 &lt;&lt; pin_no1) | (1 &lt;&lt; pin_no2));</span>

</v-clicks>

---
title: AND Operator
kicker: Masking Operators
class: spread big-truth
---

<v-clicks>

1. Purpose: To RESET particular bit/s.
2. Symbol: &
3. Truth Table:

</v-clicks>

<table v-click class="truth">
  <thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead>
  <tbody>
    <tr><td>0</td><td>0</td><td>0</td></tr>
    <tr><td>0</td><td>1</td><td>0</td></tr>
    <tr><td>1</td><td>0</td><td>0</td></tr>
    <tr><td>1</td><td>1</td><td>1</td></tr>
  </tbody>
</table>

---
title: Example
kicker: Masking Operators
---

<v-clicks>

1. Example: Resetting a bit :
2. Consider register has data 0x87 (unknown to us). We want to reset pin 2 and keep rest of the data intact.

</v-clicks>

<RegTable v-click label="REGISTER =" bits="10000111" prefix="B" />

<v-clicks>

3. Expected output is:

</v-clicks>

<RegTable v-click label="OUTPUT =" bits="10000011" prefix="B" />

---
title: Example
kicker: Masking Operators
---

<RegTable label="REGISTER =" bits="10000111" prefix="B" />

<div v-click class="op-word">AND</div>

<RegTable v-click label="MASK =" bits="11111011" prefix="B" />

<div v-click="4" class="op-word" style="font-weight:400">Output same as Expected output:</div>

<RegTable v-click="4" label="OUTPUT =" bits="10000011" prefix="B" :red="[2]" />

<v-clicks>

1. register_name = register_name & 0xFB;
2. register_name &= 0xFB;

</v-clicks>

---
title: Example of Masking with Shift Operator
kicker: Masking Operators
class: centered mid-gaps
---

<v-clicks>

1. <span class="mono">register_name &amp;= 0xFB;</span>
2. <span class="mono">0xFB</span> can also be written as <span class="mono">~(1 &lt;&lt; 2)</span>
3. In general, a statement can be written as:<br><span class="mono">register_name &amp;= ~(1 &lt;&lt; pin_no);</span>
4. For resetting multiple bits at once:<br><span class="mono">register_name &amp;= ~((1 &lt;&lt; pin_no1) | (1 &lt;&lt; pin_no2));</span>

</v-clicks>

---
title: LED Example with Masking
kicker: Masking Operators
class: centered wide-gaps
---

1. Configure PB5 pin as Output.<br><span class="mono">DDRB |= (1 &lt;&lt; 5);</span>
2. To turn ON the LED, set PB5 output HIGH.<br><span class="mono">PORTB |= (1 &lt;&lt; 5);</span>
3. To turn OFF the LED, set PB5 output LOW.<br><span class="mono">PORTB &amp;= ~(1 &lt;&lt; 5);</span>

---
title: Arduino APIs
kicker: LED Interfacing using Arduino APIs
routeAlias: arduino-apis
class: centered wide-gaps
---

1. <span class="mono">pinMode(pin, mode)</span><br><span class="red">Pin:</span> Number of the pin whose mode we want to set.<br><span class="red">Mode:</span> <span class="mono">INPUT</span>, <span class="mono">OUTPUT</span> or <span class="mono">INPUT_PULLUP</span>.
2. <span class="mono">digitalWrite(pin, value)</span><br><span class="red">Value:</span> <span class="mono">HIGH</span> or <span class="mono">LOW</span>.
3. <span class="mono">digitalRead(pin)</span>

---
title: LED Example with Arduino
kicker: LED Interfacing using Arduino APIs
class: centered mid-gaps
---

1. Configure D13 pin as Output.
   <div class="example-line" style="margin-left:0">pinMode(13, OUTPUT);</div>
2. To turn ON the LED set D13 output HIGH
   <div class="example-line" style="margin-left:0">digitalWrite(13, HIGH);</div>
3. To turn OFF the LED set D13 output LOW
   <div class="example-line" style="margin-left:0">digitalWrite(13, LOW);</div>

---
layout: end
title: Thank You!
subtitle: e-Yantra Workshop Series · IIT Bombay
contact: "Post your queries on: support@e-yantra.org"
---

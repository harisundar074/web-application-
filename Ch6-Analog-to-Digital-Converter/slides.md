---
theme: slidev-theme-tahta
title: Using ADC on Spark bot
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
    <div class="kicker">1 · Analog to Digital Conversion</div>
    <Link to="what" class="agenda-item"><div class="agenda-num">01</div><div class="agenda-topic">What is an ADC</div></Link>
    <Link to="need" class="agenda-item"><div class="agenda-num">02</div><div class="agenda-topic">Need for ADC</div></Link>
    <Link to="sampling" class="agenda-item"><div class="agenda-num">03</div><div class="agenda-topic">Sampling</div></Link>
    <Link to="quantization" class="agenda-item"><div class="agenda-num">04</div><div class="agenda-topic">Quantization</div></Link>
    <Link to="encoding" class="agenda-item"><div class="agenda-num">05</div><div class="agenda-topic">Encoding</div></Link>
    <Link to="sar" class="agenda-item"><div class="agenda-num">06</div><div class="agenda-topic">SAR ADC</div></Link>
    <Link to="atmega-adc" class="agenda-item"><div class="agenda-num">07</div><div class="agenda-topic">ADC of ATmega328p</div></Link>
  </div>
  <div>
    <div class="kicker">2 · ADC on Spark Bot</div>
    <Link to="spark-adc" class="agenda-item"><div class="agenda-num">08</div><div class="agenda-topic">Sensor connection</div></Link>
    <Link to="internal-adc" class="agenda-item"><div class="agenda-num">09</div><div class="agenda-topic">Internal ADC</div></Link>
  </div>
</div>

---
title: What is an ADC
kicker: Analog to Digital Conversion · What is an ADC
routeAlias: what
class: adc-what
---

<div class="check">
<v-clicks>

- Converts a signal from analog (continuous) to digital (discrete) form
- It involves three steps:

</v-clicks>
</div>

<img v-click="1" class="adc-block" src="./images/adc_block.png" alt="ADC block: analog input (sine wave) into IN, digital output (square pulses) from OUT" />

<ol v-click="2" class="adc-steps">
  <li>Sampling</li>
  <li>Quantization</li>
  <li>Encoding</li>
</ol>

---
title: Why Do We Need an ADC?
kicker: Analog to Digital Conversion · Need for ADC
routeAlias: need
class: adc-need
---

<ul>
  <li v-click="1"><b>Do real-world signals come in digital form?</b><div v-click="2" class="adc-ans">most physical signals are analog.</div></li>
  <li v-click="3"><b>Can a microcontroller understand analog signals directly?</b><div v-click="4" class="adc-ans">it only understands digital values.</div></li>
  <li v-click="5"><b>Where can we commonly use ADC?</b><div v-click="6" class="adc-ans">IR sensors, temperature sensors, battery monitors, white line sensors, etc.</div></li>
  <li v-click="7"><b>Simulation Link</b><div class="adc-ans"><a class="pwm-link" href="https://www.desmos.com/calculator/aaqabmckaz" target="_blank">https://www.desmos.com/calculator/aaqabmckaz</a></div></li>
</ul>

---
title: Sampling
kicker: Analog to Digital Conversion · Sampling
routeAlias: sampling
class: adc-split adc-sampling
---

<div class="split">
<div class="check">
<v-clicks>

- Samples are discrete numbers which represent the amplitude of an input signal taken at different points in time.
- why sampling?
- Sampling holds the changing analog signal steady to ensure accurate conversion.
- Minimum Sampling rate should be twice that of the frequency of the input signal

</v-clicks>
</div>
<img v-click="5" src="./images/sampling.png" alt="Analog curve with vertical sample lines and dots taken at regular points in time" />
</div>

---
title: Quantization
kicker: Analog to Digital Conversion · Quantization
routeAlias: quantization
class: adc-split
---

<div class="split">
<div class="check">
<v-clicks>

- Continuous analog values must be represented using limited discrete output levels defined by ADC resolution.
- The analog value is rounded to the nearest available level, producing a discrete digital output depending on the resolution of the ADC.

</v-clicks>
</div>
<img v-click="3" src="./images/quantization.png" alt="Analog curve with dashed level lines; the staircase output snaps each sample to the nearest level" />
</div>

---
title: Encoding
kicker: Analog to Digital Conversion · Encoding
routeAlias: encoding
class: adc-fig
---

<div class="check">
<v-clicks>

- Encodes quantized signal into sequence of binary bits

</v-clicks>
</div>

<img v-click="2" class="pwm-fig" style="height: 19rem" src="./images/encoding.png" alt="Quantized staircase where each level is labelled with a 3-bit code from 000 to 111" />

---
title: Successive Approximation Register (SAR ADC)
kicker: Analog to Digital Conversion · SAR ADC
routeAlias: sar
class: centered wide-gaps big-pts
---

<v-clicks>

- **Step-by-Step Conversion**
- A SAR ADC is a type of Analog-to-Digital Converter that converts an analog voltage into a digital number by **guessing the answer step-by-step**, from the most significant bit **(MSB)** to the least significant bit **(LSB)**.

</v-clicks>

---
title: Successive Approximation Register (Example)
kicker: Analog to Digital Conversion · SAR ADC
class: adc-fig
---

<div class="adc-q">Q: What is the 4-bit SAR ADC digital output for a 1.7 V sampled input using a 0-4 V input range?</div>

<div class="stack sar-stack">
  <img v-click.hide="1" src="./images/sar_block.png" alt="SAR ADC: sampled value and DAC output go into a comparator; the control circuit sets the 4-bit SAR" />
  <img v-click="[1, 2]" src="./images/sar_bit1.png" alt="1st bit: SAR 1000, DAC gives 2 V, 1.7 is less, comparator 0, bit reset" />
  <img v-click="[2, 3]" src="./images/sar_bit2.png" alt="2nd bit: SAR 0100, DAC gives 1 V, 1.7 is more, comparator 1, bit set" />
  <img v-click="[3, 4]" src="./images/sar_bit3.png" alt="3rd bit: SAR 0110, DAC gives 1.5 V, 1.7 is more, comparator 1, bit set" />
  <img v-click="[4, 5]" src="./images/sar_bit4.png" alt="4th bit: SAR 0111, DAC gives 1.75 V, 1.7 is less, comparator 0, bit reset" />
  <img v-click="5" src="./images/sar_final.png" alt="Final result: SAR holds 0110" />
</div>

---
title: ADC of ATmega328p
kicker: Analog to Digital Conversion · ADC of ATmega328p
routeAlias: atmega-adc
class: centered adc-list big-pts
---

<div class="check">
<v-clicks>

- 10-bit Resolution
- Minimum voltage change $(V_{ref}/2^n)$
- 65 to 260 $\mu$s Conversion Time
- 6 Multiplexed Single Ended Input Channels 
- 0 - VCC ADC Input Voltage Range
- SAR type ADC
- ADC pins are available on PortC

</v-clicks>
</div>

---
title: How the Analog Sensors are Connected
kicker: ADC on Spark Bot · Interfacing
routeAlias: spark-adc
class: enc-slide
---

<div class="chain">
  <div class="chain-box" v-click="1"><b>Analog sensors</b><span>White line sensors (×5)<br>+ Battery voltage</span><span></span></div>
  <div class="chain-link" v-click="2"><span>Analog<br>voltage</span><i>→</i></div>
  <div class="chain-box" v-click="2"><b>Slave controller</b><span>ATmega328P (U5)<br>internal 10-bit ADC</span><span></span></div>
  <div class="chain-link" v-click="3"><span>I2C<br>(SDA / SCL)</span><i>→</i></div>
  <div class="chain-box" v-click="3"><b>Master controller</b><span>Arduino Uno (ATmega328P)</span><span></span></div>
</div>

<v-clicks at="4">

1. **No external ADC:** Spark Bot does not use a separate ADC IC.
2. **Slave controller:** converts the sensor voltages with its own internal ADC.
3. **Master controller:** reads the converted values from the slave over I2C.

</v-clicks>

---
title: Internal architecture of ADC in ATmega328P
kicker: ADC on Spark Bot · Internal ADC
routeAlias: internal-adc
class: adc-arch centered
---

<div class="arch">
<img src="./images/adc_arch.svg" alt="Inside the ATmega328P: pins ADC0 to ADC7 go to a MUX, then a Sample & Hold switch with capacitor Cs, then the 10-bit SAR ADC with Vref, giving 0 to 1023" />
<div>

<v-clicks>

1. **ADC0 – ADC7:** analog input pins.
2. **MUX:** selects one channel at a time.
3. **Sample:** switch closes, C<sub>s</sub> charges to the input.
4. **Hold:** switch opens, C<sub>s</sub> holds the voltage.
5. **SAR ADC:** converts it to a 10-bit value.

</v-clicks>

</div>
</div>

---
title: Calculation of Analog Value to Digital Value
kicker: ADC on Spark Bot · Internal ADC
class: adc-calc
---

<div class="calc-grid">
<div>

<div v-click="1" class="calc-box">

**Generic formula for ADC mapping**

$$\text{Digital value} = \frac{V_{in} \times \text{ADC resolution}}{V_{ref}}$$

</div>

<div v-click="2" class="calc-res">

**ADC resolution** $= 2^{\,\text{bits}}$

<table class="pwm-table res-table">
  <thead><tr><th>ADC</th><th>2<sup>bits</sup></th><th>Digital range</th></tr></thead>
  <tbody>
    <tr><td>8-bit</td><td>2<sup>8</sup> = 256</td><td>0 – 255</td></tr>
    <tr class="hl"><td>10-bit</td><td>2<sup>10</sup> = 1024</td><td>0 – 1023</td></tr>
    <tr><td>12-bit</td><td>2<sup>12</sup> = 4096</td><td>0 – 4095</td></tr>
  </tbody>
</table>

</div>

</div>
<div v-click="3" class="calc-ex">

**Example:** 10-bit ADC, $V_{ref} = 5$ V

<div v-click="4">

$$\frac{\textcolor{#2563eb}{1\,\text{V}} \times 1024}{5\,\text{V}} \approx \textcolor{#16a34a}{\mathbf{204}}$$

</div>
<div v-click="5">

$$\frac{\textcolor{#2563eb}{2.5\,\text{V}} \times 1024}{5\,\text{V}} = \textcolor{#16a34a}{\mathbf{512}}$$

</div>
<div v-click="6">

$$\frac{\textcolor{#2563eb}{3.3\,\text{V}} \times 1024}{5\,\text{V}} \approx \textcolor{#16a34a}{\mathbf{675}}$$

</div>
<div v-click="7">

$$\frac{\textcolor{#2563eb}{4\,\text{V}} \times 1024}{5\,\text{V}} \approx \textcolor{#16a34a}{\mathbf{819}}$$

</div>

</div>
</div>

---
layout: end
title: Thank You!
subtitle: e-Yantra Workshop Series · IIT Bombay
contact: "Post your queries on: support@e-yantra.org"
---

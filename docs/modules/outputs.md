---
title: Outputs
slug: outputs
description: How INAV controls signal outputs to ESCs and servos
---

## ESC

### ESC Protocols

INAV support the following ESC protocols:

* "standard" PWM with 50-400Hz update rate
* OneShot125
* OneShot42
* Multishot
* Brushed motors
* DSHOT150, DSHOT300, DSHOT600

ESC protocol can be selected in Configurator. No special configuration is required.

Check the ESC documentation for the list of protocols that are supported.

## Servo

By default, INAV uses 50Hz servo update rate. 
If you want to increase it, please ensure the servo supports higher update rates. 
Typically, higher end digital servos are capable of handling 200Hz and above!

### Servo Output Mapping

Not all outputs on a flight controller can be used for servo outputs - it is a hardware thing.
Always check flight controller documentation. 

:::info
While motors are usually ordered sequentially, there is no standard output layout for servos! Some boards might not support servos in _Multirotor_ configurations at all!
:::

## Modify Output Mapping

INAV 7 introduced extra functionality that let you force only some outputs to be either *MOTORS* or *SERVOS*, with some restrictions dictated by the hardware.

The main restriction is that outputs are associated with timers, which can be shared between multiple outputs. Two outputs on the same timer need to have the same function.

The easiest way to modify outputs is to use the Mixer tab in the Configurator as it will clearly show which timer is used by all outputs.
Alternatively the CLI command `timer_output_mode` can be used.

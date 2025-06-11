---
title: Gimbals
slug: gimbals
description: Support for serial gimbals
---

## Serial Gimbal
INAV 8.0 introduces support for serial Gimbals. Currently, it is compatible with the protocol used by the Walksnail GM series gimbals.

While these gimbals also support PWM as input, using the serial protocol gives it more flexibility and saves up to 4 PWM channels. 
The downside of the Serial protocol vs PWM input is that you don't have access to the full power of INAV's mixers. 
The main advantage is that you gain easy control of gimbal functions using INAV's modes.

## Axis Input
The Serial Gimbal supports 2 differents inputs.

### PWM Channels
This is the simplest way to control a gimbal as you can use your radio mixer and sliders to control the gimbal by assigning RC channels to functions in the ```Configuration``` tab. 
All 3 gimbal axis can be controlled and unlike the raw PWM input, gimbal modes are controlled by INAV modes.
This means control of the roll channel can be done as well instead of wiring 4 servo outputs. 
If a RC channel is set to 0, that input will be ignore and will be equivalent to a centered RC channel. 
So, if the serial gimbal is configured but have no rc channels RC channels assigned, it will stay centered with default sensitivity and will obey the Gimbal MODES setup in the Modes tab.

### Headtracker Input
Headtracker input is only used when you have a headtracker device configured and the ```Gimbal Headtracker``` mode is active. 
A Headtracker device is a device that transmits headtracker information by a side channel, instead of relying on your rc link.

In head tracker mode, the serial gimbal will ignore the axis rc channel inputs and replace it with the inputs coming from the Headtracker device.

## Gimbal Modes
### No Gimbal mode selected
Similar to ACRO being the default flight modes when no mode is selected, the Gimbal will default to ```FPV Mode``` or ```Follow Mode```.
The gimbal will try to stablize the footage and will follow the aircraft pitch, roll and yaw movements, and use user inputs to point the camera where the user wants.

### Gimbal Center
This locks the gimbal camera to the center position and ignores any user input. 
Useful to reset the camera if you loose orientation.

### Gimbal Headtracker
Switches inputs to the configured Headtracker device. 
If no device is configured it will behave like Gimbal Center.

### Gimbal Level Tilt
This mode locks the camera tilt (pitch axis) and keeps it level with the horizon. 
Pitching the aircraft up and down, will move the camera so it stays pointing at the horizon. 
It can be combined with ```Gimbal Level Roll```.

### Gimbal Level Roll
This mode locks the camera roll and keeps it level with the horizon. 
Rolling the aircraft will move the camera so it stays level with the horizon. 
It can be combined with ```Gimbal Level Tilt```.

## Advanced settings
The gimbal also supports some advanced settings not exposed in the configurator.

### Gimbal Trim
You can set a trim setting for the gimbal, the idea is that it will shift the notion of center of the gimbal, like a trim and let you setup a fixed camera up tilt, like you would have in a traditional fpv quad setup.

```
gimbal_pan_trim = 0
Allowed range: -500 - 500

gimbal_tilt_trim = 0
Allowed range: -500 - 500

gimbal_roll_trim = 0
Allowed range: -500 - 500
```

### Gimbal and Headtracker on a single uart
Since INAV does not process any inputs from the Walksnail Gimbal, it is possible to share the UART with the Walksnail Headtracking output by connecting the fc TX to the gimbal and RX to receive the headtracker input.
```
gimbal_serial_single_uart = OFF
Allowed values: OFF, ON
```

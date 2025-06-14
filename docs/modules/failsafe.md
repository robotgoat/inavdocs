---
title: Failsafes
slug: failsafe
description: What to do when the aircraft has a failure condition
---

A **failsafe** is a state the flight controller is meant to enter when the radio receiver loses the RC link. 
Any of these of these conditions will trigger it:

* Any flight channel (pitch, roll, throttle or yaw) sends no pulses
* Any channel is outside the valid range between `rx_min_usec` and `rx_max_usec`
* The FAILSAFE aux mode is activated

If a failsafe happens while the flight controller is disarmed, it only prevents arming. 
If a failsafe happens while armed, the failsafe policy configured in `failsafe_procedure` is engaged. 
The available procedures are:

## Failsafe Procedures

### DROP
Simply kills the motors and disarms (crash the craft).

### LAND 
(Replaces **SET-THR** from INAV 4.0) 
Performs an Emergency Landing. 
This setting enables auto-level mode (for multirotor) or enters a preconfigured roll/pitch/yaw spiral down (for airplanes). 
If altitude sensors are working, an actively controlled descent is performed using the Emergency Landing descent speed (`nav_emerg_landing_speed`). 
If altitude sensors are unavailable, descent is performed with the throttle set to a predefined value (`failsafe_throttle`). 
The descent can be limited to a predefined time (`failsafe_off_delay`) after which the craft disarms. 
This is meant to get the craft to a safe-ish landing (or more realistically, a controlled crash). 
Other than using altitude sensors for an actively controlled descent, it doesn't require any extra sensors other than basic gyros and accelerometers. 

### SET-THR (Deprecated) (Pre INAV 4.0)
Same as **LAND** except it doesn't use an Emergency Landing but is limited instead to just setting the throttle to a predefined value (`failsafe_throttle`) to perform a descent. 
It doesn't require any extra sensors other than basic gyros and accelerometers. 

### RTH (Return To Home)
One of the key features of INAV, it automatically navigates the craft back to the home position and (optionally) lands it. Similarly to all other automated navigation methods, it requires GPS for any type of craft, plus compass and barometer for multicopters. 

### NONE
Do nothing. 
This is meant to let the craft perform a fully automated flight (eg. waypoint flight) outside of radio range. Highly unsafe when used with manual flight. 

:::info
* Should the failsafe disarm the flight controller (**DROP**, **LAND/SET-THR** after `failsafe_off_delay` or **RTH** with `nav_disarm_on_landing` ON), the flight controller will be disarmed and re-arming will be locked until the signal from the receiver is restored for 30 seconds AND the arming switch is in the OFF position (when an arm switch is in use).

* Prior to starting failsafe it is checked if the throttle position has been below `min_throttle` for the last `failsafe_throttle_low_delay` seconds. 
If it was, the craft is assumed to be on the ground and is simply disarmed. 
This feature can be disabled completely by setting `failsafe_throttle_low_delay` to zero, which may be necessary to do if the aircraft has a large glide ratio (zero throttle) (eg. gliders and sailplanes).
:::

## Notes About Safety

* If the aircraft has landed but is armed, the failsafe may make the motors and props spin again and could even make the aircraft take off (in case of **RTH** failsafe). 
Take special care of this scenario when using the `MOTOR_STOP` feature. 
**Props will spin up without warning**. 
Please refer the `failsafe_throttle_low_delay` setting explained above to learn when this could happen.

* If any required navigation sensor becomes unavailable during a Return to Home (eg. loss of GPS fix), an emergency landing, as used by the **LAND** procedure, will be performed after a short timeout. 
An emergency landing will also execute right when the failsafe is triggered if any required sensor is reported as unavailable.

* The **SET-THR** (deprecated) procedure doesn't control descent in any way other than setting a fixed throttle. 
This is also the case for the **LAND** procedure when altitude sensors are unavailable. 
Thus, appropriate testing must be performed to find the right throttle value. 
Consider that a constant throttle setting will yield different thrusts depending on battery voltage, so evaluate the throttle value with a fully charged battery. 
Failure to do so may cause a flyaway.

* When the failsafe mode is aborted (RC signal restored/failsafe switch set to OFF), the current stick positions will be enforced immediately. 
Be ready to react quickly.

## RX Configuration

To engage a failsafe mode correctly, configure the receiver to do one of the following on signal loss:

* Send no signal/pulses over the channels
* Send an invalid signal over the channels (for example, send values lower than `rx_min_usec`)
* Set an aux channel to engage FAILSAFE mode.
* Ensure the receiver does not set any aux channel triggering an accidental disarm.

## Failsafe Settings

Failsafe delays are configured in 0.1 second units. Distances are in centimeters (1/100 of a meter).

### Parameters relevant to all failsafe procedures

#### `failsafe_procedure`

Selects the failsafe procedure. Valid procedures are **DROP**, **LAND/SET-THR**, **RTH** and **NONE**. See above for a description of each one.

#### `failsafe_delay`

Guard time for failsafe activation when rx channel data is lost or invalid.  This is the amount of time the flight controller waits to see if it begins receiving a valid signal again before activating failsafe. Does not apply when activating the FAILSAFE aux mode.

#### `failsafe_recovery_delay`

Guard time for failsafe de-activation after signal is recovered.  This is the amount of time the flight controller waits to see if the signal is consistent before turning off failsafe procedure. Usefull to avoid swithing in and out of failsafe RTH. Does not apply when disactivating the FAILSAFE aux mode.

#### `failsafe_stick_threshold`

This parameter defines recovery from failsafe by stick motion. When set to zero failsafe procedure will be cleared as soon as RC link is recovered. When this is set to a non-zero value - failsafe won't clear immediately when if RC link is recovered, you will have to move any of Roll/Pitch/Yaw sticks more than this value to exit failsafe.

The use-case is the Return To Home failsafe: when on the edge of radio coverage you may end up entering and exiting failsafe if radio link is sporadic - happens a lot with long-range pilots. Setting `failsafe_stick_threshold` to a certain value (i.e. 100) RTH will be initiated on first signal loss and will continue as long as pilots want it to continue. When RC link is solid (based on RSSI etc) pilot will move sticks and regain control.

#### `failsafe_throttle_low_delay`

Time throttle level must have been below 'min_throttle' to _only disarm_ instead of _full failsafe procedure_. Set to zero to disable.

#### `failsafe_min_distance`

If failsafe happens when craft is closer than this distance in centimeters from home, failsafe will not execute regular failsafe_procedure, but will execute procedure specified in failsafe_min_distance_procedure instead. 0 = Normal failsafe_procedure always taken.

#### `failsafe_min_distance_procedure`

What failsafe procedure to initiate in Stage 2 when craft is closer to home than failsafe_min_distance.

#### `rx_min_usec`

The lowest channel value considered valid.

#### `rx_max_usec`

The highest channel value considered valid.

### Parameters relevant to **RTH** failsafe procedure

#### `nav_min_rth_distance`

If the failsafe happens while the craft is within this distance from the home position, the home position is considered immediately reached.

#### `nav_rth_climb_first`

If ON the craft rises to `nav_rth_altitude` before heading to home position. if OFF the craft climbs on the way to home position.

#### `nav_rth_climb_ignore_emerg`

When this option is OFF (default) and when you initiate RTH without GPS fix - aircraft will initiate emergency descent and go down. If you set this option to ON - aircraft will reach the RTH target altitude before initiating emergency descent. This is done for cases where GPS coverage is poor (i.e. in the mountains) - allowing UAV to climb up might improve GPS coverage and allow safe return instead of landing in a place where UAV might be impossible to recover.

#### `nav_rth_tail_first`

Only relevant for multirotors. If this is OFF the craft will head to home position head first, if ON it'll be tail first

#### `nav_rth_altitude`

The altitude used as reference for the RTH procedure.

#### `nav_rth_alt_mode`

How and when to reach `nav_rth_altitude`. Please read [the page on the wiki](https://github.com/iNavFlight/inav/wiki/Navigation-modes#rth-altitude-control-modes) for a description of the available modes.

#### `nav_rth_abort_threshold`

If the craft increases its distance from the point the failsafe was triggered first by this amount, RTH procedure is aborted and an emergency landing is initiated. It's meant to avoid flyaways due to navigation issues, like strong winds.

#### `nav_rth_allow_landing`

Enables landing when home position is reached. If OFF the craft will hover indefinitely over the home position.

#### `nav_disarm_on_landing`

Instructs the flight controller to disarm the craft when landing is detected

### Parameters relevant to **LAND/SET-THR** failsafe procedure

#### `failsafe_off_delay`

Delay after failsafe activates before motors finally turn off.  This is the amount of time 'failsafe_throttle' is active.  If you fly at higher altitudes you may need more time to descend safely. Set to zero to keep `failsafe_throttle` active indefinitely.

#### `nav_emerg_landing_speed`

(**LAND** only) Actively controlled descent speed when altitude sensors are available. If altitude sensors aren't available landing descent falls back to using the fixed thottle setting `failsafe_throttle` so ensure this is also set correctly.

#### `failsafe_throttle`

Throttle level used for landing.  Specify a value that causes the aircraft to descend at about 1M/sec. Default is set to 1000 which should correspond to throttle off.

#### `failsafe_fw_roll_angle`

This parameter defines the amount of roll angle (in 1/10 deg units) to execute on failsafe. Negative = LEFT

#### `failsafe_fw_pitch_angle`

This parameter defines the amount of pitch angle (in 1/10 deg units) to execute on failsafe for an airplane. Negative = CLIMB

#### `failsafe_fw_yaw_rate`

This parameter defines the amount of yaw rate (in deg per second units) to execute on failsafe for an airplane. Negative = LEFT


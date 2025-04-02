---
title: Release Notes
slug: releasenotes
sidebar_position: 2
---

# INAV 8.0.1 - Gallant Goshawk

![INAV 8.0.1 Gallant Goshawk](/img/inav_banner.png)

Please carefully read the release notes for the best possible experience and safety.

Contact other pilots, share experiences, suggestions and ask for help on:

[put social cards here]

:::info
INAV 8 no longer includes F411 targets as part of the official release. 
:::

:::note
GPS: ```UBLOX7``` and ```UBLOX``` have been merged into a single ```UBLOX``` option, and units with older firmware are now deprecated. Only M8 and newer will be supported in the future.
:::

:::warning
Make sure to remove props and check your motor and servo outputs before powering your upgraded flight controller with a battery for the first time. The changes to enable flexible motor and servo allocation may change what outputs your configuration uses by default.
:::

## Known Issues in 8.0

- see github

## Upgrading from a previous release

### Upgrading from INAV 7.0 and 7.1

1. Backup configuration with CLI `diff all` command
4. Download and install the new [INAV Configurator 8.0](https://github.com/iNavFlight/inav-configurator/releases)
5. Flash INAV 8.0 **WITH** _Full Chip Erase_ option enabled 
6. Edit the 7.x diff and apply Diff breaking changes described below, and save it as your new inav 8 diff. See **Diff breaking changes** section below.
7. Select _Keep current settings_ from the defaults pop-up
8. Go to CLI and restore your edited inav diff
9. Done

### Upgrading from older versions

## Highlights

### Geozones
The Geozone feature allows pilots to define one or multiple areas on the map in Mission Control, to prevent accidental flying outside of allowed zones (Flight-Zones, FZ) or to avoid certain areas they are not allowed or not willing to fly in (No-Flight-Zone, NFZ). This type of feature might be known to many pilots as a "Geofence" and despite providing the same core functionality, INAV Geozones are significantly more versatile and provide more safety and features. [Read the Documentation for more info](https://github.com/iNavFlight/inav/blob/master/docs/Geozones.md)
IMPORTANT: Geozones will not be available for STM32F722 based Flight Controllers due to insufficient flash storage. 

### GPS Fix estimation (dead reckoning, RTH without GPS fix) for Airplanes
This new feature allows INAV to return to its launch location, in case of a failed GPS due to hardware failure or interference. INAV will use the remaining sensors and the already calculated wind speed and direction, to blindly return towards the home location. For this feature, no extra sensors are strictly necessary, aside from the standard Accelerometer, Gyroscope and Barometer, but its highly recommended to have a compass and for best precision, to also have an Airspeed sensor. The feature will not be able to precisely return to the pilot, but it allows the Aircraft to either get out of an area with interferences, or to give the pilot time and a chance to regain control for a manual return, when the aircraft is closer. [Details here](https://github.com/iNavFlight/inav/blob/master/docs/GPS_fix_estimation.md)

### MSP-Linkstats
A new MSP Message that allows RC links that communicate with the Flight controller via MSP, to provide Link Information to INAV like LQ, RSSI, Power Level, SNR and more. The first RC Link to support this is the [mLRS Project](https://github.com/olliw42/mLRS) with more possibly coming in the future. [Details here](https://github.com/iNavFlight/inav/pull/10451)

### MSP-VTX
MSP-VTX has been updated by @geoffsim  to increase compatibility with HDZero vtxs.

### Mavlink Advancement for MavlinkRC
The previously simple Mavlink Telemetry was extended to be compatible with flow control capable links (Thanks @MUSTARDTIGERFPV). This now allows RC Control via Mavlink and Telemetry at the same time over a Single UART. It is tested successfully with [ELRS Mavlink-RC](https://www.expresslrs.org/software/mavlink/) and [mLRS Mavlink](https://github.com/olliw42/mLRS). Additionally it allows the Use of [Mission Planner](https://ardupilot.org/planner/), [QGroundControl](https://qgroundcontrol.com/) and potentially other GCS Applications to be used for Flight Monitoring with INAV. 
Note: To receive RSSI and LQ for ELRS Mavlink-RC you need to `set mavlink_radio_type=ELRS` in the CLI. [Details here](https://github.com/iNavFlight/inav/pull/10222)

### Walksnail Serial Gimbal and Headtracker support
INAV now also supports the Caddx / Walksnail GM Series Gimbals. These can now be controlled via a dedicated uart UART or via MSP and don't need up to 3 PWM Outputs anymore. This enables the direct Gimbal Control via Head Tracking from Walksnail goggles, without additional wiring. [Details Here](https://github.com/iNavFlight/inav/pull/10109)

### OSD Updates
- Users can change the precision (amount of decimal places) for Altitude and Distance https://github.com/iNavFlight/inav/pull/10431
- Enhancements for Custom OSD Elements https://github.com/iNavFlight/inav/pull/10282
- Update arming screen for better space utilisation https://github.com/iNavFlight/inav/pull/10300 
- OSD system message improvements https://github.com/iNavFlight/inav/pull/10090
- Better organisation of the post flight stats screen with more stats available https://github.com/iNavFlight/inav/pull/9617

### ADSB Receiver Support
It is now possible to connect an ADSB receiver to your flight controller and get OSD Warnings if any ADSB enabled Aircraft, is close by. INAV Configurator can show these Aircraft on the map for additional safety of UAV flights. ADSB is supported for generally available receivers like uAvionix pingRX (not tested) and Aerobit TT-SC1 (tested) and should also work with the upcoming [PicoADSB](https://picoadsb.com/) [Details here](https://github.com/iNavFlight/inav/pull/9355)

### I-Term Lock for Fixed Wing
The Fixed Wing PIDFF Controller was reworked. The PIDs are now attenuated based in the amount of Setpoint (Stick deflection in Acro Mode) for a more "Manual" flight feel during aggressive inputs while keeping the locked in feel of a PID-Assisted flight. This allows the Pilot to have a PID tune with very high P and I values for a locked in flight feel, while keeping a good manual feeling of the plane's flight characteristics, especially when flying slow. Additionally the Attenuation fixes the Bounce-Back caused by the Integral of the PID controller, after sharp roll or pitch inputs. [Details Here](https://github.com/iNavFlight/inav/pull/9905)

### U-Blox AssistNow Support in INAV Configurator
AssistNow is a Service that provides GPS Satellite information data for offline-applications, to dramatically increase the time to fix for GPS Devices. By Providing your own AssistNow Token, INAV Configurator can automatically download the latest data set and transfer it to any connected INAV UAV. With this, a GPS fix after cold start should merely take seconds instead of minutes. This is especially helpful for people who go fly with a big fleet of aircraft. [Details here](https://github.com/iNavFlight/inav-configurator/pull/2123)

### Sensor ID change for SmartPort telemetry
The sensor IDs for the Modes and GNSS data have changed in SmartPort telemetry. The default settings in INAV are to now use the new sensor IDs. The INAV [OpenTX-Telemetry-Widget](https://github.com/iNavFlight/OpenTX-Telemetry-Widget/pull/141) has been updated to use these new IDs. So you will not see any issues when using the latest version of this widget. However, if you use another widget or app that uses the SmartPort telemetry. It is recommended to inform the creator of the app/widget, as **the old sensor IDs will be removed in INAV 10.0.0**. [Details here](https://github.com/iNavFlight/inav/pull/9868)

You can change INAV to use the old sensor IDs with the CLI parameter `set frsky_use_legacy_gps_mode_sensor_ids = on`. However, it is recommended to only use this only as long as necessary. This parameter will also be removed in INAV10.0.0.

### Improved SD Card support for F7 and H7 flight controllers using SDIO
This version of INAV fixes some long standing bugs with the SDIO driver for H7 and F765 flight controllers. Now they share the same HAL based driver and fixes.
This affects a small number of targets, as most targets use the older and slower SPI based access to SD cards.
Moving forward, SDIO is the preferred and recommend way to implement SD Card blackbox in INAV, as it is faster than SPI and support up to 4BIT wide data access, versus SPI 1 bit.

This change affects the following targets:

* FLYWOOH743PRO
* IFLIGHT_BLITZ_H7_PRO
* KAKUTEH7WING
* MATEKF765
* MATEKH743
* MICOAIR743
* NEUTRONRCH7BT
* PIXRACER
* TBS_LUCID_H7

### DJI O4 support
DJI released a new air unit, and while rumors suggested it would include full INAV font support, that is unfortunately not true with the released firmware.  There is also a bug on DJI firmware that prevents it from detecting when the flight controller is armed and leaves the air unit stuck in low power mode.

There are two possible workaround for the arming issues:
1. Turn off low power mode This should work with older INAV versions as well
2. On INAV 8.0.0, you can type this on the cli: ```set enable_broken_o4_workaround = ON```

With the added workarounds, setup in INAV should be the same as O3.

### Other important changes: 
- Multirotor inverted crash detection https://github.com/iNavFlight/inav/pull/10099
- Waypoint tracking improvements https://github.com/iNavFlight/inav/pull/10278 (Note usage change for `nav_fw_wp_tracking_accuracy` may require change of setting)
- Fixed wing altitude velocity control https://github.com/iNavFlight/inav/pull/9471 (see know issues above related to this change)

### Breaking Changes

These changes to the firmware will likely break your settings from an earlier version < `8.x.x`.

### Profile Consolidation
The `profile` CLI command has been renamed to `control_profile`. 
When updating from an older version of INAV, you will need to edit your `diff` with these changes:

In INAV version < 8
```
# profile
profile 1

set fw_p_pitch = 14
set fw_i_pitch = 5
set fw_d_pitch = 5
set fw_ff_pitch = 137
...
```
Will become
```
# profile
control_profile 1

set fw_p_pitch = 14
set fw_i_pitch = 5
set fw_d_pitch = 5
set fw_ff_pitch = 137
...
```

### OSD Custom Elements
If you have previously used OSD Custom Elements. You will need to update the diff for these, so that they continue to work in the same way. The system has been expanded to allow the use of logic condition results and have more numerical variations. To keep your OSD Custom Elements working, you will need to change the element type IDs, if they are 4, 5, 6, or 7. The table below shows the old and new IDs.

| Numeric format | Old name                                                        | Old ID | New name                                                 | New ID |
|-------------------|--------------------------------------------------|--------|----------------------------------------------|----------|
| 000                     | CUSTOM_ELEMENT_TYPE_GV_SMALL            | 6         | CUSTOM_ELEMENT_TYPE_GV_3                | 7           |
| 00000                 | CUSTOM_ELEMENT_TYPE_GV                         | 4         | CUSTOM_ELEMENT_TYPE_GV_5                | 9           |
| 0.0                      | CUSTOM_ELEMENT_TYPE_GV_SMALL_FLOAT | 7         | CUSTOM_ELEMENT_TYPE_GV_FLOAT_1_1 | 10           |
| 0000.0                | CUSTOM_ELEMENT_TYPE_GV_FLOAT             | 5         | CUSTOM_ELEMENT_TYPE_GV_FLOAT_4_1 | 16         |

Below, you can see the position of the IDs that you need to change if they are 4, 5, 6, or 7.

```
osd_custom_elements 0 3 0 1 0 0 0 0 0 "FLAPS"
                      ^   ^   ^
```

## CLI

### New / Changed Items

| Name | Description |
| ---- | ------ |
| `geozone` | Manages the geozone data set |
| `control_profile` | `profile` has been renamed to `control_profile` |

### Changed Settings

| Name | Values |
| ---- | ------ |
| `blackbox_device` | New: `FILE`  (for `SITL` usage) |
| `debug_modes` | New: `ADAPTIVE_FILTER`, `HEADTRACKER`, `GPS`, `LULU`, `SBUS2` |
| `dynamic_gyro_notch_mode` | Removed: `3D_R`, `3D_P`, `3D_Y`, `3D_RP`, `3D_RY`, `3D_PY` |
| `filter_type_full` | New: `LULU` |
| `gps_dyn_model` | New: `SEA`, `MOWER` |
| `gps_provider` | Removed: `UBLOX7` (Use `UBLOX`; version  specific capabilities will be auto-detected) |
| `nav_fw_wp_tracking_accuracy` | Now set distance from waypoint course line in meters rather some arbitrary tracking response value |
| `rangefinder_hardware` | New: `TERARANGER_EVO`, `USD1_V0`, `NRA` |
| `serial_rx` | New: `SBUS2` |

### New Settings

| Name | Description |
| ---- | ------ |
| `disarm_always` | When you switch to Disarm, do so regardless of throttle position. If this Setting is `OFF`. It will only disarm only when the throttle is low. This is similar to the previous `disarm_kill_switch` option. Default setting is the same as the old default behaviour. Default: TRUE |
| `enable_broken_o4_workaround` | DJI O4 release firmware has a broken MSP DisplayPort implementation. This enables a workaround to restore ARM detection. Default: FALSE |
| `ez_snappiness` | EzTune snappiness Values: 0 - 100 Default: 0 |
| `failsafe_gps_fix_estimation_delay` | Controls whether waypoint mission is allowed to proceed with gps fix estimation. Sets the time delay in seconds between gps fix lost event and RTH activation. Minimum delay is 7 seconds. If set to -1 the mission will continue until the end. With default setting(7), waypoint mission is aborted and switched to RTH with 7 seconds delay. RTH is done with GPS Fix estimation. Values: -1 - 600 Default: 7 |
| `frsky_use_legacy_gps_mode_sensor_ids` | S.Port telemetry: If `ON`, send the legacy telemetry IDs for modes (Tmp1) and GNSS (Tmp2). These are old IDs, deprecated, and will be removed in INAV 10.0. Tools and scripts using these IDs should be updated to use the new IDs of **470** for Modes and **480** for GNSS. Default: 'OFF' Default: FALSE |
| `fw_iterm_lock_engage_threshold` | Defines error rate (in percents of max rate) when Iterm Lock is engaged when sticks are release. Iterm Lock will stay active until error drops below this number Values: 5 - 25 Default: 10 |
| `fw_iterm_lock_rate_threshold` | Defines rate percentage when full P I and D attenuation should happen. 100 disables Iterm Lock for P and D term Values: 10 - 100 Default: 40 |
| `fw_iterm_lock_time_max_ms` | Defines max time in milliseconds for how long ITerm Lock will shut down Iterm after sticks are release Values: 100 - 1000 Default: 500 |
| `geozone_avoid_altitude_range` | Altitude range in which an attempt is made to avoid a geozone upwards Values: 0 - 1000000 Default: 5000 |
| `geozone_detection_distance` | Distance from which a geozone is detected Values: 0 - 1000000 Default: 50000 |
| `geozone_mr_stop_distance` | Distance in which multirotors stops before the border Values: 0 - 100000 Default: 15000 |
| `geozone_no_way_home_action` | Action if RTH with active geozones is unable to calculate a course to home (`RTH`, `EMRG_LAND`). Default: RTH |
| `geozone_safe_altitude_distance` | Vertical distance that must be maintained to the upper and lower limits of the zone. Values: 0 - 10000 Default: 1000 |
| `geozone_safehome_as_inclusive` | Treat nearest safehome as inclusive geozone Default: FALSE |
| `geozone_safehome_zone_action` | Fence action for safehome zone (`NONE`, `AVOID`, `POS_HOLD`, `RTH`). Default: NONE |
| `gimbal_pan_channel` | Gimbal pan rc channel index. 0 is no channel. Values: 0 - 32 Default: 0 |
| `gimbal_pan_trim` | Trim gimbal pan center position. Values: -500 - 500 Default: 0 |
| `gimbal_roll_channel` | Gimbal roll rc channel index. 0 is no channel. Values: 0 - 32 Default: 0 |
| `gimbal_roll_trim` | Trim gimbal roll center position. Values: -500 - 500 Default: 0 |
| `gimbal_sensitivity` | Gimbal sensitivity is similar to gain and will affect how quickly the gimbal will react. Values: -16 - 15 Default: 0 |
| `gimbal_serial_single_uart` | Gimbal serial and headtracker device share same UART. FC RX goes to headtracker device, FC TX goes to gimbal. Default: FALSE |
| `gimbal_tilt_channel` | Gimbal tilt rc channel index. 0 is no channel. Values: 0 - 32 Default: 0 |
| `gimbal_tilt_trim` | Trim gimbal tilt center position. Values: -500 - 500 Default: 0 |
| `gyro_adaptive_filter_hpf_hz` | High pass filter cutoff frequency Values: 1 - 50 Default: 10 |
| `gyro_adaptive_filter_integrator_threshold_high` | High threshold for adaptive filter integrator Values: 1 - 10 Default: 4 |
| `gyro_adaptive_filter_integrator_threshold_low` | Low threshold for adaptive filter integrator Values: -10 - 0 Default: -2 |
| `gyro_adaptive_filter_max_hz` | Maximum frequency for adaptive filter Values: 0 - 505 Default: 150 |
| `gyro_adaptive_filter_min_hz` | Minimum frequency for adaptive filter Values: 0 - 250 Default: 50 |
| `gyro_adaptive_filter_std_lpf_hz` | Standard deviation low pass filter cutoff frequency Values: 0 - 10 Default: 2 |
| `gyro_adaptive_filter_target` | Target value for adaptive filter Values: 1 - 6 Default: 3.5 |
| `gyro_filter_mode` | Specifies the type of the software LPF of the gyro signals (`OFF`, `STATIC`, `DYNAMIC`, `ADAPTIVE`). Default: STATIC |
| `gyro_lulu_enabled` | Enable/disable gyro LULU filter Default: FALSE |
| `gyro_lulu_sample_count` | Gyro lulu sample count, in number of samples. Values: 1 - 15 Default: 3 |
| `headtracker_pan_ratio` | Head pan movement vs camera movement ratio Values: 0 - 5 Default: 1 |
| `headtracker_roll_ratio` | Head roll movement vs camera movement ratio Values: 0 - 5 Default: 1 |
| `headtracker_tilt_ratio` | Head tilt movement vs camera movement ratio Values: 0 - 5 Default: 1 |
| `headtracker_type` | Type of headtracker dervice (`NONE`, `SERIAL`, `MSP`). Default: NONE |
| `inav_allow_gps_fix_estimation` | Defines if inav will estimate GPS fix with magnetometer and barometer on GPS outages. Enables navigation and RTH without GPS fix on fixed wing. Also see failsafe_gps_fix_estimation_delay. Default: FALSE |
| `inav_default_alt_sensor` | Sets the default altitude sensor to use (`GPS`, `BARO`, `GPS_ONLY`, `BARO_ONLY`). Settings GPS and BARO always use both sensors unless there is an altitude error between the sensors that exceeds a set limit. In this case only the selected sensor will be used while the altitude error limit is exceeded. GPS error limit = 2 * inav_max_eph_epv. BARO error limit = 4 * inav_baro_epv. Settings GPS_ONLY and BARO_ONLY will use only the selected sensor even if the other sensor is working. The other sensor will only be used as a backup if the selected sensor is no longer available to use. Default: GPS |
| `inav_w_z_baro_v` | Weight of barometer climb rate measurements in estimated climb rate. Setting is used on both airplanes and multirotors. Values: 0 - 10 Default: 0.1 |
| `mavlink_min_txbuffer` | Minimum percent of TX buffer space free, before attempting to transmit telemetry. Requuires RADIO_STATUS messages to be processed. 0 = always transmits. Values: 0 - 100 Default: 33 |
| `mavlink_radio_type` | Mavlink radio type (`GENERIC`, `ELRS`, `SIK`). Affects how RSSI and LQ are reported on OSD. Default: GENERIC |
| `nav_fw_alt_control_response` | Adjusts the deceleration response of fixed wing altitude control as the target altitude is approached. Decrease value to help avoid overshooting the target altitude. Values: 5 - 100 Default: 40 |
| `nav_fw_auto_climb_rate` | Maximum climb/descent rate that UAV is allowed to reach during navigation modes. [cm/s] Values: 10 - 2000 Default: 500 |
| `nav_fw_launch_wiggle_to_wake_idle` | Trigger the idle throttle by wiggling the plane. 0 = disabled. 1 and 2 signify 1 or 2 yaw wiggles to activate. 1 wiggle has a higher detection point, for airplanes without a tail. 2 wiggles has a lower detection point, but requires the repeated action. This is intended for larger models and airplanes with tails. Values: 0 - 2 Default: 0 |
| `nav_fw_manual_climb_rate` | Maximum climb/descent rate firmware is allowed when processing pilot input for ALTHOLD control mode [cm/s] Values: 10 - 2500 Default: 300 |
| `nav_fw_pos_z_ff` | FF gain of altitude PID controller (Fixedwing) Values: 0 - 255 Default: 10 |
| `nav_mc_auto_climb_rate` | Maximum climb/descent rate that UAV is allowed to reach during navigation modes. [cm/s] Values: 10 - 2000 Default: 500 |
| `nav_mc_inverted_crash_detection` | Setting a value > 0 enables inverted crash detection for multirotors. It will auto disarm in situations where the multirotor has crashed inverted on the ground and can't be manually disarmed due to loss of control or for some other reason. When enabled this setting defines the additional number of seconds before disarm beyond a minimum fixed time delay of 3s. Requires a barometer to work. Values: 0 - 15 Default: 0 |
| `nav_mc_manual_climb_rate` | Maximum climb/descent rate firmware is allowed when processing pilot input for ALTHOLD control mode [cm/s] Values: 10 - 2000 Default: 200 |
| `osd_adsb_distance_alert` | Distance inside which ADSB data flashes for proximity warning Values: 1 - 64000 Default: 3000 |
| `osd_adsb_distance_warning` | Distance in meters of ADSB aircraft that is displayed Values: 1 - 64000 Default: 20000 |
| `osd_adsb_ignore_plane_above_me_limit` | Ignore adsb planes above, limit, 0 disabled (meters) Values: 0 - 64000 Default: 0 |
| `osd_decimals_altitude` | Number of decimals for the altitude displayed in the OSD [3-5]. Values: 3 - 5 Default: 3 |
| `osd_decimals_distance` | Number of decimals for distance displayed in the OSD [3-5]. This includes distance from home, total distance, and distance remaining. Values: 3 - 5 Default: 3 |
| `osd_estimations_wind_mps` | Wind speed estimation in m/s Default: FALSE |
| `osd_highlight_djis_missing_font_symbols` | Show question marks where there is no symbol in the DJI font to represent the INAV OSD element's symbol. When off, blank spaces will be used. Only relevent for DJICOMPAT modes. Default: TRUE |
| `osd_radar_peers_display_time` | Time in seconds to display next peer  Values: 1 - 10 Default: 3 |
| `osd_stats_show_metric_efficiency` | Enabling this option will show metric efficiency statistics on the post flight stats screen. In addition to the efficiency statistics in your chosen units. Default: FALSE |

### Removed Settings

| Name | Description |
| ---- | ------ |
| `control_deadband` |  |
| `cpu_underclock` |  |
| `disarm_kill_switch` |  |
| `dji_workarounds` |  |
| `fw_iterm_limit_stick_position` |  |
| `gyro_anti_aliasing_lpf_type` |  |
| `gyro_hardware_lpf` |  |
| `gyro_main_lpf_type` |  |
| `gyro_use_dyn_lpf` |  |
| `inav_use_gps_no_baro` |  |
| `inav_use_gps_velned` |  |
| `ledstrip_visual_beeper` |  |
| `max_throttle` |  |
| `nav_auto_climb_rate` |  |
| `nav_manual_climb_rate` |  |
| `osd_stats_min_voltage_unit` |  |
| `pidsum_limit` |  |
| `pidsum_limit_yaw` |  |

### Summary of Changes
* GPS Fix estimation (dead reconing, RTH without GPS fix) for fixed wing by @RomanLut in https://github.com/iNavFlight/inav/pull/8347
* Boards.md: Add link to full list of boards by @sensei-hacker in https://github.com/iNavFlight/inav/pull/9509
* Dzikuvx 7.1 mergeback 1 by @DzikuVx in https://github.com/iNavFlight/inav/pull/9550
* Skip release for all F411 boards by @DzikuVx in https://github.com/iNavFlight/inav/pull/9542
* INAV 8 version bump by @DzikuVx in https://github.com/iNavFlight/inav/pull/9543
* WP mission mode RTH and Manual mode lockout improvements by @breadoven in https://github.com/iNavFlight/inav/pull/9551
* update toolchain to gcc13.2 by @stronnag in https://github.com/iNavFlight/inav/pull/9579
* Update SPEEDYBEEF405V3.md by @mmosca in https://github.com/iNavFlight/inav/pull/9577
* Correct wrong writing by @JulioCesarMatias in https://github.com/iNavFlight/inav/pull/9568
* SITL: allow simulating airspeed sensor in SITL with HITL plugin by @RomanLut in https://github.com/iNavFlight/inav/pull/9570
* [RTH TrackBack] Create .c and .h files for this feature by @JulioCesarMatias in https://github.com/iNavFlight/inav/pull/9429
* increase default nav_cruise_yaw_rate to 60 deg/s by @DzikuVx in https://github.com/iNavFlight/inav/pull/9597
* optimize at32 adc sample time make the current meter accure by @shanggl in https://github.com/iNavFlight/inav/pull/9578
* Separate the nav climb rate settings for fw and mc by @shota3527 in https://github.com/iNavFlight/inav/pull/9424
* Added Compass Calibration programmable operation by @sdellava in https://github.com/iNavFlight/inav/pull/9411
* bf2inav.py: clearer error messages, number PWM outputs by @sensei-hacker in https://github.com/iNavFlight/inav/pull/9611
* Update GPS_fix_estimation.md by @sys512 in https://github.com/iNavFlight/inav/pull/9622
* [docs] update dbg-tool link in serial_printf_debugging.md by @stronnag in https://github.com/iNavFlight/inav/pull/9639
* aligned KAKUTEH7WING target with manufacturer docs by @paulwrath1223 in https://github.com/iNavFlight/inav/pull/9640
* Add support for SKYSTARSF722HDPRO by @DusKing1 in https://github.com/iNavFlight/inav/pull/9630
* Adsb support pingRX  / Aerobit TT-SC1 by @error414 in https://github.com/iNavFlight/inav/pull/9355
* Update [ESC and servo outputs.md] remove output_mode by @RoboSchmied in https://github.com/iNavFlight/inav/pull/9691
* Add GEPRCF405_BT_HD by @YI-BOYANG in https://github.com/iNavFlight/inav/pull/9683
* Small changes to timer output docs by @mmosca in https://github.com/iNavFlight/inav/pull/9700
* fixed dockerfile and updated docs by @RomanLut in https://github.com/iNavFlight/inav/pull/9702
* current meter scale to 500 by @P-I-Engineer in https://github.com/iNavFlight/inav/pull/9703
* Idle motor default change by @P-I-Engineer in https://github.com/iNavFlight/inav/pull/9695
* update MW XML File schema definition for 7.1 Autoland by @stronnag in https://github.com/iNavFlight/inav/pull/9721
* Update mw xsd for autoland by @stronnag in https://github.com/iNavFlight/inav/pull/9723
* Remove GPS glitch detection by @JulioCesarMatias in https://github.com/iNavFlight/inav/pull/9709
* Add error count to CLI batch command by @MrD-RC in https://github.com/iNavFlight/inav/pull/9712
* Spektrum telemetry minor fix to address false Fastboot alerts on radios with latest update by @MiguelFAlvarez in https://github.com/iNavFlight/inav/pull/9743
* 7.1 mergeback by @DzikuVx in https://github.com/iNavFlight/inav/pull/9762
* INAV 7.1 by @DzikuVx in https://github.com/iNavFlight/inav/pull/9549
* Update readme.md to mention AT32 on the list of mcus supported by @mmosca in https://github.com/iNavFlight/inav/pull/9779
* [docs] update serial_printf doc by @stronnag in https://github.com/iNavFlight/inav/pull/9780
* fix grammar in [ESC and servo outputs.md] by @RoboSchmied in https://github.com/iNavFlight/inav/pull/9784
* fix cygwin/sitl build with cmake 3.28.3 by @stronnag in https://github.com/iNavFlight/inav/pull/9787
* Fix missing EzTune settings in dump and diff by @DzikuVx in https://github.com/iNavFlight/inav/pull/9812
* Update settings descriptions by @DzikuVx in https://github.com/iNavFlight/inav/pull/9808
* Drop ledstrip_visual_beeper as not used by @DzikuVx in https://github.com/iNavFlight/inav/pull/9809
* Betafpvf411 unofficial by @DzikuVx in https://github.com/iNavFlight/inav/pull/9815
* Fix compiler existence checking in case if PATH contains tilde by @kubrack in https://github.com/iNavFlight/inav/pull/9760
* Add EzTune to CMS menu by @DzikuVx in https://github.com/iNavFlight/inav/pull/9813
* Remove unused USE_UNDERCLOCK define and related code by @DzikuVx in https://github.com/iNavFlight/inav/pull/9803
* Master 7.1.0 by @DzikuVx in https://github.com/iNavFlight/inav/pull/9821
* Enable spektrum bind only if spektrum is enabled by @DzikuVx in https://github.com/iNavFlight/inav/pull/9823
* Remove setting a use local VELNED instead of GPS provided by @DzikuVx in https://github.com/iNavFlight/inav/pull/9804
* Drop control_deadband setting by @DzikuVx in https://github.com/iNavFlight/inav/pull/9805
* Fix motor output glitch by initializing IO after timer by @mluessi in https://github.com/iNavFlight/inav/pull/9714
* PINIO: Fix inverted pin handling by @mluessi in https://github.com/iNavFlight/inav/pull/9559
* Add new target TUNERC405 by @TUNERC-Aria in https://github.com/iNavFlight/inav/pull/9818
* Update NEW_HARDWARE_POLICY.md by @mmosca in https://github.com/iNavFlight/inav/pull/9855
* Update Fixed Wing Landing.md by @b14ckyy in https://github.com/iNavFlight/inav/pull/9857
* Some updates to development docs by @DzikuVx in https://github.com/iNavFlight/inav/pull/9827
* Remove killswitch by @DzikuVx in https://github.com/iNavFlight/inav/pull/9856
* Release 7.1.0 by @DzikuVx in https://github.com/iNavFlight/inav/pull/9767
* fix broken links to modes.md by @sensei-hacker in https://github.com/iNavFlight/inav/pull/9880
* Wiggle to wake launch idle by @MrD-RC in https://github.com/iNavFlight/inav/pull/8511
* Reorganise stats screens by @MrD-RC in https://github.com/iNavFlight/inav/pull/9617
* Fixes SB F405 Wing ADC for RSSI and Aspd swapped by @b14ckyy in https://github.com/iNavFlight/inav/pull/9817
* Update Building in Windows 10 or 11 with Linux Subsystem.md by @MrD-RC in https://github.com/iNavFlight/inav/pull/9886
* Potential fix for GCC 13 VCP broken on H7 by @DzikuVx in https://github.com/iNavFlight/inav/pull/9882
* Simplify matrix filter and drop all partial versions by @DzikuVx in https://github.com/iNavFlight/inav/pull/9885
* Optimize the current meter scale and offset for AOCODARCF405AIO by @lida2003 in https://github.com/iNavFlight/inav/pull/9745
* terarange evo lidar by @error414 in https://github.com/iNavFlight/inav/pull/9527
* No longer require MAG to unlock GPS related flight modes by @DzikuVx in https://github.com/iNavFlight/inav/pull/9824
* garbage is displayed (f.e. single char "+" ) instead of "FIRST WP IS TOO FAR" OSD message by @RomanLut in https://github.com/iNavFlight/inav/pull/9849
* Feature cut for F411 and F722 by @DzikuVx in https://github.com/iNavFlight/inav/pull/9822
* Fix cmake gcc kit detection on apple silicon macs by @mmosca in https://github.com/iNavFlight/inav/pull/9893
* OSD Wind speed in m/s by @Yury-MonZon in https://github.com/iNavFlight/inav/pull/9652
* Remove workarounds as not used and obsolete by @DzikuVx in https://github.com/iNavFlight/inav/pull/9898
* Filtering simplification by @DzikuVx in https://github.com/iNavFlight/inav/pull/9897
* Drop MSP_POSITION_ESTIMATION_CONFIG by @DzikuVx in https://github.com/iNavFlight/inav/pull/9866
* Drop MSP_OSD_CONFIG from MSP protocol by @DzikuVx in https://github.com/iNavFlight/inav/pull/9865
* New MSP frames for Servos by @DzikuVx in https://github.com/iNavFlight/inav/pull/9873
* Configuration symbol for barometer address by @ht099 in https://github.com/iNavFlight/inav/pull/9902
* Drop MSP_PIDNAMES frame as outdated by @DzikuVx in https://github.com/iNavFlight/inav/pull/9900
* Update Fixed Wing Landing.md by @0crap in https://github.com/iNavFlight/inav/pull/9909
* Drop MSP_FILTER_CONFIG and MSP_SET_FILTER_CONFIG commands by @DzikuVx in https://github.com/iNavFlight/inav/pull/9903
* do not remove nav modes if connected by usb by @RomanLut in https://github.com/iNavFlight/inav/pull/9913
* Drop MSP_PID_ADVANCED and MSP_SET_PID_ADVANCED from MSP protocol by @DzikuVx in https://github.com/iNavFlight/inav/pull/9901
* Add GEPRC TAKERF722SE target by @YI-BOYANG in https://github.com/iNavFlight/inav/pull/9919
* Drop MSP_MOTOR_PINS by @DzikuVx in https://github.com/iNavFlight/inav/pull/9922
* Drop pidsum limit settings and replace with hardcoded values by @DzikuVx in https://github.com/iNavFlight/inav/pull/9911
* Update Fixed Wing Landing.md by @b14ckyy in https://github.com/iNavFlight/inav/pull/9896
* Add extra description to nav_min_ground_speed parameter by @MrD-RC in https://github.com/iNavFlight/inav/pull/9890
* increased VBATT_PRESENT_THRESHOLD by @RomanLut in https://github.com/iNavFlight/inav/pull/9933
* Add ICM for IFLIGHT_BLITZ_F722 V1.2 by @b14ckyy in https://github.com/iNavFlight/inav/pull/9939
* Fix Aocoda-RC H743Dual motor 5-8 mis-labeled issue by @lida2003 in https://github.com/iNavFlight/inav/pull/9948
* Add AOCODARCF4V3 target by @lida2003 in https://github.com/iNavFlight/inav/pull/9669
* enforce rx auto smoothing in ez tune by @DzikuVx in https://github.com/iNavFlight/inav/pull/9945
* Update deadband defaults by @DzikuVx in https://github.com/iNavFlight/inav/pull/9944
* max_throttle adjustments by @DzikuVx in https://github.com/iNavFlight/inav/pull/9915
* Reintroduce MSP2_INAV_SET_SERVO_CONFIG and MSP2_INAV_SERVO_CONFIG by @DzikuVx in https://github.com/iNavFlight/inav/pull/9926
* update auto-declination generator to current IGRF13 model by @stronnag in https://github.com/iNavFlight/inav/pull/9962
* Target: Add JHEMCUF405WING, JHEMCUF745, JHEMCUH743HD board by @jhemcu in https://github.com/iNavFlight/inav/pull/9807
* Ez Tune snappiness by @DzikuVx in https://github.com/iNavFlight/inav/pull/9957
* Fix ZEEZF7 output mapping by @DzikuVx in https://github.com/iNavFlight/inav/pull/9965
* Minor Nav code improvements by @breadoven in https://github.com/iNavFlight/inav/pull/9947
* FW Nav Auto Landing fixes by @breadoven in https://github.com/iNavFlight/inav/pull/9940
* Prevent high throttle auto cancelling OSD stats screen on disarm by @breadoven in https://github.com/iNavFlight/inav/pull/9951
* Fix function prototypes and macos warnings by @mmosca in https://github.com/iNavFlight/inav/pull/9980
* [SITL] MacOS SITL, build as universal binary by @mmosca in https://github.com/iNavFlight/inav/pull/9981
* SITL: implemented built-in serial receivers support in SITL, implemented FC proxy mode, updated SITL docs by @RomanLut in https://github.com/iNavFlight/inav/pull/9365
* Match F745 and F745NANO motor pins to BF target by @mmosca in https://github.com/iNavFlight/inav/pull/9990
* Revert enforcing mode on TIM3 by @DzikuVx in https://github.com/iNavFlight/inav/pull/9989
* Fix macos builds in release_7.1.1 to fix builds by @mmosca in https://github.com/iNavFlight/inav/pull/9993
* Cherry pick flywoof745 fixes from master by @mmosca in https://github.com/iNavFlight/inav/pull/9991
* Use 2 bits for msp displayport font page by @mmosca in https://github.com/iNavFlight/inav/pull/9942
* RangerFinder NRA15/24 from nanoradar by @error414 in https://github.com/iNavFlight/inav/pull/9842
* Revert Nav hold changes by @breadoven in https://github.com/iNavFlight/inav/pull/9999
* Create Building in Gitpod.md by @dzaro-dev in https://github.com/iNavFlight/inav/pull/10004
* WP mode altitude enforce hold fix by @breadoven in https://github.com/iNavFlight/inav/pull/10002
* INAV 7.1.1 by @DzikuVx in https://github.com/iNavFlight/inav/pull/9934
* Update Building in Gitpod.md by @dzaro-dev in https://github.com/iNavFlight/inav/pull/10014
* fix ist8308 compass local frame by @RomanLut in https://github.com/iNavFlight/inav/pull/10011
* mavlink: send RC_CHANNELS instead of RC_CHANNELS_RAW to support 18 channels by @RomanLut in https://github.com/iNavFlight/inav/pull/8282
* Optimize PID axis processing by @DzikuVx in https://github.com/iNavFlight/inav/pull/9956
* Add GEPRCF745_BT_HD target by @YI-BOYANG in https://github.com/iNavFlight/inav/pull/9978
* Fixed wing Nav altitude velocity control by @breadoven in https://github.com/iNavFlight/inav/pull/9471
* 7.1.1. merge error trackback fix by @breadoven in https://github.com/iNavFlight/inav/pull/10028
* BFCOMPAT: Add auto-throttle label and BF font symbols for pitch and roll by @rmaia3d in https://github.com/iNavFlight/inav/pull/10023
* RTH trackback code cleanup by @breadoven in https://github.com/iNavFlight/inav/pull/10042
* [DOC] Broken USB recovery by @Scavanger in https://github.com/iNavFlight/inav/pull/10045
* Update the compatibility mode for DJI to use the actual DJI font. by @MrD-RC in https://github.com/iNavFlight/inav/pull/10046
* Adding Crosshair Styles for DJI OSD by @dzaro-dev in https://github.com/iNavFlight/inav/pull/10056
* Tidy up DJI crosshairs by @MrD-RC in https://github.com/iNavFlight/inav/pull/10060
* Use letter `Q` for DJI LinkQuality OSD element by @DzikuVx in https://github.com/iNavFlight/inav/pull/10054
* I-Term Lock for Fixed Wing by @DzikuVx in https://github.com/iNavFlight/inav/pull/9905
* Nav altitude estimation changes by @breadoven in https://github.com/iNavFlight/inav/pull/10041
* Reorder blackbox fields by @breadoven in https://github.com/iNavFlight/inav/pull/10068
* Add PSA about ICM426xx changes in INAV 7.1 by @mmosca in https://github.com/iNavFlight/inav/pull/10071
* Fix OSD mentioned twice on readme.md feature list by @fschuindt in https://github.com/iNavFlight/inav/pull/10092
* Building a USB-Rescue firmware without editing sources by @Scavanger in https://github.com/iNavFlight/inav/pull/10073
* Update readme.md by @mmosca in https://github.com/iNavFlight/inav/pull/10094
* Remove unused define from DJI OSD symbols by @MrD-RC in https://github.com/iNavFlight/inav/pull/10061
* Allow pilots the option to hide question marks from the OSD. by @MrD-RC in https://github.com/iNavFlight/inav/pull/10058
* Make the 'declination.py' file generate Declination, Inclination and Intensity. by @JulioCesarMatias in https://github.com/iNavFlight/inav/pull/10032
* SITL: accelerometer/mag data is not processed when using SITL with inav-HITL-plugin by @RomanLut in https://github.com/iNavFlight/inav/pull/9564
* Allow LED pin to be reassigned as MOTOR or SERVO by @mmosca in https://github.com/iNavFlight/inav/pull/10022
* Skip `pollVersion()` and `pollGnssCapabilities()` if `gps_auto_config = OFF` by @WizzardDr in https://github.com/iNavFlight/inav/pull/10082
* Fix channel selection for DMA2 Stream6. by @manuelilg in https://github.com/iNavFlight/inav/pull/10029
* Add JHEF405PRO (aka GHF405AIO-HD) support by @HishamGhosheh in https://github.com/iNavFlight/inav/pull/10070
* Add battery profile to programming framework by @MrD-RC in https://github.com/iNavFlight/inav/pull/10100
* Blackbox rc/flight modes update by @breadoven in https://github.com/iNavFlight/inav/pull/10093
* Do not render INAV logo on DJI compat mode by @DzikuVx in https://github.com/iNavFlight/inav/pull/10055
* Make `battery_capacity_unit` a global setting by @MrD-RC in https://github.com/iNavFlight/inav/pull/10103
* Release 7.1.2 by @DzikuVx in https://github.com/iNavFlight/inav/pull/10098
* Consolidate the old `PIDProfile` and `Profile` in to `Control Profile` by @MrD-RC in https://github.com/iNavFlight/inav/pull/10102
* Added new targets FLYWOOF722PRO, F405HD, updated F745, F405PRO config by @flywoo in https://github.com/iNavFlight/inav/pull/10096
* Decrease minimum launch acceleration by @MrD-RC in https://github.com/iNavFlight/inav/pull/10113
* Adaptive gyro filter based on signal statistics experiment by @DzikuVx in https://github.com/iNavFlight/inav/pull/9879
* Increase allowed speeds in NAV modes on multirotors by @DzikuVx in https://github.com/iNavFlight/inav/pull/9878
* gyro_adaptive_filter_min_hz min value error by @mmosca in https://github.com/iNavFlight/inav/pull/10123
* Increase max number of pwm outputs by 1, if a LED pin is defined by @mmosca in https://github.com/iNavFlight/inav/pull/10127
* We already support 4 page fonts, bump max chars to 1024 by @mmosca in https://github.com/iNavFlight/inav/pull/10128
* Change number of builds and make builds faster by @mmosca in https://github.com/iNavFlight/inav/pull/10129
* Update github actions by @mmosca in https://github.com/iNavFlight/inav/pull/10130
* Multirotor landing G bump detection improvements by @breadoven in https://github.com/iNavFlight/inav/pull/10138
* Include trusted altitude for healthy position estimation by @breadoven in https://github.com/iNavFlight/inav/pull/10083
* [crsf] move LAND flight mode into ARMED section by @stronnag in https://github.com/iNavFlight/inav/pull/10139
* Attempt at building master on sucessfull push by @mmosca in https://github.com/iNavFlight/inav/pull/10131
* Update dev-builds.yml by @mmosca in https://github.com/iNavFlight/inav/pull/10146
* Change tag for nightly builds by @mmosca in https://github.com/iNavFlight/inav/pull/10149
* Programming framework doc - loiter radius by @sensei-hacker in https://github.com/iNavFlight/inav/pull/10151
* Update release notes with recommendation fro full chip erase. by @mmosca in https://github.com/iNavFlight/inav/pull/10152
* OSD system message improvements by @breadoven in https://github.com/iNavFlight/inav/pull/10090
* Remove unused and commented out function from osd.c by @rmaia3d in https://github.com/iNavFlight/inav/pull/10147
* Update dev-builds.yml by @0crap in https://github.com/iNavFlight/inav/pull/10153
* Add link to nightly builds by @mmosca in https://github.com/iNavFlight/inav/pull/10155
* Walksnail Serial gimbal and headtracker support by @mmosca in https://github.com/iNavFlight/inav/pull/10109
* Update readme.md by @0crap in https://github.com/iNavFlight/inav/pull/10160
* Inhibit active failsafe procedures on landing detection by @breadoven in https://github.com/iNavFlight/inav/pull/10135
* Multirotor inverted crash detection by @breadoven in https://github.com/iNavFlight/inav/pull/10099
* Update Controls.md by @MrD-RC in https://github.com/iNavFlight/inav/pull/10163
* Update nav config revision number by @breadoven in https://github.com/iNavFlight/inav/pull/10162
* Don't run biulds for documentation only changes by @mmosca in https://github.com/iNavFlight/inav/pull/10164
* Add ICM42688-G to IFLIGHTF4_SUCCEXD by @DzikuVx in https://github.com/iNavFlight/inav/pull/10161
* Further serial gimbal/headtracker improvements by @mmosca in https://github.com/iNavFlight/inav/pull/10159
* bind_rx cli command now supports CRSF based receivers by @mmosca in https://github.com/iNavFlight/inav/pull/10166
* Update bind_rx cli documentation by @mmosca in https://github.com/iNavFlight/inav/pull/10170
* Update Cli.md by @mmosca in https://github.com/iNavFlight/inav/pull/10171
* Only generate nightly build release if the change includes code. by @mmosca in https://github.com/iNavFlight/inav/pull/10172
* Fixed position for formation flight / inav radar by @error414 in https://github.com/iNavFlight/inav/pull/9883
* Add msp command to send raw ublox commands to gps by @mmosca in https://github.com/iNavFlight/inav/pull/9349
* Allow SBUS servo protocol to output 18 channels, expand mixer to up to 24 channels by @mmosca in https://github.com/iNavFlight/inav/pull/10165
* [Targets] USE_MAG_ALL by @mmosca in https://github.com/iNavFlight/inav/pull/10176
* Gyro LULU smoother as gyro filter alternative by @DzikuVx in https://github.com/iNavFlight/inav/pull/10177
* LULU filter port to iNav as a single replacement for most filters in iNav, simplifying filter configuration drastically by @pjpei in https://github.com/iNavFlight/inav/pull/10145
* [FIX] BMI088 driver: get BMI088 acc aligned by @Minderring in https://github.com/iNavFlight/inav/pull/10174
* Add ICM-42688P to KakuteF4 by @jamming in https://github.com/iNavFlight/inav/pull/10175
* Remove of register optimization in favor or relying on GCC optimization. by @DzikuVx in https://github.com/iNavFlight/inav/pull/10178
* Add some docs on Serial Gimbal by @mmosca in https://github.com/iNavFlight/inav/pull/10182
* Add flown loiter radius to programming logic by @breadoven in https://github.com/iNavFlight/inav/pull/10183
* [GPS] Fix message rate for newer ublox devices and add some extra debugging features by @mmosca in https://github.com/iNavFlight/inav/pull/10179
* Fixed position for formation flight / inav radar by @P-I-Engineer in https://github.com/iNavFlight/inav/pull/10190
* mixer.h: PLATFORM_OTHER isn't valid, remove by @sensei-hacker in https://github.com/iNavFlight/inav/pull/10201
* Fix typo in Rx doc.md by @RobertoD91 in https://github.com/iNavFlight/inav/pull/10202
* [GPS] Fix GPS dynamic model setup for M10 GPS units by @mmosca in https://github.com/iNavFlight/inav/pull/10199
* Add UBLOX PSA to README by @mmosca in https://github.com/iNavFlight/inav/pull/10204
* [gps] correct version checks by @mmosca in https://github.com/iNavFlight/inav/pull/10205
* IFLIGHT_BLITZ_ATF435 MAX_PWM_OUTPUT_PORTS should 8 by @sensei-hacker in https://github.com/iNavFlight/inav/pull/10206
* Make LULU smoother independent from the gyro LPF by @DzikuVx in https://github.com/iNavFlight/inav/pull/10186
* Update OSD.md - List all of the OSD-related docs by @sensei-hacker in https://github.com/iNavFlight/inav/pull/10212
* [GPS] Add SEA and MOWER dynamic models. by @mmosca in https://github.com/iNavFlight/inav/pull/10211
* [GPS] UBLOX and UBLOX7 have been merged into UBLOX by @mmosca in https://github.com/iNavFlight/inav/pull/10214
* Update gps_provider documentaion by @mmosca in https://github.com/iNavFlight/inav/pull/10220
* create single zip with all hex files, again. by @mmosca in https://github.com/iNavFlight/inav/pull/10221
* All all baro to IFLIGHTF4_SUCCEXD by @DzikuVx in https://github.com/iNavFlight/inav/pull/10218
* Improve MAVLink behavior with flow control capable links by @MUSTARDTIGERFPV in https://github.com/iNavFlight/inav/pull/10222
* Add blackbox device FILE for SITL build by @bartslinger in https://github.com/iNavFlight/inav/pull/10228
* GEPRC_F722_AIO include UART3 by @sensei-hacker in https://github.com/iNavFlight/inav/pull/10233
* Add new targets: MicoAir405Mini, MicoAir405v2 and MicoAir743 by @Minderring in https://github.com/iNavFlight/inav/pull/10198
* Add gyros to DakeFPV targets by @DzikuVx in https://github.com/iNavFlight/inav/pull/10242
* Add a new target KakuteF4wing by @jamming in https://github.com/iNavFlight/inav/pull/10122
* Inflight timer fix by @breadoven in https://github.com/iNavFlight/inav/pull/10245
* SBUS2 telemetry support by @mmosca in https://github.com/iNavFlight/inav/pull/10169
* Fix programming framework parameters using int16 instead of in32 by @MrD-RC in https://github.com/iNavFlight/inav/pull/10246
* Lower sbus2 telemetry task priority by @mmosca in https://github.com/iNavFlight/inav/pull/10250
* Make sure DEFAULT_I2C_DEVICE is always valid by @mmosca in https://github.com/iNavFlight/inav/pull/10253
* Nav course hold yaw stick control improvement for fixed wing by @breadoven in https://github.com/iNavFlight/inav/pull/10187
* Change MAVLink component ID to be a "proper" autopilot  by @MUSTARDTIGERFPV in https://github.com/iNavFlight/inav/pull/10258
* Increase SMARTAUDIO_MAX_POWER_COUNT to 8 by @bkleiner in https://github.com/iNavFlight/inav/pull/10261
* add additional BBL headers for MAX SERVO increase by @stronnag in https://github.com/iNavFlight/inav/pull/10263
* only BBL log servos defined in the mixer by @stronnag in https://github.com/iNavFlight/inav/pull/10267
* add SERVOS to blackbox optional fields list by @stronnag in https://github.com/iNavFlight/inav/pull/10272
* Allow serialpassthrough to set parity & stop bits by @MUSTARDTIGERFPV in https://github.com/iNavFlight/inav/pull/10271
* Refactor sbus to support futaba's FASSTest26 sbus2 mode (Potentially 36 channels) by @mmosca in https://github.com/iNavFlight/inav/pull/10270
* Fix mixer tab by @mmosca in https://github.com/iNavFlight/inav/pull/10277
* Allow number of servos exceed pwm outputs, if servo protocol is sbus_pwm by @mmosca in https://github.com/iNavFlight/inav/pull/10276
* Allow Mission Upload mid flight by @b14ckyy in https://github.com/iNavFlight/inav/pull/10273
* cli.c: Add reason for Navigation Unsafe to status by @sensei-hacker in https://github.com/iNavFlight/inav/pull/10280
* AOCODARCF7MINI_V1: DSHOT_DMAR and V1 output order by @sensei-hacker in https://github.com/iNavFlight/inav/pull/10260
* Support SBUS2 FASSTest 12 channel short frame time by @mmosca in https://github.com/iNavFlight/inav/pull/10288
* add h7 svd file by @bkleiner in https://github.com/iNavFlight/inav/pull/10289
* Mac-OS wiki update | How to connect to configurator by @KY-S0ong in https://github.com/iNavFlight/inav/pull/10279
* vtx: fix VTX_SETTINGS_POWER_COUNT by @bkleiner in https://github.com/iNavFlight/inav/pull/10290
* Jh fix bbl servo logging by @stronnag in https://github.com/iNavFlight/inav/pull/10303
* remove excessive `SD` debug from MSP processing by @stronnag in https://github.com/iNavFlight/inav/pull/10306
* adsb enhanced by @error414 in https://github.com/iNavFlight/inav/pull/10298
* Add AIKONF7 target by @mbainrot in https://github.com/iNavFlight/inav/pull/9603
* Add FLYWOOH743PRO Target by @flywoo in https://github.com/iNavFlight/inav/pull/10285
* Update Fixed Wing Landing.md by @b14ckyy in https://github.com/iNavFlight/inav/pull/10311
* Update Fixed Wing Landing.md by @b14ckyy in https://github.com/iNavFlight/inav/pull/10312
* add TBS_LUCID_FC target by @bkleiner in https://github.com/iNavFlight/inav/pull/10292
* add stick_center note to vtol/mixer profile docs for 4+1 motor vtol configurations. by @P-I-Engineer in https://github.com/iNavFlight/inav/pull/10313
* GEPRC_F722_AIO add target with UART3 instead of i2c by @sensei-hacker in https://github.com/iNavFlight/inav/pull/10310
* MAMBAF722_2022B: use DMAR for motor 7 by @sensei-hacker in https://github.com/iNavFlight/inav/pull/10309
* tbs-lucid: remove in-accessible servo pins by @bkleiner in https://github.com/iNavFlight/inav/pull/10332
* Change Waypoint mode linear climb method by @breadoven in https://github.com/iNavFlight/inav/pull/10334
* Waypoint tracking improvements by @breadoven in https://github.com/iNavFlight/inav/pull/10278
* MSP headtracker parsing change by @mmosca in https://github.com/iNavFlight/inav/pull/10342
* Update USB Flashing.md - mention using a hub with USB-C by @sensei-hacker in https://github.com/iNavFlight/inav/pull/10343
* iFlight IFLIGHT_BLITZ_H7_WING changes by @DzikuVx in https://github.com/iNavFlight/inav/pull/10341
* Update ci.yml by @mmosca in https://github.com/iNavFlight/inav/pull/10344
* Use all cores during ci builds by @mmosca in https://github.com/iNavFlight/inav/pull/10337
* Small fixes for serial gimbal by @mmosca in https://github.com/iNavFlight/inav/pull/10345
* at32: add uart pinswap by @bkleiner in https://github.com/iNavFlight/inav/pull/10333
* Added documentation about GVARs, PIDFF Controllers, & Integer Math by @trailx in https://github.com/iNavFlight/inav/pull/10335
* Update Settings.yaml and settings.md to include units for nav_max_terrain_follow_alt by @daijoubu in https://github.com/iNavFlight/inav/pull/10352
* Change SmartPort sensor IDs for GPS and Modes by @MrD-RC in https://github.com/iNavFlight/inav/pull/9868
* Enhance OSD Custom Elements by @MrD-RC in https://github.com/iNavFlight/inav/pull/10282
* fixed altitude estimator error estimation by @RomanLut in https://github.com/iNavFlight/inav/pull/10367
* Update FLYWOOF745 config.c by @flywoo in https://github.com/iNavFlight/inav/pull/10368
* [Fix] Potential stack smash in gforce OSD statistics by @Scavanger in https://github.com/iNavFlight/inav/pull/10358
* tbs_lucid: mask PA13/PA14 to enable debugging by @bkleiner in https://github.com/iNavFlight/inav/pull/10365
* lucid: use PC5 as adc, use PA13/PA14 as PINIO by @bkleiner in https://github.com/iNavFlight/inav/pull/10378
* at32: add abilty to specify uart af by @bkleiner in https://github.com/iNavFlight/inav/pull/10366
* Change bus for built-in compass for MICOAIR743 target by @bfmvsa in https://github.com/iNavFlight/inav/pull/10384
* MICOARI743 Add alternative target that looks for compass on external connector by @mmosca in https://github.com/iNavFlight/inav/pull/10385
* Further tweaks to mavlink by @mmosca in https://github.com/iNavFlight/inav/pull/10215
* Switch parameters with battery capacity unit by @MrD-RC in https://github.com/iNavFlight/inav/pull/10389
* Nav velocity Z estimation improvements by @breadoven in https://github.com/iNavFlight/inav/pull/10243
* Navigation.md - Remove outdated references to inav_use_gps_no_baro by @sensei-hacker in https://github.com/iNavFlight/inav/pull/10408
* Default altitude sensor setting fix by @breadoven in https://github.com/iNavFlight/inav/pull/10411
* Fix lockup on disarm when wh used in post-flight stats by @MrD-RC in https://github.com/iNavFlight/inav/pull/10413
* Add MSP command to get ESC telemetry by @jeffhendrix in https://github.com/iNavFlight/inav/pull/10388
* Add PrincipioIoT F7 target by @DzikuVx in https://github.com/iNavFlight/inav/pull/10422
* at32: add ability to specify uart rx/tx af independently by @bkleiner in https://github.com/iNavFlight/inav/pull/10396
* Add feature freeze announcement by @mmosca in https://github.com/iNavFlight/inav/pull/10429
* Fix custom OSD elements cli import by @MrD-RC in https://github.com/iNavFlight/inav/pull/10430
* Update arming screen for better space utilisation by @MrD-RC in https://github.com/iNavFlight/inav/pull/10300
* Allow the pilot to set the precision for altitude and distance in the OSD by @MrD-RC in https://github.com/iNavFlight/inav/pull/10431
* Update DPS310 driver to support SPL07-003 by @DzikuVx in https://github.com/iNavFlight/inav/pull/10441
* MSP VTX Code Updates by @geoffsim in https://github.com/iNavFlight/inav/pull/10355
* Added IMUTemperature read function for ICM42605 by @ultrazar in https://github.com/iNavFlight/inav/pull/10423
* Update TUNERCF405 target.h by @TUNERC-Aria in https://github.com/iNavFlight/inav/pull/10438
* Have RSSI go from 0-100%, rather than 0-99% by @MrD-RC in https://github.com/iNavFlight/inav/pull/10450
* Add spa06 and spl07 baro for Kakutef4/f7 FC by @jamming in https://github.com/iNavFlight/inav/pull/10458
* Initial implementation of MSP RC stats and info messages by @MrD-RC in https://github.com/iNavFlight/inav/pull/10451
* Revert change to MSP_SET_RAW_RC by @MrD-RC in https://github.com/iNavFlight/inav/pull/10461
* [mspv2] pass "flags" field back to sender, define ILMI flag by @stronnag in https://github.com/iNavFlight/inav/pull/10464
* Geozones (aka Geofence) by @Scavanger in https://github.com/iNavFlight/inav/pull/10459
* Geozones.md by @b14ckyy in https://github.com/iNavFlight/inav/pull/10466
* add annotated script to generate RN Changelog by @stronnag in https://github.com/iNavFlight/inav/pull/10468
* add TBS_LUCID_H7  by @bkleiner in https://github.com/iNavFlight/inav/pull/10454
* Add BF config to INAV target converter by @mmosca in https://github.com/iNavFlight/inav/pull/9556
* [Fix] EZ-Tune Filter-HZ Fix by @Scavanger in https://github.com/iNavFlight/inav/pull/10467
* Geozone RC2 Fixes by @Scavanger in https://github.com/iNavFlight/inav/pull/10471
* Speedybee F405 AIO by @DzikuVx in https://github.com/iNavFlight/inav/pull/10444
* gimbal_sensitivity uint8_t -> int8_t. Range is actually -16 to 15 by @mmosca in https://github.com/iNavFlight/inav/pull/10478
* Add support for SKYSTARSSF405AIO target by @DusKing1 in https://github.com/iNavFlight/inav/pull/10469
* Fix incorrect arming flags reporting on CLI by @mmosca in https://github.com/iNavFlight/inav/pull/10479
* add GEPRC_TAKER_H743 target replacement by @DzikuVx in https://github.com/iNavFlight/inav/pull/10484
* Fix nightly build  by @mmosca in https://github.com/iNavFlight/inav/pull/10485
* fixed: gps sensor can not recover from timeout in gps fix estimation mode by @RomanLut in https://github.com/iNavFlight/inav/pull/9574
* Update osd.md for 8.0 by @MrD-RC in https://github.com/iNavFlight/inav/pull/10492
* add target RADIOLINKF722 by @radiolinkW in https://github.com/iNavFlight/inav/pull/10476
* Fixed wing launch mode failsafe fixes by @breadoven in https://github.com/iNavFlight/inav/pull/10486
* BF2INAV converter updates by @mmosca in https://github.com/iNavFlight/inav/pull/10503
* Fix PINIO in KAKUTEH7WING by @ot0tot in https://github.com/iNavFlight/inav/pull/10509
* Show pilot name and craft name on arming screen if they are not empty by @MrD-RC in https://github.com/iNavFlight/inav/pull/10506
* fix h7 sdcard init by @bkleiner in https://github.com/iNavFlight/inav/pull/10512
* Omnibus F4.md: select IMU for V6 and Fireworks V2 by @sensei-hacker in https://github.com/iNavFlight/inav/pull/10519
* h7: enable swd pins by @bkleiner in https://github.com/iNavFlight/inav/pull/10516
* msp: expose number of vtx power levels, bands and channels by @bkleiner in https://github.com/iNavFlight/inav/pull/10395
* Add a template for new target PR by @mmosca in https://github.com/iNavFlight/inav/pull/9946
* f7: migrate sdcard to hal by @bkleiner in https://github.com/iNavFlight/inav/pull/10526
* Change Autotune default max servo range by @b14ckyy in https://github.com/iNavFlight/inav/pull/10531
* Update VTOL.md with a more detailed guide on setting up tilting servos by @dzaro-dev in https://github.com/iNavFlight/inav/pull/10528
* Experimental bmp390 support. by @mmosca in https://github.com/iNavFlight/inav/pull/10542
* Programming Framework.md: Fix markdown for Delta by @sensei-hacker in https://github.com/iNavFlight/inav/pull/10546
* Correct comments on OSD symbols by @MrD-RC in https://github.com/iNavFlight/inav/pull/10558
* Default motor stop to `ON` by @MrD-RC in https://github.com/iNavFlight/inav/pull/10568
* Add support for SKYSTARSF405WING target by @DusKing1 in https://github.com/iNavFlight/inav/pull/10561
* Add new target for HGLRCF405V2 by @HGLRC-T in https://github.com/iNavFlight/inav/pull/10417
* SITL.md - Addtional info re joystick by @sensei-hacker in https://github.com/iNavFlight/inav/pull/10579
* Fix barometer I2C address redefine issues by @Minderring in https://github.com/iNavFlight/inav/pull/10555
* make gimbal trims signed int by @sensei-hacker in https://github.com/iNavFlight/inav/pull/10573
* Simplify build and retry increasing agents by @mmosca in https://github.com/iNavFlight/inav/pull/10581
* Fix nightly build by @mmosca in https://github.com/iNavFlight/inav/pull/10582
* More nightly build fixes by @mmosca in https://github.com/iNavFlight/inav/pull/10583
* Fixing nightly builds and cleaning up ci by @mmosca in https://github.com/iNavFlight/inav/pull/10585
* Fixed wing altitude control fixes by @breadoven in https://github.com/iNavFlight/inav/pull/10541
* Add targets for SEQUREH7 and SEQUREH7V2 by @MrD-RC in https://github.com/iNavFlight/inav/pull/10523
* A little reminder on the OSD by @mmosca in https://github.com/iNavFlight/inav/pull/10589
* Update description for disarm_always by @MrD-RC in https://github.com/iNavFlight/inav/pull/10592
* Add SITL linux aarch64 build by @mmosca in https://github.com/iNavFlight/inav/pull/10602
* O4 arming workaround by @mmosca in https://github.com/iNavFlight/inav/pull/10598
* Fix typo by @mmosca in https://github.com/iNavFlight/inav/pull/10603
* Strip version number of inav_SITL binaries in artifacts by @mmosca in https://github.com/iNavFlight/inav/pull/10604
* Lower ubuntu version by @mmosca in https://github.com/iNavFlight/inav/pull/10605
* Fix mac regular expression by @mmosca in https://github.com/iNavFlight/inav/pull/10609
* Added extra format to Custom OSD Elements by @MrD-RC in https://github.com/iNavFlight/inav/pull/10594
* Fix negative altitudes in OSD by @MrD-RC in https://github.com/iNavFlight/inav/pull/10612
* Revert to actual BF font, now that DJI fixed G2 and newer by @mmosca in https://github.com/iNavFlight/inav/pull/10620
* Remove blocking delay from batteryUpdate initialization by @mmosca in https://github.com/iNavFlight/inav/pull/10607
* Add new target: AET-H743-Basic by @villivateur in https://github.com/iNavFlight/inav/pull/10600

## New Contributors
* @sys512 made their first contribution in https://github.com/iNavFlight/inav/pull/9622
* @paulwrath1223 made their first contribution in https://github.com/iNavFlight/inav/pull/9640
* @RoboSchmied made their first contribution in https://github.com/iNavFlight/inav/pull/9691
* @P-I-Engineer made their first contribution in https://github.com/iNavFlight/inav/pull/9703
* @kubrack made their first contribution in https://github.com/iNavFlight/inav/pull/9760
* @TUNERC-Aria made their first contribution in https://github.com/iNavFlight/inav/pull/9818
* @Yury-MonZon made their first contribution in https://github.com/iNavFlight/inav/pull/9652
* @ht099 made their first contribution in https://github.com/iNavFlight/inav/pull/9902
* @0crap made their first contribution in https://github.com/iNavFlight/inav/pull/9909
* @dzaro-dev made their first contribution in https://github.com/iNavFlight/inav/pull/10004
* @fschuindt made their first contribution in https://github.com/iNavFlight/inav/pull/10092
* @WizzardDr made their first contribution in https://github.com/iNavFlight/inav/pull/10082
* @manuelilg made their first contribution in https://github.com/iNavFlight/inav/pull/10029
* @HishamGhosheh made their first contribution in https://github.com/iNavFlight/inav/pull/10070
* @pjpei made their first contribution in https://github.com/iNavFlight/inav/pull/10145
* @Minderring made their first contribution in https://github.com/iNavFlight/inav/pull/10174
* @jamming made their first contribution in https://github.com/iNavFlight/inav/pull/10175
* @RobertoD91 made their first contribution in https://github.com/iNavFlight/inav/pull/10202
* @MUSTARDTIGERFPV made their first contribution in https://github.com/iNavFlight/inav/pull/10222
* @bartslinger made their first contribution in https://github.com/iNavFlight/inav/pull/10228
* @KY-S0ong made their first contribution in https://github.com/iNavFlight/inav/pull/10279
* @mbainrot made their first contribution in https://github.com/iNavFlight/inav/pull/9603
* @trailx made their first contribution in https://github.com/iNavFlight/inav/pull/10335
* @daijoubu made their first contribution in https://github.com/iNavFlight/inav/pull/10352
* @bfmvsa made their first contribution in https://github.com/iNavFlight/inav/pull/10384
* @ultrazar made their first contribution in https://github.com/iNavFlight/inav/pull/10423
* @radiolinkW made their first contribution in https://github.com/iNavFlight/inav/pull/10476
* @ot0tot made their first contribution in https://github.com/iNavFlight/inav/pull/10509
* @HGLRC-T made their first contribution in https://github.com/iNavFlight/inav/pull/10417
* @villivateur made their first contribution in https://github.com/iNavFlight/inav/pull/10600

**Full Changelog**: https://github.com/iNavFlight/inav/compare/7.1.2...8.0.0
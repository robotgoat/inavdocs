---
title: Installation
slug: install
sidebar_position: 4
---

## Prepare System

Before jumping into INAV, you must setup your computing environment so that you can successfully interface with flight controllers. 
The primary, and preferred method for doing so is through the official INAV Configurator.
INAV Configurator is a desktop application that runs on all major operating systems that allows for FCs to be flashed and configured.
Please follow the section relevant to your platform.

### Windows

Recent versions of Windows (10, 11) will typically automatically attempt to install the relevant drivers when you first connect your flight controller to your computer. 
This can work, but if it does not, please attempt the following:

#### DFU Mode - Zadig
When booting the FC in DFU mode (hold the boot button on the board while plugging in the USB) and INAV configurator does not find the board in DFU mode, please do the following:

1. Download Zadig: https://zadig.akeo.ie/
2. Run the installer. 

#### ImpulseRC Driver Fixer
If driver issues persist, please download the ImpulseRC Driver Fixer and run the executable on your system.

- ImpulseRC Driver Fixer: https://impulserc.com/pages/downloads 

### Linux - Debian/Ubuntu/Mint

In Linux, there is no need to install any drivers.
However, a few libraries might need to be installed and user groups need to be changed.

1. Install `libatomic` with :
```bash
sudo apt install libatomic1
```
2. Add user to `plugdev` group: 
```bash
sudo usermod -aG plugdev $USER
```
3. Create plugdev rules for DFU mode and place file in directory:
```bash
(echo '# DFU (Internal bootloader for STM32 and AT32 MCUs)'
	echo 'ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="2e3c", ATTRS{idProduct}=="df11", MODE="0664", GROUP="plugdev"'
	echo 'ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="0483", ATTRS{idProduct}=="df11", MODE="0664", GROUP="plugdev"') | sudo tee /etc/udev/rules.d/45-stdfu-permissions.rules > /dev/null
```

4. Add user to `dialout` group to give permissions to access USB device:
```bash
sudo usermod -aG dialout $USER
```

5. Restart computer

## Download INAV Configurator
The Configurator can now be downloaded and installed for your relevant operating system from the Github releases page of INAV Configurator.
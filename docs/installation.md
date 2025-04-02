---
title: Installation
slug: install
sidebar_position: 4
---

## Download INAV Configurator
The Configurator can now be downloaded and installed for your relevant operating system from the Github releases page of [INAV Configurator](https://github.com/iNavFlight/inav-configurator/releases)

## Prepare Your System

Before jumping into INAV, you must setup your computing environment so that you can successfully interface with flight controllers. 
The primary, and preferred method for doing so is through the official INAV Configurator.
INAV Configurator is a desktop application that runs on all major operating systems that allows for FCs to be flashed and configured.
Please follow the section relevant to your platform.

### Windows

Recent versions of Windows (10, 11) will typically automatically attempt to install the relevant drivers when you first connect your flight controller to your computer. 
This can work, but if it does not, please attempt the following before installing the Win64 or Win32 version of configurator:

#### DFU Mode - Zadig
When booting the FC in DFU mode (hold the boot button on the board while plugging in the USB) and INAV Configurator does not find the board in DFU mode, please do the following:

1. Download Zadig: https://zadig.akeo.ie/
2. Run the installer. 

#### ImpulseRC Driver Fixer
If driver issues persist, please download the ImpulseRC Driver Fixer and run the executable on your system.

- ImpulseRC Driver Fixer: https://impulserc.com/pages/downloads 

### Linux

In Linux, there is no need to install any drivers.
However, a few libraries might need to be installed and user groups need to be changed.
The following should apply to most modern distros.
The instructions are shown for Debian/Ubuntu based distros:

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

Finally, plaease visit the releases page and download:

- The `.deb` installation file if you have a Debian/Ubuntu/Mint based system.
Install with `sudo apt install ./INAV-Configurator_linux_x64_x.y.z.deb` or with a package manager.
- The `.rpm` is the Fedora installation file. 
Install with `sudo dnf localinstall /path/to/INAV-Configurator_linux_x64-x.y.z.rpm` or open it with a package manager (e.g. via Files)
- `.zip` is a universal archive. 
Download and continue with these instructions to install:

1. Extract **zip** archive
```
unzip INAV-Configurator_linux_arch_x.y.z.zip -d /tmp/
```
  **arch** is your computer architecture (x64, armv7l, ...), **x.y.z** is the INAV Configurator version number.

2. If this is the first time installing INAV Configurator, create a home for its files
```
sudo mkdir /opt/inav
sudo chown $USER /opt/inav
```
3. Move the temporary files into their home 
```
mv /tmp/INAV\ Configurator /opt/inav/inav-configurator
```
4. Update the application icon.
```
sudo mkdir /opt/inav/inav-configurator/icon
sudo cp /opt/inav/inav-configurator/images/inav_icon_128.png /opt/inav/inav-configurator/icon
```
5. As a one-off, move the desktop file into the applications directory 
```
sudo mv inav-configurator.desktop /usr/share/applications/
```
6. Make the following files executable:
   * inav-configurator `chmod +x /opt/inav/inav-configurator/inav-configurator`
7. Run the INAV Configurator app from the unpacked folder `/opt/inav/inav-configurator/inav-configurator`

### Mac
1. Download Configurator for the Mac platform
2. Install
    * Extract ZIP archive and run INAV Configurator
    * Or use the DMG package for installation

## Building and running INAV Configurator locally (for development)

For local development, the **node.js** build system is used.

1. Install node.js
1. From the project folder run `yarn install` and then `npm install`
1. To build the  and start the configurator:
    - Run `npm start`.

To build the App run `npm run make` to build for your platform.

Options:
* Architecture: --arch  - Allowed values are: "ia32", "x64", "armv7l", "arm64", "universal", or "mips64el". 

See [Electron Forge CLI Documentation](https://www.electronforge.io/cli#options-2) for details

Note: Not all architectures are available for all platforms. For example, ia32 (32bit) support is not available for Linux. 
Tested architectures:
- Windows: x64 and ia32
- Linux: x64 and armv7l
- MacOS: x64 and arm64

To build the setup program for windows, you have to install [WiX Toolset V3](https://github.com/wixtoolset/wix3/releases) and add the `bin` folder to you `PATH`, e.g.
```C:\Program Files (x86)\WiX Toolset v3.14\bin```

To build deb and rpm packages for Linux, you have to install the following packages: 
- Ubuntu/Debian: `dpkg, fakeroot, rpm, build-essential, libudev-dev`
- OpenSuse/Fedora: `dpkg, fakeroot, rpmbuild, systemd-devel, devel-basis (zypper install -t pattern devel_basis), zip`

Example (note the double -- ):
```npm run make -- --arch="x64"```

### Running with debug | Inspector

To be able to open Inspector, set environment variable `NODE_ENV` to `development` or set the flag directly when run `npm start`:

```NODE_ENV=development npm start``` or ```$env:NODE_ENV="development" | npm start``` for Windows PowerShell

Or use vscode and start a debug session `Debug Configurator` (Just hit F5!)

---
name: Linux kernel
homepage: https://www.kernel.org
logo: ~
goal: Build and use Linux kernel on my devices
desc: >
  Linux kernel (<a href="https://www.github.com/iegor/linux">github repo</a>)
  Updating applying my own patches, build and run on my devices.
rad:
  - t: Routine of continuous development cycle
  - t: >
      Applied Gentoo patchset to allow more close integration
      with what I use daily
  - t: >
      Modified <a href="https://nouveau.freedesktop.org/wiki/">nouveau</a>
      graphics driver sub-system to fix brightness issues on my laptop
  - t: >
      Modified r600 AMD radeon graphics driver sub-system
      to fix issues on my powepc based laptop
tech:
  - t: c
  - t: gentoo
  - t: portage
  - t: paludis
  - t: vim
  - t: git
  - t: tig
  - t: bash
  - t: make
---
test_contents
...
# vim: set ts=2 sw=2 et:

---
name: Bumblebee Support for Gentoo Linux
homepage: https://www.github.com/iegor/bumblebee
logo: ~
goal: >
  Introduce support of “bumblebee” solution on
  Gentoo Linux OS by creating installation and configuration script (.ebuild)
desc: >
  “Bumblebee” project (in past “Prime-ng”) was created
  for introducing support of Nvidia
  <a href="https://www.nvidia.com/object/optimus_technology.html">“Optimus”</a>
  previously Windows-only solution to GNU/Linux OS. It was created to utilize
  powerful graphics capabilities of latest graphics chip sets
  maintaining fair level of power consumption by allowing switch from less "power hungry"
  graphics adapters to more sophisticated and powerfull when needed.
rad:
  - t: >
      Design and implementation of .ebuild script and
      all files needed for successful installation and running.
  - t: Community members support and issue resolving.
  - t: >
      Modifications to allow to use both nvidia proprietary blob and
      opensource <a href="https://nouveau.freedesktop.org/wiki/">nouveau</a>
      drivers on same machine, without need to reconfigure
      Linux kernel and whole infrastructure.
tech:
  - t: gentoo
  - t: portage
  - t: paludis
  - t: vim
  - t: git
  - t: tig
  - t: bash
---
test_contents
...
# vim: set ts=2 sw=2 et:

---
name: KDevelop 3rd generation support and upgrade
homepage: https://www.kdevelop.org
logo: ~
goal: >
  Support, optimize and add new useful features.
  (<a href="https://github.com/iegor/kdevelop">repository</a>)
desc: >
  KDevelop – is the integrated development environment
  (IDE) for <a href="https://www.kde.org">KDE</a>, in
  it's 3rd generation it is still awaiting to be optimized and reorganized a bit
  on the source level. <br>3rd generation was chosen because
  of native compatibility with KDE 3.x.x codebase and because
  of having <a href="https://en.wikipedia.org/wiki/GNU_Build_System">Autotools</a>
  support enabled in it.
rad:
  - t: Codebase cleanup, enforcing common and unified coding considerations
  - t: Support and development Gentoo Linux “Portage“ package management system's ebuilds
  - t: Cleanup and fixes to build with Paludis package manager
  - t: >
      Developing a support library and other layers for compatibility with
      building and developing “Visual Studio” projects and solutions within KDevelop
  - t: >
      Cleanup, fixes and updates to coding style and habit
      toolkit based on <a href="http://astyle.sourceforge.net">Astyle</a> project
tech:
  - t: c
  - t: cpp
  - t: kde
  - t: gentoo
  - t: portage
  - t: paludis
  - t: vim
  - t: git
  - t: tig
  - t: bash
  - t: autotools
  - t: kdevelop
---
test_contents
...
# vim: set ts=2 sw=2 et:

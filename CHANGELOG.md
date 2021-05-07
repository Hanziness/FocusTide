# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.9.2](https://github.com/Hanziness/AnotherPomodoro/compare/v0.9.0...v0.9.2) (2021-05-07)


### Features

* Update dependencies, including TailwindCSS and enable JIT ([#83](https://github.com/Hanziness/AnotherPomodoro/issues/83)) ([781f356](https://github.com/Hanziness/AnotherPomodoro/commit/781f3562673ab8a243750852317e27408a2fe5d8))

### [0.9.1](https://github.com/Hanziness/AnotherPomodoro/compare/v0.9.0...v0.9.1) (2021-04-08)


### Features

* Update TailwindCSS and enable Tailwind's JIT ([68f2588](https://github.com/Hanziness/AnotherPomodoro/commit/68f2588889e4f3b08b16edd8e72561269712b7a6))

## [0.9.0](https://github.com/Hanziness/AnotherPomodoro/compare/v0.8.3...v0.9.0) (2021-04-08)


### Features

* **settings:** Add settings to enable tick emoji in title ([3586ce8](https://github.com/Hanziness/AnotherPomodoro/commit/3586ce8d8f4b9c58f3ef690e8852724c0e0d4e7c))
* Show checkmark instead of time in title when timer is completed ([bdc3db8](https://github.com/Hanziness/AnotherPomodoro/commit/bdc3db8ca7ac4da3cf13e6ee44390615c4c57966))
* Timer is replaced with a checkmark when completed ([8dfcf99](https://github.com/Hanziness/AnotherPomodoro/commit/8dfcf991e1162c30b595eb7348d3525d93af32d0))


### Bug Fixes

* Fix invalid units warning for checkmark ([ff38a19](https://github.com/Hanziness/AnotherPomodoro/commit/ff38a19c22b646a5c75918f25698430d04995e29))

### [0.8.3](https://github.com/Hanziness/AnotherPomodoro/compare/v0.8.2...v0.8.3) (2021-01-06)


### Features

* **meta:** Add meta keywords ([97f6d10](https://github.com/Hanziness/AnotherPomodoro/commit/97f6d107d48561fa126bd0fa272cbb3f68f49711))

### [0.8.2](https://github.com/Hanziness/AnotherPomodoro/compare/v0.8.1...v0.8.2) (2021-01-02)


### Documentation

* **readme:** Update README ([a8d3a08](https://github.com/Hanziness/AnotherPomodoro/commit/a8d3a0800312d52aef7e7b4b66739a474aa15156))
* **readme:** Update styling ([e56ef48](https://github.com/Hanziness/AnotherPomodoro/commit/e56ef48a564164a19d264b9d4c2fc1841f5594a9))

### [0.8.1](https://github.com/Hanziness/AnotherPomodoro/compare/v0.8.0...v0.8.1) (2021-01-01)


### Features

* Add sitemap generation ([cc50a73](https://github.com/Hanziness/AnotherPomodoro/commit/cc50a73606f3b00d5f0cd08e459d0906937acb6c))

## [0.8.0](https://github.com/Hanziness/AnotherPomodoro/compare/v0.7.2...v0.8.0) (2021-01-01)


### Features

* **controls:** Allow starting/pausing the timer using the `space` key ([7aaf827](https://github.com/Hanziness/AnotherPomodoro/commit/7aaf827b11142396897b27048f811f88c068e0c7))
* **settings:** Add setting to toggle keyboard shortcuts ([735a18a](https://github.com/Hanziness/AnotherPomodoro/commit/735a18ae229c1ad524ad3192c7b77f54ca469b3c))
* **tasks:** Implement task list ([#73](https://github.com/Hanziness/AnotherPomodoro/issues/73)) ([31796c3](https://github.com/Hanziness/AnotherPomodoro/commit/31796c317522a8bcb3fa9fd96b80af2e74368a65)), closes [#19](https://github.com/Hanziness/AnotherPomodoro/issues/19)

### [0.7.2](https://github.com/Hanziness/AnotherPomodoro/compare/v0.7.1...v0.7.2) (2020-12-31)


### Features

* **pwa:** PWA app now starts on timer page ([595f372](https://github.com/Hanziness/AnotherPomodoro/commit/595f372ca78dfa03e4782cca31379e8d2ac0557f))


### Bug Fixes

* **pwa:** Display correct app name in PWA contexts ([7d208cf](https://github.com/Hanziness/AnotherPomodoro/commit/7d208cf4a0bfd62a161132c759261837cf8927b8))

### [0.7.1](https://github.com/Hanziness/AnotherPomodoro/compare/v0.7.0...v0.7.1) (2020-12-31)


### Bug Fixes

* **controls:** Fix transparency of disabled control buttons in Chromium ([605fe46](https://github.com/Hanziness/AnotherPomodoro/commit/605fe46f770a8fb7b2a5959562772fe56b7b8b8f)), closes [#59](https://github.com/Hanziness/AnotherPomodoro/issues/59)

## [0.7.0](https://github.com/Hanziness/AnotherPomodoro/compare/v0.6.0...v0.7.0) (2020-12-30)


### Features

* **changelog:** Add i18n-related commit types ([07279ef](https://github.com/Hanziness/AnotherPomodoro/commit/07279efc6d85f60246b849ed1c8e1abc59cc3199))
* **changelog:** Show more categories in changelog ([5d97f1e](https://github.com/Hanziness/AnotherPomodoro/commit/5d97f1eae822e85e2e02e9bee80604d822594718))


### Bug Fixes

* **timer:** Traditional timer now displays hours ([d099128](https://github.com/Hanziness/AnotherPomodoro/commit/d0991289e6d6b07d6f95fbd87f8c4a9917c1946d))


### Refactors

* **store:** Remove global preset application ([9473452](https://github.com/Hanziness/AnotherPomodoro/commit/94734524f7ece122e9b25e07130bb58b6f0a23c2))
* Migrate to `vuex-persistedstate` ([25918ad](https://github.com/Hanziness/AnotherPomodoro/commit/25918adfa6cb0204ad76854cc1f61af236800ec7))
* **settings:** Move `timerPresets` out of store, remove debug preset ([da81b55](https://github.com/Hanziness/AnotherPomodoro/commit/da81b55c64bbff1b67429d7e2f32fa7fd935f095))


### Documentation

* **readme:** Update README to reflect vuex persistence change ([4583fbb](https://github.com/Hanziness/AnotherPomodoro/commit/4583fbb8a32828d70e24adb3514c4a2ea9177b95))


### Localizations

* **hu:** Add missing form error translations to Hungarian ([443508d](https://github.com/Hanziness/AnotherPomodoro/commit/443508d452d05f13248b2b2d1f68a400e82935ed)), closes [#62](https://github.com/Hanziness/AnotherPomodoro/issues/62)

## [0.6.0](https://github.com/Hanziness/AnotherPomodoro/compare/v0.5.0...v0.6.0) (2020-12-30)


### Features

* **settings:** Add reset button to settings panel ([7a426f4](https://github.com/Hanziness/AnotherPomodoro/commit/7a426f46c0722a177559691cfbbe2720a23d9a81))
* **settings:** Localize settings reset feature ([73af5c4](https://github.com/Hanziness/AnotherPomodoro/commit/73af5c4a8a85a4ffb76fa6061e93fbf46d1d480a))
* **settings:** Settings store can be reset, merge more consistent ([73de8c8](https://github.com/Hanziness/AnotherPomodoro/commit/73de8c8eecf0944bc2186fd165f42f2837a023f2))


### Bug Fixes

* **meta:** Fix empty `start_url` in manifest ([6071553](https://github.com/Hanziness/AnotherPomodoro/commit/607155300e0789d35919db53a30b1bdc0c1437a4))
* **settings:** Highlight i18n locale if preference is not valid ([d8e0bd5](https://github.com/Hanziness/AnotherPomodoro/commit/d8e0bd59b57cadf8e8bc1cabaf97ab75bd6f0893))

## [0.5.0](https://github.com/Hanziness/AnotherPomodoro/compare/v0.4.0...v0.5.0) (2020-12-27)


### Features

* **meta:** Add Facebook and Twitter meta tags ([#51](https://github.com/Hanziness/AnotherPomodoro/issues/51)) ([7a8b337](https://github.com/Hanziness/AnotherPomodoro/commit/7a8b3370a87a2a0f0182e6b067275340ffa90f23))

## [0.4.0](https://github.com/Hanziness/AnotherPomodoro/compare/v0.3.1...v0.4.0) (2020-12-26)


### Features

* Add changelog generation using `standard-version` (see [#46](https://github.com/Hanziness/AnotherPomodoro/issues/46)) ([634d5a5](https://github.com/Hanziness/AnotherPomodoro/commit/634d5a5375feed76b32b8de05499e1573cf655b2))

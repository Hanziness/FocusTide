# ⏳ FocusTide

Free, modern and open-source timer application, right in your browser. Formerly AnotherPomodoro.

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="54">](https://www.buymeacoffee.com/imreg?utm_source=github&utm_medium=web&utm_content=readme) <a href="https://www.producthunt.com/posts/anotherpomodoro?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-focustide" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=327185&theme=light" alt="FocusTide - Modern & customizable productivity timer | Product Hunt" width="250" height="54" /></a>

![Netlify Status](https://api.netlify.com/api/v1/badges/7cb2b7fb-cacd-4acf-803b-8af9dad9f2a8/deploy-status) ![License](https://img.shields.io/github/license/Hanziness/AnotherPomodoro) ![GitHub package.json version](https://img.shields.io/github/package-json/v/Hanziness/AnotherPomodoro) [![Crowdin translation status](https://badges.crowdin.net/anotherpomodoro/localized.svg)](https://crowdin.com/project/anotherpomodoro)

![Screenshot of the application showing a work section.](./public/assets/img/ProductImg_Default.png)

## What is it?

FocusTide is a Pomodoro timer application running in the browser. It helps you manage your time so that you can do more work instead of watching videos of cute cats 😿

## What you get

Here's the looong list of features this app includes.

### ⏰ **Multiple timer styles**
  * (12:34) _traditional_ <br> a classic one with second-precision for those who want to know exactly how much time is left until coffee break
  * (12 minutes) _approximate_ <br> this one displays time with minute-precision so you know how much time is left but your eyes won't stick to the counter since it does not change every second
  * (50%) _percentage_ <br> being even less informative, this one keeps you away from the distraction of calculating "what can I do in the remaining 12 minutes and 34 seconds?".

### 💡 **Friendly, focused and clean user interface**
**It's just the essentials**: a timer in the middle and controls at the bottom. Everything else can be turned off:
  * a quick glance at your schedule at the top
  * a smart to-do list
  * colour-coded sections
  * colourful progress bar in the background

### 📑 **Flexible schedule**
  * adjust the length of your sessions separately or use one of the built-in presets
  * set how frequent long pauses are
  * **track the time spent beyond the timer**, unlike other timers that stop when the time expires

### 🎵 **Multiple ways to notify you**
  * play sounds when you finish a section
  * desktop notifications so you don't have to keep checking your browser

### ⚙ **Plenty of options**
  * set your schedule the way you want it
  * toggle the schedule view, the progress bar or the to-do list
  * enable/disable audio and/or desktop notifications
  * change the number of schedule items shown
  * control your timer using the keyboard
  * dark and light themes
  * ... and more to come in the future!

### ✅ **Clean to-do list**
  * set separate tasks for work, pause and long pause sections
  * only shows your top relevant tasks while the timer is running
  * automatically remove completed tasks at the end of each session
  * remembers your tasks across sessions

### ✨ **Other nice-to-have features**
  * remembers your settings
  * it's a _PWA_ (Progressive Web App): it's fast and you can install it through your browser!
  * fancy and fluid animations
  * setup wizard to get you started
  * translated into 5 languages

### ✔ **No installation required**. 
Just open the webpage and enjoy it! You can even self-host it!

### 👋 **Open development**
Anyone can view the source code, raise issues (feature requests, bug reports) or even submit their own improvements!

## ⚠ Transparency warning
Production deployments (on Netlify or elsewhere) may use third-party (but privacy-friendly) tools to measure site performance.

The app itself does not collect any data (eg. when you're running it on your own machine) 💪

## 🖼 More screenshots
![The display section of the settings panel](./public/assets/img/ProductImg_Settings.png)

![The traditional timer with the to-do panel open](./public/assets/img/ProductImg_TodoOpen.png)
## 🏗 If you're a developer

This is an open-source project that welcomes contributions. Please check the [**contribution guidelines**](./CONTRIBUTING.md) before opening issues, discussions or pull requests!

### ❤ Technologies, packages used

* [**NuxtJS**](https://nuxtjs.org/) (and thus [**VueJS**](https://vuejs.org/))
  * [`vue-i18n`](https://kazupon.github.io/vue-i18n/) for localization
  * [`nuxt/google-fonts`](https://github.com/nuxt-community/google-fonts-module) for Google Fonts support
  * [`pinia`](https://pinia.vuejs.org/) for state management
* [**Tailwind CSS**](https://tailwindcss.com/)
* [Tabler Icons](https://tabler-icons.io/)
* [Workbox](https://github.com/GoogleChrome/workbox) as a PWA service worker
* [`conventional-changelog/standard-version`](https://github.com/conventional-changelog/standard-version) for automatic changelog generation from [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

### 🛠 Building or running the app yourself

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# generate the final static site
$ yarn generate
```

## ☕ Support the project

If you like this project or it has helped you, please consider buying the maintainer a coffee. You won't be annoyed to do so while using the app!

<p align="center"><a href="https://www.producthunt.com/posts/anotherpomodoro?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-focustide" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=327185&theme=light" alt="FocusTide - Modern & customizable productivity timer | Product Hunt" width="250" height="54" /></a></p>

<p align="center"><a href="https://www.buymeacoffee.com/imreg?utm_source=github&utm_medium=web&utm_content=readme"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" width="250"></a></p>

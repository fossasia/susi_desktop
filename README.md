# SUSI Desktop

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e37a7797d5a74af38b009f991d8352f4)](https://www.codacy.com/app/BrainBuzzer/susi_desktop?utm_source=github.com&utm_medium=referral&utm_content=fossasia/susi_desktop&utm_campaign=badger)
[![Join the chat at https://gitter.im/fossasia/susi_desktop](https://badges.gitter.im/fossasia/susi_desktop.svg)](https://gitter.im/fossasia/susi_desktop?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/fossasia/susi_desktop.svg?branch=master)](https://travis-ci.org/fossasia/susi_desktop) [![npm](https://img.shields.io/npm/dt/susi_desktop.svg)](https://www.npmjs.com/package/susi_desktop) [![npm](https://img.shields.io/npm/v/susi_desktop.svg)](https://www.npmjs.com/package/susi_desktop) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![Twitter URL](https://img.shields.io/twitter/url/https/twitter.com/fold_left.svg?style=social&label=Follow%20%40susiai_)](https://twitter.com/susiai_)

> SUSI AI Desktop Client

Susi AI is an intelligent Open Source personal assistant. It is capable of chat and voice interaction by using APIs to perform actions such as music playback, making to-do lists, setting alarms, streaming podcasts, playing audiobooks, and providing weather, traffic, and other real time information. Additional functionalities can be added as console services using external APIs. Susi AI is able to answer questions and depending on the context will ask for additional information in order to perform the desired outcome. The core of the assistant is the Susi AI server that holds the "intelligence" and "personality" of Susi AI. The Android and web applications make use of the APIs to access information from a hosted server.

[![Deploy to Docker Cloud](https://files.cloud.docker.com/images/deploy-to-dockercloud.svg)](https://cloud.docker.com/stack/deploy/?repo=https://github.com/fossasia/susi_desktop)

## Build and Run

The app is based on electron hence make sure that you have electron installed, else simply run `npm i -g electron`.

#### Run the app
```sh
$ sudo npm i -g susi_desktop
$ susi
```

#### Setup locally for development

###### Clone the project
```sh
$ git clone https://github.com/fossasia/susi_desktop.git
$ cd susi_desktop
```

###### Install project dependencies
```sh
$ npm install
```

###### Start the app
```sh
$ npm start
```

###### Screenshots

![Susi Desktop Screenshot](/screenshot/Screenshot.png)

### Contributing

Please adhere to [Contributing](https://github.com/fossasia/susi_desktop/blob/master/CONTRIBUTING.md) guidelines, feel free to contact on [gitter](https://gitter.im/fossasia/susi_desktop) if you have any queries.

# Spießig or not

Tiny app to vote on `spießig` items & rank them

## Demo

- [Landinge Page](https://web.spiessigornot.com)
- [Google Play Store](https://play.google.com/store/apps/details?id=com.prologe.spiessigornot)

## Definition

> spießig
> stuffy, conventional, pasty, boringly traditional -- dict.cc

## Stack

- react-native/expo for cross-platform development
- firebase
- vercel for CD
- firebase for persistance

## Platforms

- web
- iOS
- android

## Features

- upload picture only for "admin"
- vote on items
- create an account / login

## Current State

- db is not well populated

## How-to use

1. Get your firebase [**web** config](https://support.google.com/firebase/answer/7015592?hl=en)
2. Update `.env` with your own config firebase config
3. Add an email address if you want to try the upload feature

## Extra Info

[prologe.io](https://prologe.io) is a app development agency and this app was a way for us to explore cross-platform development.

### Learnings

- facebook login doesn't work on the web version
- maintaining 3 platforms even on this basic project has been hard
- running the code targeting web is practical
  - code reloads quickly so easier to move fast




#### how to make an elilipsis in react-native

```js
{
    width: 250,
    height: 250,
    borderRadius: (250/2),
    transform: [
        {scaleX: 2}
    ],
  },
```

### Questions

Some stuff that I don't know but would be curious to know about:

* how to make a splash screen that works everywhere?
* how can I use react-native animated w/ styled-components?
* what would be a good dev workflow to keep track of all 3 platforms working?
# FX Checker

A polished currency conversion dashboard built with React and Vite. This project brings together live exchange rates, historical trend charts, comparison views, saved favorites, and a persistent conversion log in a single, responsive interface.

## Overview

FX Checker is a Frontend Mentor challenge solution that demonstrates how to build a modern finance-style experience around a real API. The app lets users:

- convert an amount between currencies in real time
- browse and search available currencies
- review market movement for a handful of major pairs
- inspect historical exchange-rate trends over multiple time ranges
- compare a single amount across several currencies
- pin favorite currency pairs and reload them quickly
- keep a local conversion history that survives browser refreshes

## Features

### Currency converter

- Enter an amount and see the converted value update instantly
- Choose the send and receive currencies from a searchable picker
- Swap the selected currencies with one click
- View the live conversion rate for the active pair
- Favorite the current pair and save a conversion entry

### Market ticker

- Display live exchange rates and 24-hour movement for several major pairs
- Highlight positive and negative changes at a glance

### Rate history

- View historical exchange-rate data for the selected pair
- Switch between 1D, 1W, 1M, 3M, 1Y, and 5Y ranges
- Review summary stats including open, last, change, and percentage change

### Compare tab

- See a selected amount converted across multiple currencies at once
- Pin comparison rows to favorites directly from the list

### Favorites and log

- Save favorite currency pairs for quick access later
- Keep a running log of previous conversions
- Clear or delete individual log entries
- Persist favorites and log data using local storage

## Tech stack

- React 19
- Vite 8
- Tailwind CSS
- Recharts for the rate-history chart
- date-fns for relative time formatting
- Frankfurter API for live and historical exchange-rate data

## Project structure

```text
starter-code/
  src/
    components/
    context/
    hooks/
    utils/
    App.jsx
    main.jsx
    index.css
```

## Getting started

1. Install dependencies:

```bash
cd starter-code
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local URL shown in the terminal to view the app in your browser.

## Available scripts

```bash
npm run dev     # start the Vite development server
npm run build   # build the production app
npm run lint    # run ESLint checks
npm run preview # preview the production build locally
```

## API usage

The app uses the Frankfurter API for exchange-rate data:

- latest rates for conversion, comparison, and ticker data
- historical rate ranges for the chart view
- currency metadata for names and flags

No API key is required.

## Accessibility and UX

The interface is designed to be keyboard-friendly and responsive, with:

- visible focus states on interactive elements
- clear empty states for favorites, comparison, and log views
- responsive layouts that adapt across screen sizes
- accessible button and list patterns for core actions

## Persistence

Favorites and the conversion log are stored in the browser with local storage so they remain available after refreshes and revisits.

## Possible improvements

The current implementation is functional and polished, and there are several nice ways to extend it further:

- add a light/dark theme toggle
- persist the active currency pair in the URL for shareable links
- add CSV export for the conversion log
- add offline fallback behavior for temporary API outages

## Credits

This project was built as a Frontend Mentor challenge solution and uses the provided design system and assets as the foundation for the UI.

# React Effects and Refs Exercise

## Deck of Cards

### Solution Notes

Setup

```
mkdir react_effects
cd react_effects

npx create-react-app react_effects_cards

cd react_effects_cards
npm install axios

npm start
```

TBD: add a re-shuffle button and tests

### Part 1: Click to Draw

    Build an app that displays a deck of cards, one card at a time. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card.

    Every time you click the button, display a new card, until there are no cards left in the deck. If you try to draw when there are no cards remaining, an alert message should appear on the screen with the text “Error: no cards remaining!”.

    Our solution has some fancy CSS styling. The goal here is to focus on React and not CSS so please get the core functionality working and then get a code review. Do not focus on CSS at all for now.

Here’s how this might look (with styling added):

![cards.gif](./cards.gif)

### Part 2: Click to Keep Drawing

    Change the behavior of the app, so that when you click on the button, rather than drawing a single card, the page will draw one card every second.

    These draws will continue until you press the button again, or until the deck has been exhausted (at which point the alert message from Part 1 should appear). Make sure to change the button text appropriately as well (for example, it could toggle between “Start drawing” and “Stop drawing.”

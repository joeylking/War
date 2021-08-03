const SUITS = ["❤️", "♦️", "♠️", "♣️"];
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export default class Deck {
  constructor(cards = newDeck()) {
    this.cards = cards;
  }
  get numberOfCards() {
    return this.cards.length;
  }
  pop() {
    return this.cards.shift();
  }
  push(card) {
    this.cards.push(card);
  }
  shuffle() {
    //this.cards.sort((a, b) => Math.random() - 0.5);  would work here, but not truly random
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      //get random index before current card and swap
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  get color() {
    return this.suit === "♣️" || this.suit === "♠️" ? "black" : "red";
  }

  getHTML() {
    const cardDiv = document.createElement("div");
    cardDiv.innerText = this.suit;
    cardDiv.classList.add("card", this.color);
    cardDiv.dataset.value = `${this.value} ${this.suit}`;
    return cardDiv;
  }
}

function newDeck() {
  //flatMap condenses arrays within arrays, so it gives 1 array of 52 cards instead of 4 arrays of 13 cards
  return SUITS.flatMap(suit => {
    return VALUES.map(value => {
      return new Card(suit, value);
    });
  });
}

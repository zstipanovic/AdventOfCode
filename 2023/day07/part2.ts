import * as fs from "fs";

const input = fs.readFileSync("2023/day07/input.txt", "utf8");

const lines = input.split("\n");

let handsAndBid: any = [];
let totalWinnings = 0;

lines.forEach((line) => {
  const parts = line.split(" ");

  const hand = parts[0];
  const bid = parseInt(parts[1]);

  handsAndBid.push({ hand, bid });
});

const enum Card {
  fiveOfAKind = 7,
  fourOfAKind = 6,
  fullHouse = 5,
  threeOfAKind = 4,
  twoPair = 3,
  onePair = 2,
  highCard = 1,
}

const typeOfCards = "AKQT98765432";

function compareHands(hand1: any, hand2: any) {
  const order = "AKQT98765432J";

  for (let i = 0; i < hand1.length; i++) {
    const char1 = hand1[i];
    const char2 = hand2[i];

    const index1 = order.indexOf(char1);
    const index2 = order.indexOf(char2);

    if (index1 !== index2) {
      return index2 - index1;
    }
  }

  return 0; // Both hands are the same
}

function checkNumberOfSameCards(hand: string, sameNumbers: number) {
  const charCounts: any = {};

  for (const char of hand) {
    if (char === "J") {
      for (const specialChar of typeOfCards) {
        charCounts[specialChar] = (charCounts[specialChar] || 0) + 1;

        if (charCounts[specialChar] == sameNumbers) {
          return true;
        }
      }
    }

    charCounts[char] = (charCounts[char] || 0) + 1;

    if (charCounts[char] == sameNumbers) {
      return true;
    }
  }

  return false;
}

function isFullHouse(hand: string) {
  let hasThreeOfAKind = false;
  let hasPair = false;

  for (const jReplacement of typeOfCards) {
    const cardCounts: any = {};

    for (const card of hand) {
      if (card === "J") {
        cardCounts[jReplacement] = (cardCounts[jReplacement] || 0) + 1;
      } else {
        cardCounts[card] = (cardCounts[card] || 0) + 1;
      }
    }

    let localThreeCount = 0;
    let localTwoCount = 0;

    for (const count of Object.values(cardCounts)) {
      if (count === 3) {
        localThreeCount++;
      } else if (count === 2) {
        localTwoCount++;
      }
    }

    if (localThreeCount === 1 && localTwoCount === 1) {
      hasThreeOfAKind = true;
      hasPair = true;
      break;
    }
  }

  return hasThreeOfAKind && hasPair;
}

function isPair(hand: string, pairNumber: number) {
  let hasRequiredPairs = false;

  for (const jReplacement of typeOfCards) {
    const cardCounts: any = {};

    for (const card of hand) {
      if (card === "J") {
        cardCounts[jReplacement] = (cardCounts[jReplacement] || 0) + 1;
      } else {
        cardCounts[card] = (cardCounts[card] || 0) + 1;
      }
    }

    let localPairCount = 0;

    for (const count of Object.values(cardCounts)) {
      if (count === 2) {
        localPairCount++;
      }
    }

    if (localPairCount === pairNumber) {
      hasRequiredPairs = true;
      break;
    }
  }

  return hasRequiredPairs;
}

const handValues = handsAndBid.map((handAndBid: any) => {
  const { hand, bid } = handAndBid;

  if (checkNumberOfSameCards(hand, 5))
    return { hand, bid, handStrength: Card.fiveOfAKind };
  if (checkNumberOfSameCards(hand, 4))
    return { hand, bid, handStrength: Card.fourOfAKind };
  if (isFullHouse(hand)) return { hand, bid, handStrength: Card.fullHouse };
  if (checkNumberOfSameCards(hand, 3))
    return { hand, bid, handStrength: Card.threeOfAKind };
  if (isPair(hand, 2)) return { hand, bid, handStrength: Card.twoPair };
  if (isPair(hand, 1)) return { hand, bid, handStrength: Card.onePair };
  return { hand, bid, handStrength: Card.highCard };
});

handValues.sort((a: any, b: any) => a.handStrength - b.handStrength);

let points = 1;

function mapBidToWinnings(bid: number) {
  const winnings = bid * points;
  points++;
  return winnings;
}

// HighCard
const highCardsSorted = handValues
  .filter((hand: any) => hand.handStrength === Card.highCard)
  .sort((a: any, b: any) => compareHands(a.hand, b.hand))
  .map((hand: any) => mapBidToWinnings(hand.bid));

// OnePair
const onePairSorted = handValues
  .filter((hand: any) => hand.handStrength === Card.onePair)
  .sort((a: any, b: any) => compareHands(a.hand, b.hand))
  .map((hand: any) => mapBidToWinnings(hand.bid));

// TwoPair
const twoPairSorted = handValues
  .filter((hand: any) => hand.handStrength === Card.twoPair)
  .sort((a: any, b: any) => compareHands(a.hand, b.hand))
  .map((hand: any) => mapBidToWinnings(hand.bid));

// ThreeOfAKind
const threeOfAKindSorted = handValues
  .filter((hand: any) => hand.handStrength === Card.threeOfAKind)
  .sort((a: any, b: any) => compareHands(a.hand, b.hand))
  .map((hand: any) => mapBidToWinnings(hand.bid));

// FullHouse
const fullHouseSorted = handValues
  .filter((hand: any) => hand.handStrength === Card.fullHouse)
  .sort((a: any, b: any) => compareHands(a.hand, b.hand))
  .map((hand: any) => mapBidToWinnings(hand.bid));

// FourOfAKind
const fourOfAKindSorted = handValues
  .filter((hand: any) => hand.handStrength === Card.fourOfAKind)
  .sort((a: any, b: any) => compareHands(a.hand, b.hand))
  .map((hand: any) => mapBidToWinnings(hand.bid));

// FiveOfAKind
const fiveOfAKindSorted = handValues
  .filter((hand: any) => hand.handStrength === Card.fiveOfAKind)
  .sort((a: any, b: any) => compareHands(a.hand, b.hand))
  .map((hand: any) => mapBidToWinnings(hand.bid));

const allSorted = [
  ...highCardsSorted,
  ...onePairSorted,
  ...twoPairSorted,
  ...threeOfAKindSorted,
  ...fullHouseSorted,
  ...fourOfAKindSorted,
  ...fiveOfAKindSorted,
];

totalWinnings = allSorted.reduce((a, b) => a + b, 0);

console.log(totalWinnings);

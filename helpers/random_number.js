function matchNumbers() {
    const numeri = [];
    for (let i = 1; i <= 90; i++) {
      numeri.push(i);
    }
    for (let i = numeri.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numeri[i], numeri[j]] = [numeri[j], numeri[i]];
    }
    return numeri;
  }


  module.exports = matchNumbers;
function matchNumbers() {
  let numeri = [];
  for (let i = 1; i <= 90; i++) {
    numeri.push(i);
  }
  for (let i = numeri.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numeri[i], numeri[j]] = [numeri[j], numeri[i]];
  }
  numeri = [0].concat(numeri);
  console.log(numeri.length);
  return numeri;
}

module.exports = matchNumbers;

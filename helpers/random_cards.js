function randomCards(n) {
    let arrays = [];
    for (let i = 0; i < n; i++) {
      let numbers = [];
      while (numbers.length < 20) {
        let randomNumber = Math.floor(Math.random() * 90) + 1;
        if (!numbers.includes(randomNumber)) {
          numbers.push(randomNumber);
        }
      }
      arrays.push(numbers);
    }

    return arrays;
  }

  module.exports = randomCards;
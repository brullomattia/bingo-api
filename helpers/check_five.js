function checkFive(card, extracted_numbers) {
    for (let i = 0; i < 5; i++) {
      let row = card.slice(i * 5, (i + 1) * 5);
      if (row.every(num => extracted_numbers.includes(num))) {
        return true;
      }
    }
    return false;
  }

module.exports = checkFive;
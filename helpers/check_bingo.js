function check_bingo(card, extracted_numbers) {
  for (let i = 0; i < card.length; i++) {
    if (!extracted_numbers.includes(card[i])) {
      // se almeno un numero della cartella non è presente nei numeri estratti, ritorna false
      return false;
    }
  }
  // se tutti i numeri della cartella sono presenti nei numeri estratti, ritorna true
  return true;
}

module.exports = check_bingo;

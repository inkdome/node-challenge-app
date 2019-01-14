export default ranking => {
  ranking.sort((a, b) => a - b)

  for (let i = 1; i < ranking[ranking.length - 1]; i++) {
    if (ranking[i - 1] !== i) {
      return {
        errors: {
          'tattooers.ranking': 'Ranking is not consistent'
        }
      }
    }
  }
}

export default ranking => {
  if (ranking.tattooers && ranking.tattooers.length) {
    const tattooersRanking = ranking.tattooers.map(({ ranking }) => ranking)

    tattooersRanking.sort((a, b) => a - b)

    for (let i = 1; i < tattooersRanking[tattooersRanking.length - 1]; i++) {
      if (tattooersRanking[i - 1] !== i) {
        return {
          errors: {
            'tattooers.ranking': 'Ranking is not consistent'
          }
        }
      }
    }
  }

  return null
}

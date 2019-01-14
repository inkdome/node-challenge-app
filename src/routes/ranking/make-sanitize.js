export default ({ ObjectId }) => ranking => {
  if (ranking.province) {
    ranking.province = (ranking.province.toString() || '').toUpperCase()
  }

  if (ranking.tattooers && ranking.tattooers.length) {
    ranking.tattooers = ranking.tattooers.map(t => Object.assign(t, {
      _id: new ObjectId()
    }))
  }

  return ranking
}

export default ({ Ranking }) => async ranking => {
  ranking.province = (ranking.province.toString() || '').toUpperCase()

  const duplicate = await Ranking.findOne({
    style: ranking.style,
    province: ranking.province
  })

  if (duplicate) {
    return {
      errors: {
        error: 'A ranking for this style and province already exists'
      },
      conflict: duplicate
    }
  }

  return null
}

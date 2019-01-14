export default ({ Tattooer, ObjectId }) => async (req, res) => {
  let $match = {}
  const aggregation = []

  if (req.query.bw) {
    const bw = req.query.bw === 'true' ? true : false
    $match.bw = bw
  }

  if (req.query.color) {
    const color = req.query.color === 'true' ? true : false
    $match.color = color
  }

  if (req.query.province) {
    $match = {
      $or: [
        Object.assign({}, $match, {
          'worksIn.province': req.query.province.toUpperCase(),
          'worksIn.enabled': true
        }),
        Object.assign({}, $match, {
          'worksIn.secondaryProvinces': req.query.province.toUpperCase(),
          'worksIn.enabled': true
        })
      ]
    }
  }

  if (Object.keys($match)) {
    aggregation.push({ $match })
  }

  if (req.query.style) {
    const style = new ObjectId(style)

    aggregation.push({
      $lookup: {
        from: 'rankings',
        localField: '_id',
        foreignField: 'tattooers.tattooer',
        as: 'rankings'
      }
    }, {
      $project: {
        rankings: false
      }
    })
  }

  if (req.query.perPage && req.query.page) {
    const perPage = parseInt(req.query.perPage)
    const page = parseInt(req.query.page) - 1

    aggregation.push({
      $skip: perPage * page
    }, {
      $limit: perPage
    })
  }

  return res.send(await Tattooer.aggregate(aggregation).exec())
}

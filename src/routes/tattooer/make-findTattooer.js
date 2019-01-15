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

  aggregation.push({
    $lookup: {
      from: 'rankings',
      localField: '_id',
      foreignField: 'tattooers.tattooer',
      as: 'rankings'
    }
  }, {
    $unwind: '$rankings'
  })

  if (req.query.style) {
    const style = new ObjectId(req.query.style)

    aggregation.push({
      $match: {
        'rankings.style': style
      }
    })
  }

  aggregation.push({
    // Isolate the single tattooer/ranking duplets
    $unwind: '$rankings.tattooers'
  }, {
    // Create a field that compares the tattooer/ranking duplets with the tattooer's _id
    $addFields: {
      ownRanking: {
        $cmp: ['$rankings.tattooers.tattooer', '$_id']
      }
    }
  }, {
    // Filter the ranking for this tattooer
    $match: {
      ownRanking: 0
    }
  }, {
    // In case there is not a style filter, compute the avg
    // This way we sort tattooers by average ranking
    $group: {
      _id: '$_id',
      avgRanking: {
        $avg: '$rankings.tattooers.ranking'
      }
    }
  }, {
    // Freaking sort
    $sort: {
      avgRanking: 1
    }
  })

  if (req.query.perPage && req.query.page) {
    const perPage = parseInt(req.query.perPage)
    const page = parseInt(req.query.page) - 1

    aggregation.push({
      $skip: perPage * page
    }, {
      $limit: perPage
    })
  }

  // Recover data
  aggregation.push({
    $lookup: {
      from: 'tattooers',
      localField: '_id',
      foreignField: '_id',
      as: 'data'
    }
  })

  return res.send(
    (await Tattooer.aggregate(aggregation).exec())
    // Extract data back to root level
    .map(tattooer => {
      tattooer = Object.assign(tattooer, tattooer.data[0])
      delete tattooer.data
      return tattooer
    })
  )
}

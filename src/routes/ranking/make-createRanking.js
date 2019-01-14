export default ({
  getMongooseErrors, Ranking, getDuplicateError, getRankingConsistencyError, ObjectId
}) => async (req, res) => {
  req.body.province = (req.body.province.toString() || '').toUpperCase()

  /*
  Not using Mongoose validation by design, as it should concern a single path (field)
  while this concerns both province and style.
  */
  try {
    const duplicateError = await getDuplicateError(req.body)

    if (duplicateError) {
      return res.status(409).send(duplicateError)
    }

    req.body.tattooers = (Array.from(req.body.tattooers || [])
    .map(t => Object.assign(t, {
      _id: new ObjectId()
    })))

    // Ranking consistency check!
    const ranking = req.body.tattooers.map(({ ranking }) => parseInt(ranking))
    const rankingConsistencyError = getRankingConsistencyError(ranking)

    if (rankingConsistencyError) {
      return res.status(422).send(rankingConsistencyError)
    }

    // TODO: check that style and tattooers exist?
    // Mongoose doesn't do that, it just dumbly sets the tattooer to null at populate() time.

    return res.status(201).send(
      await new Ranking(req.body).save()
    )
  } catch (ex) {
    return res.status(422).send({
      errors: getMongooseErrors(ex)
    })
  }
}

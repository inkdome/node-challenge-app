export default ({
  getMongooseErrors, Ranking, getDuplicateError, getRankingConsistencyError
}) => async (req, res) => {
  /*
  Not using Mongoose validation by design, as it should concern a single path (field)
  while this concerns both province and style.
  */
  try {
    const ranking = await Ranking.findById(req.params.id)

    if (!ranking) {
      return res.status(404).end()
    }

    ranking.style = ranking.style.toString()

    if (
      (req.body.province && req.body.province !== ranking.province) ||
      (req.body.style && req.body.style !== ranking.style)
    ) {
      const duplicateError = await getDuplicateError({
        province: req.body.province || ranking.province,
        style: req.body.style || ranking.style
      })

      if (duplicateError) {
        return res.status(409).send(duplicateError)
      }
    }

    if (req.body.tattooers) {
      req.body.tattooers = req.body.tattooers.map(t => Object.assign(t, {
        _id: new ObjectId()
      }))

      // Ranking consistency check!
      const ranking = req.body.tattooers.map(({ ranking }) => parseInt(ranking))
      const rankingConsistencyError = getRankingConsistencyError(ranking)

      if (rankingConsistencyError) {
        return res.status(422).send(rankingConsistencyError)
      }
    }

    // TODO: check that style and tattooers exist?
    // Mongoose doesn't do that, it just dumbly sets the tattooer to null at populate() time.

    await Ranking.updateOne({ _id: req.params.id }, req.body)

    return res.send(await Ranking.findById(req.params.id))
  } catch (ex) {
    return res.status(422).send({
      errors: getMongooseErrors(ex)
    })
  }
}

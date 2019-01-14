export default ({
  getMongooseErrors, Ranking, sanitize, getDuplicateError, getConsistencyError
}) => async (req, res) => {
  req.body = sanitize(req.body)

  /*
  Not using Mongoose validation by design, as it should concern a single path (field)
  while this concerns both province and style.
  */
  try {
    const duplicateError = await getDuplicateError(req.body)

    if (duplicateError) {
      return res.status(409).send(duplicateError)
    }

    const rankingConsistencyError = getConsistencyError(req.body)

    if (rankingConsistencyError) {
      return res.status(422).send(rankingConsistencyError)
    }

    // TODO: check that style and tattooers exist?
    // Mongoose doesn't do that, it just dumbly sets the tattooer to null at populate() time.

    return res.status(201).send(
      await new Ranking(req.body).save()
    )
  } catch (ex) {
    console.log(ex)
    return res.status(422).send({
      errors: getMongooseErrors(ex)
    })
  }
}

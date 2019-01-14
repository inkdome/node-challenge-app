export default ({
  getMongooseErrors, Tattooer, getDuplicateError, getConsistencyError, sanitize
}) => async (req, res) => {
  req.body = sanitize(req.body)

  const duplicateError = await getDuplicateError(req.body)

  if (duplicateError) {
    return res.status(409).send(duplicateError)
  }

  const consistencyError = getConsistencyError(req.body)

  if (consistencyError) {
    return res.status(422).send({
      errors: consistencyError
    })
  }

  try {
    return res.status(201).send(
      await new Tattooer(req.body).save()
    )
  } catch(ex) {
    console.log(ex)
    return res.status(422).send({
      errors: getMongooseErrors(ex)
    })
  }
}

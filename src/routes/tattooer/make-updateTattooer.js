export default ({
  getMongooseErrors, Tattooer, getDuplicateError, getConsistencyError, sanitize
}) => async (req, res) => {
  try {
    const tattooer = await Tattooer.findById(req.params.id)

    if (!tattooer) {
      return res.status(404).end()
    }

    req.body = sanitize(req.body)

    const duplicateError = await getDuplicateError(Object.assign(req.body))

    if (duplicateError) {
      return res.status(409).send(duplicateError)
    }

    if (req.body.color === undefined) {
      req.body.color = tattooer.color
    }

    if (req.body.bw === undefined) {
      req.body.bw = tattooer.bw
    }

    const consistencyError = getConsistencyError(req.body)

    if (consistencyError) {
      return res.status(422).send({
        errors: consistencyError
      })
    }

    await Tattooer.updateOne({ _id: req.params.id }, req.body)

    return res.send(await Tattooer.findById(req.params.id))
  } catch (ex) {
    console.log(ex)
    return res.status(422).send({
      errors: getMongooseErrors(ex)
    })
  }
}

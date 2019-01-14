export default ({ getMongooseErrors, Tattooer }) => async (req, res) => {
  try {
    const tattooer = await Tattooer.findById(req.params.id)

    if (!tattooer) {
      return res.status(404).end()
    }

    return res.send(tattooer)
  } catch (ex) {
    console.log(ex)
    return res.status(422).send({
      errors: getMongooseErrors(ex)
    })
  }
}

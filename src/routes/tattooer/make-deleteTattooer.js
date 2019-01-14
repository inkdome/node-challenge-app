export default ({ getMongooseErrors, Tattooer }) => async (req, res) => {
  try {
    const tattooer = await Tattooer.findByIdAndDelete(req.params.id)

    return res.status(tattooer ? 200 : 404).end()
  } catch (ex) {
    console.log(ex)
    return res.status(422).send({
      errors: getMongooseErrors(ex)
    })
  }
}

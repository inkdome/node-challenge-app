export default ({ getMongooseErrors, Style }) => async (req, res) => {
  try {
    const style = await Style.findById(req.params.id)

    if (!style) {
      return res.status(404).end()
    }

    return res.send(style)
  } catch (ex) {
    console.log(ex)
    return res.status(422).send({
      errors: getMongooseErrors(ex)
    })
  }
}

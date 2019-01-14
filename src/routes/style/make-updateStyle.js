export default ({ getMongooseErrors, Style }) => async (req, res) => {
  try {
    const style = await Style.findByIdAndUpdate(req.params.id, req.body)

    if (!style) {
      return res.status(404).end()
    }

    return res.send(await Style.findById(req.params.id))
  } catch (ex) {
    console.log(ex)
    return res.status(422).send({
      errors: getMongooseErrors(ex)
    })
  }
}

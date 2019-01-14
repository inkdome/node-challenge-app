export default ({ getMongooseErrors, Style }) => async (req, res) => {
  try {
    const style = await Style.findByIdAndDelete(req.params.id)

    return res.status(style ? 200 : 404).end()
  } catch (ex) {
    console.log(ex)
    return res.status(422).send({
      errors: getMongooseErrors(ex)
    })
  }
}

export default ({ getMongooseErrors, Style }) => async (req, res) => {
  try {
    return res.status(201).send(
      await new Style(req.body).save()
    )
  } catch (ex) {
    console.log(ex)
    return res.status(422).send({
      errors: getMongooseErrors(ex)
    })
  }
}

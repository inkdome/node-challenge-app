export default ({ getMongooseErrors, Ranking }) => async (req, res) => {
  try {
    const ranking = await Ranking.findByIdAndDelete(req.params.id)

    return res.status(ranking ? 200 : 404).end()
  } catch (ex) {
    console.log(ex)
    return res.status(422).send({
      errors: getMongooseErrors(ex)
    })
  }
}

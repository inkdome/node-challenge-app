export default ({ getMongooseErrors, Ranking }) => async (req, res) => {
  try {
    const ranking = await Ranking.findById(req.params.id)

    if (!ranking) {
      return res.status(404).end()
    }

    return res.send(ranking)
  } catch (ex) {
    console.log(ex)
    return res.status(422).send({
      errors: getMongooseErrors(ex)
    })
  }
}

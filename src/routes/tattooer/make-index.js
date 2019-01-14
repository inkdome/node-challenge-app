export default ({
  Router, createTattooer, getTattooer, updateTattooer, deleteTattooer
}) => Router()
.post('/', createTattooer)
.get('/:id', getTattooer)
.put('/:id', updateTattooer)
.delete('/:id', deleteTattooer)

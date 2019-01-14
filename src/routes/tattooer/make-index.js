export default ({
  Router, createTattooer, getTattooer, updateTattooer, deleteTattooer, findTattooers
}) => Router()
.get('/', findTattooers)
.post('/', createTattooer)
.get('/:id', getTattooer)
.put('/:id', updateTattooer)
.delete('/:id', deleteTattooer)

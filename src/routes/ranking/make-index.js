export default ({
  Router, createRanking, getRanking, updateRanking, deleteRanking
}) => Router()
.post('/', createRanking)
.get('/:id', getRanking)
.put('/:id', updateRanking)
.delete('/:id', deleteRanking)

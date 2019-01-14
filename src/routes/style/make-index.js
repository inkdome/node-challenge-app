export default ({
  Router, createStyle, getStyle, updateStyle, deleteStyle
}) => Router()
.post('/', createStyle)
.get('/:id', getStyle)
.put('/:id', updateStyle)
.delete('/:id', deleteStyle)

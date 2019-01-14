export default ({ Tattooer }) => async tattooer => {
  if (!tattooer.igLink) {
    return null
  }

  const duplicate = await Tattooer.findOne({ igLink: tattooer.igLink })

  if (duplicate) {
    return {
      errors: {
        error: 'A tattooer with this Instagram account already exists'
      },
      conflict: duplicate
    }
  }

  return null
}

export default tattooer => {
  const errors = {}

  if (!tattooer.color && !tattooer.bw) {
    errors.error = 'A tattooer must either work in black&white or in color, or both'
  }

  if (tattooer.worksIn && tattooer.worksIn.length) {
    const worksInProvinces = tattooer.worksIn.map(({ province }) => province)
    const duplicateProvinces = worksInProvinces.filter(
      (p, index) => worksInProvinces.indexOf(p, index + 1) >= 0
    )

    if (duplicateProvinces.length) {
      errors.worksIn = `Duplicate province(s): ${duplicateProvinces.join(', ')}`
    }
  }

  if (Object.keys(errors).length) {
    return errors
  }

  return null
}

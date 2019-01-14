export default ({ ObjectId }) => tattooer => {
  if (tattooer.worksIn && tattooer.worksIn.length) {
    tattooer.worksIn = tattooer.worksIn.map(worksIn => Object.assign(worksIn, {
      _id: new ObjectId(),
      province: worksIn.province.toUpperCase(),
      secondaryProvinces: worksIn.secondaryProvinces && worksIn.secondaryProvinces.length ?
        worksIn.secondaryProvinces.map(p => p.toUpperCase()) :
        []
    }))
  }

  return tattooer
}

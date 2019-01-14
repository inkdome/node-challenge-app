export default exception => {
  if (exception.errors) {
    return Object.keys(exception.errors).reduce(
      (res, key) => Object.assign(res, {
        [key]: exception.errors[key].message
      }),
      {}
    )
  } else {
    return { error: exception.message }
  }
}

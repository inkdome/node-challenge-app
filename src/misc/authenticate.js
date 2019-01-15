export default (req, res, next) => {
  const fail = error => res.status(401).send({
    errors: {
      error
    }
  })

  const keyHeader = req.get('X-Key')

  if (!keyHeader) {
    return fail('Missing authentication header')
  }

  const keyHeaderValue = Buffer.from(keyHeader, 'base64').toString('utf8')
  const timestamp = parseInt(keyHeaderValue)

  if (isNaN(timestamp)) {
    return fail('Invalid authentication header')
  }

  const date = new Date(timestamp)
  const now = new Date()

  if (now - date > 1000) {
    return fail('Your request is expired')
  }

  return next()
}

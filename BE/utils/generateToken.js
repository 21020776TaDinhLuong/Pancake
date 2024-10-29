import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ id }, 'APP', {
    expiresIn: '30d',
  })
}

export default generateToken

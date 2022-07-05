import jwt from 'jsonwebtoken'

// could be change for private and public key
const SECRET = process.env.JWT_SECRET || 'changeme'

export function signJwt (data: object) {
  return jwt.sign(data, SECRET)
}

export function verifyJwt<T> (token: string) {
  return jwt.verify(token, SECRET) as T
}

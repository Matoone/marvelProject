import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

interface AuthTokenObject {
  id: number | undefined;
}

export async function encrypt(password: string) {
  const hashed = await hash(password, 8);

  return hashed;
}

export async function comparePasswords(
  inputPassword: string,
  dbPassword: string
) {
  const isValid = await compare(inputPassword, dbPassword);

  if (!isValid) {
    throw new Error('Invalid password.');
  }
}

export function signToken(userId: number) {
  const token = sign(
    {
      id: userId
    } as AuthTokenObject,
    process.env.JWT_SECRET as string,
    { expiresIn: '7 days' }
  );

  return token;
}

export function verifyToken(token: string) {
  try {
    const decodedToken = verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthTokenObject;
    const userId = decodedToken.id;

    if (!userId) {
      throw new Error('Invalid token');
    }

    return userId;
  } catch (e) {
    console.log('error', e);
    throw e;
  }
}

import { v4 as uuid } from 'uuid';
import { Snapshot } from '../config/buildingBlocks/identity';
import { User as UserGenerated } from '../graphql/generated/types';
import dayjs from 'dayjs';
export interface UserData extends Snapshot {
  id?: string;
  email: string;
  password?: string;
}
export interface User extends UserGenerated {
  id: string;
  email: string;
  password?: string;
}

export interface UserWithToken extends User {
  token: string;
}

export interface UserDataWithToken extends UserData {
  token: string;
}

export function toUser(data: UserData): User {
  return {
    id: data.id ?? uuid(),
    email: data.email,
    password: data.password,
    createdAt: dayjs(data.created_at).toDate(),
    updatedAt: dayjs(data.updated_at).toDate()
  };
}

export function toUserData(object: User): UserData {
  return {
    id: object.id,
    email: object.email,
    password: object.password,
    created_at: dayjs(object.createdAt).format('YYYYMMDD'),
    updated_at: dayjs(object.updatedAt).format('YYYYMMDD')
  };
}

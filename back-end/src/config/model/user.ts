import { toComment, Comment, toCommentData, CommentData } from './comment';
import { v4 as uuid } from 'uuid';
import { Identity, Snapshot } from '../buildingBlocks/identity';
import dayjs from 'dayjs';
export interface UserData extends Snapshot {
  id?: string;
  name: string;
  email: string;
  password?: string;
  comments?: CommentData[] | null;
}
export interface User extends Identity {
  id: string;
  name: string;
  email: string;
  password?: string;
  comments: Comment[];
}

export function toUser(data: UserData): User {
  return {
    id: data.id ?? uuid(),
    name: data.name,
    email: data.email,
    password: data.password,
    comments: data.comments?.length ? data.comments.map(toComment) : [],
    createdAt: dayjs(data.created_at).toDate(),
    updatedAt: dayjs(data.updated_at).toDate()
  };
}

export function toUserData(object: User): UserData {
  return {
    id: object.id,
    name: object.name,
    email: object.email,
    password: object.password,
    comments: object.comments?.length ? object.comments.map(toCommentData) : [],
    created_at: dayjs(object.createdAt).format('YYYYMMDD'),
    updated_at: dayjs(object.updatedAt).format('YYYYMMDD')
  };
}

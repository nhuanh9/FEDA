import {User} from "./user";

export interface Blog {
  id: string,
  title: string,
  content: string,
  createAt: string,
  user: User,
  status: string
}

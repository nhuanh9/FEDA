import {User} from "./user";
import {Post} from "./post";

export interface LikePost {
  id?: number;
  createAt?: string;
  user?: User;
  postEntity?: Post;
  liked?: boolean;

}

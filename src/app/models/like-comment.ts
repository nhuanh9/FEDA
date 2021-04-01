import {User} from "./user";
import {Post} from "./post";
import {CommentForm} from "./comment";


export interface LikeComment {
  id?: number;
  createAt?: string;
  user?: User;
  comment?: CommentForm;
  liked?: boolean;
}

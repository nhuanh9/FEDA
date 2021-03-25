import {User} from "./user";
import {Post} from "./post";

export interface CurrentUserLikePost {
  user?: User;
  post?: Post;
  is_liked?: boolean;
}

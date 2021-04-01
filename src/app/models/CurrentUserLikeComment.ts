import {User} from "./user";
import {CommentForm} from "./comment";

export interface CurrentUserLikeComment {
  user?: User;
  comment?: CommentForm;
  is_liked?: boolean;
}

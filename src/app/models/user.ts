import {Role} from './role';


export interface User {
  id?: number;
  username?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  enabled?: boolean;
  roles?: [Role];
  imageUrls?: string;
}

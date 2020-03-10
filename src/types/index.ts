export interface Club {
  id?: number;
  picture: string;
  photo?: string;
  name: string;
  type: number;
  isManager?: boolean;
  isJoin?: boolean;
  introduction: string;
  createDate?: string;
  address?: string;
}

export interface ClubDetail extends Club {
  members: Array<User>;
}

export type ClubList = Array<Club>;

export interface User {
  id: number;
  profileImagePath?: string;
  weChatNO?: string;
  cellphone?: string;
  address?: string;
  status?: number,
  phone?: string,
  username: string
}

export interface ClubType {
  id: number;
  name: string;
}

export type ClubTypes = Array<ClubType>;

export interface Activity {
  id?: number;
  clubName?: string;
  recruiting?: boolean;
  joined?: boolean;
  status?: number;
  clubId: number;
  name: string;
  picture: string;
  endJoinDate: string;
  startDate: string;
  endDate: string;
  limit: number;
  description: string;
  open: boolean;
  thumbsUp: number;
}

export type Activities = Array<Activity>;

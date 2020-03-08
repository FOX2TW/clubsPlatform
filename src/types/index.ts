export interface Club {
  id: number;
  picture: string;
  photo?: string;
  name: string;
  type: string;
  isManager: boolean;
  isJoin: boolean;
  introduction: string;
  createDate: string;
}

export interface ClubDetail extends Club {
  users: Array<User>;
}

export type ClubList = Array<Club>;

export interface User {
  id: number;
  photo: string;
  displayName: string;
  weChatNO?: string;
  cellphone?: string;
  address?: string;
}

export interface ClubType {
  id: number;
  name: string;
}

export type ClubTypes = Array<ClubType>;

export interface Activity {
  clubId: number;
  clubName: string;
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

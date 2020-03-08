export interface Club {
  id: number;
  picture: string;
  name: string;
  type: string;
  isManager: boolean;
  isJoin: boolean;
  introduction: string;
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

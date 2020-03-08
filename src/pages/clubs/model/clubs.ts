export interface Club {
  id: number
  picture: string
  photo?: string
  name: string
  type: string
  isManager: boolean
  isJoin: boolean
  introduction: string
  createDate: string
}

export interface ClubDetail extends Club{
  users: Array<User>
}

export type ClubList = Array<Club>

export interface User {
  id: number
  photo: string
  displayName: string
  weChatNO?: string
  cellphone?: string
  address?: string
}

export interface Club {
  id: number
  picture: string
  name: string
  type: string
  isManager: boolean
  isJoin: boolean
  introduction: string
}

export type ClubList = Array<Club>

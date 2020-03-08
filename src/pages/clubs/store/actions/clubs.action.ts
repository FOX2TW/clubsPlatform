import {Club} from "../../model/clubs";

export const GET_CLUBS = 'GET_CLUBS';
export const GET_CLUB_DETAIL = 'GET_CLUB_DETAIL';
export const EDIT_CLUB = 'EDIT_CLUB';

export function getClubs() {
  /*const options = {
    url: '/api/club'
  };
  return (dispatch) =>
    fetch(options).then((response) =>
      dispatch({
        type: GET_CLUBS,
        payload: response.data as ClubList
      })
    );*/

  return {
    type: GET_CLUBS,
    payload: [{
      id: 123,
      photo: "avatar",
      name: "篮球俱乐部",
      type: "运动",
      isManager: false,
      isJoin: true,
      introduction: "篮球是中国青少年最喜爱的体育运动之一 中国有着不错的的篮球迷数量，他们关注篮球，并投身到火热的篮球场上去",
    }, {
      id: 124,
      photo: "avatar_java",
      name: "Java俱乐部",
      type: "研发",
      isManager: true,
      isJoin: true,
      introduction: "Java是一门面向对象编程语言,不仅吸收了C++语言的各种优点,还摒弃了C++里难以理解的多继承、指针等概念",
    }, {
      id: 125,
      photo: "avatar_football",
      name: "足球俱乐部",
      type: "运动",
      isManager: false,
      isJoin: false,
      introduction: "足球俱乐部是足球职业化、专业化的一个标志，是足球运动员以足球谋生时，所被聘用的机构。",
    }]
  };
}

export function getClubDetail(id: number) {
  console.log("当前详情页ID：",id);
  return {
    type: GET_CLUB_DETAIL,
    payload: {
      id: 124,
      picture: "clubBackground",
      photo: "avatar_java",
      name: "Java俱乐部",
      type: "研发",
      isManager: true,
      isJoin: true,
      introduction: "Java是一门面向对象编程语言,不仅吸收了C++语言的各种优点,还摒弃了C++里难以理解的多继承、指针等概念",
      createDate: "2020-03-08",
      users: [
        {
          id: 1,
          photo: "jun_li",
          displayName: "Jun Li"
        }, {
          id: 1,
          photo: "hao_lin",
          displayName: "Hao Lin"
        }, {
          id: 1,
          photo: "jiaxin_li",
          displayName: "Jiaxin Li"
        }, {
          id: 1,
          photo: "jiawei_chen",
          displayName: "Jiawei Chen"
        },
      ]
    }
  }
}

export function editClub(clubDetail: Club) {
  return {
    type: EDIT_CLUB,
    clubDetail: clubDetail
  }
}

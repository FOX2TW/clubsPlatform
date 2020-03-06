export const GET_CLUBS = 'GET_CLUBS';

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
      picture: "avatar",
      name: "篮球",
      type: "运动",
      isManager: false,
      isJoin: true,
      introduction: "篮球是中国青少年最喜爱的体育运动之一 中国有着不错的的篮球迷数量，他们关注篮球，并投身到火热的篮球场上去",
    },{
      id: 124,
      picture: "avatar_java",
      name: "Java俱乐部",
      type: "研发",
      isManager: true,
      isJoin: true,
      introduction: "Java是一门面向对象编程语言,不仅吸收了C++语言的各种优点,还摒弃了C++里难以理解的多继承、指针等概念",
    }]
  };
}

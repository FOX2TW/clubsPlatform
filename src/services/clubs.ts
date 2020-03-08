import API from "@/constants/api";
import fetch from "@/utils/request";

export const fetchClubTypes = () => {
  // return fetch({
  //   url: API.getClubType
  // });

  return Promise.resolve({
    data: [
      { id: 1, name: "运动" },
      { id: 2, name: "电竞" },
      { id: 3, name: "棋牌" },
      { id: 4, name: "学习" },
      { id: 0, name: "其它" }
    ]
  });
};

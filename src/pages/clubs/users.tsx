import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { ComponentClass } from "react";
import { AtAvatar, AtButton } from "taro-ui";
import "./users.scss";

type PageStateProps = {};
type PageDispatchProps = {};
type PageOwnProps = {
  // users: Array<User>
  isManager: boolean;
};
type PageState = {};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Users {
  props: IProps;
}

class Users extends Component {
  config: Config = {
    navigationBarTitleText: "用户列表"
  };

  users = [
    {
      id: 1,
      photo: "jun_li",
      displayName: "Jun Li"
    },
    {
      id: 1,
      photo: "hao_lin",
      displayName: "Hao Lin"
    },
    {
      id: 1,
      photo: "jiaxin_li",
      displayName: "Jiaxin Li"
    },
    {
      id: 1,
      photo: "jiawei_chen",
      displayName: "Jiawei Chen"
    }
  ];

  isManager = true;

  render() {
    return (
      <View className="users-container">
        {this.users.map((user, i) => (
          <View key={i} className="user">
            <View className="avatar">
              {/* <AtAvatar image={require(`./../../assets/images/user/${user.photo}.png`)} circle/> */}
            </View>
            <View className="user-name">{user.displayName}</View>
            {this.isManager ? (
              <View className="action">
                <AtButton
                  type="secondary"
                  customStyle="color:red;border-color:red;"
                  size="small"
                >
                  踢出
                </AtButton>
              </View>
            ) : null}
          </View>
        ))}
      </View>
    );
  }
}

export default Users as ComponentClass<PageOwnProps, PageState>;

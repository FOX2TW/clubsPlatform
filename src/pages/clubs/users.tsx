import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { ComponentClass } from "react";
import { AtButton } from "taro-ui";
import "./users.scss";

type PageStateProps = {};
type PageDispatchProps = {};
type PageOwnProps = {};
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

  render() {
    const isManager = this.$router.params["isManager"];
    return (
      <View className="users-container">
        {this.users.map(user => (
          <View key={user.id} className="user">
            <View className="avatar">
              {/* <AtAvatar image={require(`./../../assets/images/user/${user.photo}.png`)} circle/> */}
            </View>
            <View className="user-name">{user.displayName}</View>
            {isManager && (
              <View className="action">
                <AtButton
                  type="secondary"
                  customStyle="color:red;border-color:red;"
                  size="small"
                >
                  踢出
                </AtButton>
              </View>
            )}
          </View>
        ))}
      </View>
    );
  }
}

export default Users as ComponentClass<PageOwnProps, PageState>;

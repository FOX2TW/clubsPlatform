import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { AtAvatar, AtIcon } from "taro-ui";
import { View, Text, Button } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { User as IUser } from "@/types/index";
import { getUserInfo } from "@/actions/users";
import "./index.scss";

type PageStateProps = {
  userInfo: IUser;
};
type PageDispatchProps = {
  getUserInfo: (id) => any;
};
type PageOwnProps = {};
type PageState = {
  userInfo: {
    nickName: string;
    avatarUrl: string;
  };
};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;
interface User {
  props: IProps;
}

@connect(
  ({ users }) => ({
    userInfo: users.userInfo
  }),
  dispatch => ({
    getUserInfo(id) {
      dispatch(getUserInfo(id));
    }
  })
)
class User extends Component {
  config: Config = {
    navigationBarTitleText: "个人中心",
    navigationBarBackgroundColor: "#6190E8",
    navigationBarTextStyle: "white"
    // enablePullDownRefresh: true
  };
  state = {
    userInfo: {
      avatarUrl: "",
      nickName: ""
    }
  };

  componentDidShow() {
    try {
      const userId = Taro.getStorageSync("userId") || 1;
      this.props.getUserInfo(userId);
    } catch (e) {}
  }

  getWxUserInfo = res => {
    // Taro.getUserInfo().then(res => {
    //   console.log(res);
    // });
    const userInfo = JSON.parse(res.detail.rawData);
    this.setState({ userInfo });
  };

  navigate = url => () => {
    Taro.navigateTo({ url });
  };

  render() {
    const { userInfo } = this.props;
    return (
      <View>
        <View className="user-container">
          <View className="avatar-wrapper">
            <View className="info">
              <AtAvatar circle image={userInfo.profileImagePath} size="large" />
              <Text className="name">{userInfo.username}</Text>
            </View>
            <AtIcon
              value="settings"
              size="20"
              color="#fff"
              onClick={this.navigate("/pages/user/setting")}
            />
          </View>
          <View className="item-wrapper">
            <View>
              <Button
                className="item"
                onClick={this.navigate("/pages/user/approve")}
              >
                <Text>我的审批</Text>
                <AtIcon value="chevron-right" size="20" color="#c8c8c8" />
              </Button>
              <Button
                className="item"
                onClick={this.navigate("/pages/user/apply")}
              >
                <Text>我的申请</Text>
                <AtIcon value="chevron-right" size="20" color="#c8c8c8" />
              </Button>
            </View>
            <Button
              className="item extra"
              onClick={this.navigate("/pages/clubs/form")}
            >
              <Text>创建俱乐部</Text>
              <AtIcon value="chevron-right" size="20" color="#c8c8c8" />
            </Button>
            <Button
              className="item extra"
              onClick={this.navigate("/pages/clubs/choose")}
            >
              <Text>发布活动</Text>
              <AtIcon value="chevron-right" size="20" color="#c8c8c8" />
            </Button>
            <Button
              className="item extra"
              onClick={this.navigate("/pages/user/change")}
            >
              <Text>切换用户</Text>
              <AtIcon value="chevron-right" size="20" color="#c8c8c8" />
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default User as ComponentClass<PageOwnProps, PageState>;

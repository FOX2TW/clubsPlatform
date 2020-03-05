import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { AtAvatar, AtIcon } from "taro-ui";
import { get } from "lodash";
import { View, Text, Button } from "@tarojs/components";
import "./index.scss";

type PageStateProps = {};
type PageDispatchProps = {};
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

  componentDidMount() {
    // this.getWxUserInfo();
  }

  getWxUserInfo = res => {
    // Taro.getUserInfo().then(res => {
    //   console.log(res);
    // });
    const userInfo = JSON.parse(get(res, "detail.rawData", ""));
    this.setState({ userInfo });
  };

  navigate = url => () => {
    Taro.navigateTo({ url });
  };

  render() {
    const { userInfo } = this.state;
    return (
      <View>
        <View className="user-container">
          <View className="avatar-wrapper">
            <View className="info">
              <AtAvatar circle image={userInfo.avatarUrl} size="large" />
              <Text className="name">{userInfo.nickName}</Text>
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
                onClick={this.navigate("/pages/user/approve")}
              >
                <Text>我的申请</Text>
                <AtIcon value="chevron-right" size="20" color="#c8c8c8" />
              </Button>
            </View>
            <Button className="item extra">
              <Text>创建俱乐部</Text>
              <AtIcon value="chevron-right" size="20" color="#c8c8c8" />
            </Button>
            <Button className="item extra">
              <Text>发布活动</Text>
              <AtIcon value="chevron-right" size="20" color="#c8c8c8" />
            </Button>
          </View>
        </View>
        <View>
          <Button openType="getUserInfo" onGetUserInfo={this.getWxUserInfo}>
            test get user
          </Button>
        </View>
      </View>
    );
  }
}

export default User as ComponentClass<PageOwnProps, PageState>;

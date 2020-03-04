import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

type PageStateProps = {};
type PageDispatchProps = {};
type PageOwnProps = {};
type PageState = {};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;
interface User {
  props: IProps;
}

class User extends Component {
  config: Config = {
    navigationBarTitleText: "个人中心"
  };

  render() {
    return (
      <View className="index">
        <View>
          <Text>个人中心</Text>
        </View>
      </View>
    );
  }
}

export default User as ComponentClass<PageOwnProps, PageState>;

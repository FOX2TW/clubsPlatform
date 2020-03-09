import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Button, Text, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { connect } from "@tarojs/redux";
import { bindActionCreators } from "redux";

import "./index.scss";

type PageStateProps = {
  counter: {
    num: number;
  };
};

type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Activity {
  props: IProps;
}

@connect(
  () => ({}),
  dispatch => bindActionCreators({}, dispatch)
)
class Activity extends Component {
  config: Config = {
    navigationBarTitleText: "活动",
    navigationBarBackgroundColor: "#6190E8",
    navigationBarTextStyle: "white"
    // enablePullDownRefresh: true
  };

  render() {
    return (
      <View className="activity-container">
        <View className="header-wrapper">
          <Image className="img" src={require("@/images/header-bg.png")} />
          <View className="shadow" />
        </View>
      </View>
    );
  }
}

export default Activity as ComponentClass<PageOwnProps, PageState>;

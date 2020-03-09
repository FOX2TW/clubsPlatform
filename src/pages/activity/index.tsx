import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import dayjs from "dayjs";
import { AtIcon, AtButton } from "taro-ui";
import { connect } from "@tarojs/redux";
import { bindActionCreators } from "redux";

import "./index.scss";

type PageStateProps = {};

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

  navigate = id => {
    Taro.navigateTo({ url: `/pages/activity/detail?id=${id}` });
  };

  renderAvtivityCard = () => {
    return (
      <View className="card">
        <View className="card-head">
          <Text className="text">足球俱乐部</Text>
          <View className="extra">
            <Text>招募中</Text>
          </View>
        </View>
        <View className="content">
          <View className="intro">
            <Text className="name">足球狂欢</Text>
            <Text className="des">
              快来参加我们的活动快来参加我们的活动快来参加我们的活动快来参加...
            </Text>
          </View>
          <View className="handle">
            <AtButton type="primary">立即报名</AtButton>
          </View>
        </View>
        <View className="bottom">
          <Text>报名截止时间：2020-10-22</Text>
          <View onClick={this.navigate}>
            <Text>查看详情</Text>
            {/* arrow-right */}
            <AtIcon value="chevron-right" size="20" />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View className="activity-container">
        <View className="header-wrapper">
          <View className="day-info-wrap">
            <Text className="date">
              {dayjs(Date.now()).format("YYYY.MM.DD")}
            </Text>
            <Text className="day">星期一</Text>
            <Text className="wether">成都市双流区 阴 12℃</Text>
          </View>
          <Image className="img" src={require("@/images/header-bg.png")} />
          <View className="shadow" />
        </View>
        <View className="list">{this.renderAvtivityCard()}</View>
      </View>
    );
  }
}

export default Activity as ComponentClass<PageOwnProps, PageState>;

import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import dayjs from "dayjs";
import { AtIcon, AtButton } from "taro-ui";
import { connect } from "@tarojs/redux";
import { bindActionCreators } from "redux";

import "./detail.scss";

type PageStateProps = {};

type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Detail {
  props: IProps;
}

@connect(
  () => ({}),
  dispatch => bindActionCreators({}, dispatch)
)
class Detail extends Component {
  config: Config = {
    navigationBarTitleText: "活动详情"
    // enablePullDownRefresh: true
  };

  render() {
    return (
      <View className="activity-detail-container">
        <Image className="banner" src={require("@/images/ac.png")}></Image>
        <View className="content">
          <View className="item">
            <View className="label-wrap">
              <Text className="title">俱乐部</Text>
              <Text>：</Text>
            </View>
            <Text className="text">足球俱乐部</Text>
          </View>
          <View className="item">
            <View className="label-wrap">
              <Text className="title">活动名称</Text>
              <Text>：</Text>
            </View>
            <Text className="text">萨里下课之战</Text>
          </View>
          <View className="item">
            <View className="label-wrap">
              <Text className="title">活动时间</Text>
              <Text>：</Text>
            </View>
            <Text className="text">11/11 07:00 - 11/12 18:30</Text>
          </View>
          <View className="item">
            <View className="label-wrap">
              <Text className="title">报名时限</Text>
              <Text>：</Text>
            </View>
            <Text className="text">2020-11-11 12:30</Text>
          </View>
          <View className="item">
            <View className="label-wrap">
              <Text className="title">人数限制</Text>
              <Text>：</Text>
            </View>
            <Text className="text">20人</Text>
          </View>
          <View className="item">
            <View className="label-wrap">
              <Text className="title">活动介绍</Text>
              <Text>：</Text>
            </View>
            <Text className="text">
              由于受不了萨里教练，球迷纷纷组织球赛抗议萨里
            </Text>
          </View>
          <View className="item">
            <View className="label-wrap">
              <Text className="title">参与人</Text>
              <Text>：</Text>
            </View>
            <View className="user-wrap">
              <Text className="user">Jiaxin</Text>
              <Text className="user">Linhao</Text>
              <Text className="user">Lijun</Text>
              <Text className="user">Jiawei</Text>
            </View>
          </View>
        </View>
        <AtButton className="btn" type="primary">
          立即报名
        </AtButton>
      </View>
    );
  }
}

export default Detail as ComponentClass<PageOwnProps, PageState>;

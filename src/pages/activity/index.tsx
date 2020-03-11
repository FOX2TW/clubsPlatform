import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import dayjs from "dayjs";
import { AtIcon, AtButton, AtMessage } from "taro-ui";
import { connect } from "@tarojs/redux";
import { bindActionCreators } from "redux";
import { getActivities, joinActivity } from "@/actions/activity";
import { Activities, Activity as IActivity } from "@/types/index";
import { getWeek } from "@/utils/tools";

import "./index.scss";

type PageStateProps = {
  activities: Activities;
};

type PageDispatchProps = {
  getActivities: () => void;
  joinActivity: (id: string) => any;
};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Activity {
  props: IProps;
}

@connect(
  ({ activity }) => ({
    activities: activity.activities
  }),
  dispatch =>
    bindActionCreators(
      { getActivities, joinActivity } as PageDispatchProps,
      dispatch
    )
)
class Activity extends Component {
  config: Config = {
    navigationBarTitleText: "活动",
    navigationBarBackgroundColor: "#6190E8",
    navigationBarTextStyle: "white"
    // enablePullDownRefresh: true
  };

  navigate = id => () => {
    Taro.navigateTo({ url: `/pages/activity/detail?id=${id}` });
  };

  componentDidShow() {
    this.props.getActivities();
  }

  get sortActivities(): Activities {
    return this.props.activities.sort((pre, next) => pre.status - next.status);
  }

  joinActivity = activity => async () => {
    const { id, memberVisible, clubName, clubId } = activity;
    if (memberVisible) {
      await this.props.joinActivity(id);
      await Taro.atMessage({
        message: "加入俱乐部成功",
        type: "success"
      });
      this.props.getActivities();
    } else {
      Taro.showModal({
        title: "俱乐部提示",
        content: `您还没有加入${clubName},请先申请加入吧`,
        confirmText: "立即申请",
        success: ({ confirm }) => {
          if (confirm) {
            Taro.navigateTo({
              url: `/pages/clubs/detail?clubId=${clubId}`
            });
          }
        }
      });
    }
  };

  render() {
    return (
      <View className="activity-container">
        <AtMessage />
        <View className="header-wrapper">
          <View className="day-info-wrap">
            <Text className="date">
              {dayjs(Date.now()).format("YYYY.MM.DD")}
            </Text>
            <Text className="day">{getWeek()}</Text>
            <Text className="wether">成都市双流区 阴 12℃</Text>
          </View>
          <Image className="img" src={require("@/images/header-bg.png")} />
          <View className="shadow" />
        </View>
        <View className="list">
          {this.sortActivities.map((activity: IActivity) => (
            <View className="card" key={activity.id}>
              <View className="card-head">
                <Text className="text">{activity.clubName}</Text>
                {activity.status === 0 && (
                  <View className="extra">
                    <AtIcon
                      prefixClass="icon"
                      value="huore"
                      size="14"
                      color="red"
                    />
                    <Text>招募中</Text>
                  </View>
                )}
              </View>
              <View className="content">
                <View className="intro">
                  <Text className="name">{activity.name}</Text>
                  <Text className="des">
                    {activity.description.substring(0, 20)}
                  </Text>
                </View>
                <View className="handle">
                  {activity.status === 0 && (
                    <AtButton
                      type="primary"
                      disabled={activity.joined}
                      onClick={this.joinActivity(activity)}
                    >
                      {activity.joined ? "已参加" : "立即报名"}
                    </AtButton>
                  )}
                  {activity.status === 1 && (
                    <AtButton type="primary" disabled>
                      招募结束
                    </AtButton>
                  )}

                  {activity.status === 2 && (
                    <AtButton type="primary" disabled>
                      已开始
                    </AtButton>
                  )}

                  {activity.status === 3 && (
                    <AtButton disabled className="disabled">
                      已结束
                    </AtButton>
                  )}
                </View>
              </View>
              <View className="bottom">
                <Text>
                  报名截止时间：
                  {dayjs(activity.joinEndTime).format("YYYY-MM-DD HH:mm")}
                </Text>
                <View onClick={this.navigate(activity.id)}>
                  <Text>查看详情</Text>
                  <AtIcon value="chevron-right" size="20" />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

export default Activity as ComponentClass<PageOwnProps, PageState>;

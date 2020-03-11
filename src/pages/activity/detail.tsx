import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import dayjs from "dayjs";
import { AtButton, AtMessage } from "taro-ui";
import { connect } from "@tarojs/redux";
import { bindActionCreators } from "redux";
import {
  getActivityDetail,
  joinActivity,
  cancelJoinActivity
} from "@/actions/activity";
import { ActivityDetail } from "@/types/index";
import { get } from "@/utils/tools";
import "./detail.scss";

type PageStateProps = {
  activity: {
    [key: string]: ActivityDetail;
  };
};

type PageDispatchProps = {
  getActivityDetail: (id: string) => void;
  joinActivity: (id: string) => any;
  cancelJoinActivity: (id: string) => any;
};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Detail {
  props: IProps;
}

@connect(
  ({ activity }) => ({
    activity: activity.activity
  }),
  dispatch =>
    bindActionCreators(
      {
        getActivityDetail,
        joinActivity,
        cancelJoinActivity
      } as PageDispatchProps,
      dispatch
    )
)
class Detail extends Component {
  config: Config = {
    navigationBarTitleText: "活动详情"
    // enablePullDownRefresh: true
  };

  componentDidShow() {
    const { id } = this.$router.params;
    this.props.getActivityDetail(id);
  }

  handleJoin = async () => {
    const { id } = this.$router.params;
    const { activity } = this.props;
    const currentActivity = get(activity, id, {});
    const { joined, memberVisible, clubName, clubId } = currentActivity;
    if (memberVisible) {
      try {
        if (joined) {
          await this.props.cancelJoinActivity(id);
        } else {
          await this.props.joinActivity(id);
        }
        Taro.atMessage({
          message: joined ? "取消活动成功" : "加入活动成功",
          type: "success"
        });
        this.props.getActivityDetail(id);
      } catch (err) {}
    } else {
      Taro.showModal({
        title: "俱乐部提示",
        content: `您还没有加入${clubName},请先申请加入吧`,
        confirmText: "立即申请",
        success: ({ confirm }) => {
          if (confirm) {
            Taro.navigateTo({
              url: `/pages/clubs/detail?clubId=${clubId}&isManager=false&isJoin=false`
            });
          }
        }
      });
    }
  };

  editActivity = () => {
    const { id } = this.$router.params;
    const { activity } = this.props;
    const currentActivity = get(activity, id, {});
    Taro.navigateTo({
      url: `/pages/activity/form?activityId=${currentActivity.id}`
    });
  };

  render() {
    const { id } = this.$router.params;
    const { activity } = this.props;
    const currentActivity = get(activity, id, {});
    return (
      <View className="activity-detail-container">
        <AtMessage />
        <Image className="banner" src={currentActivity.picture}></Image>
        <View className="content">
          <View className="item">
            <View className="label-wrap">
              <Text className="title">俱乐部</Text>
              <Text>：</Text>
            </View>
            <Text className="text">{currentActivity.clubName}</Text>
          </View>
          <View className="item">
            <View className="label-wrap">
              <Text className="title">活动名称</Text>
              <Text>：</Text>
            </View>
            <Text className="text">{currentActivity.name}</Text>
          </View>
          <View className="item">
            <View className="label-wrap">
              <Text className="title">活动时间</Text>
              <Text>：</Text>
            </View>
            <Text className="text">
              {dayjs(currentActivity.startDate).format("MM/DD HH:mm")}
              <Text> - </Text>
              {dayjs(currentActivity.endDate).format("MM/DD HH:mm")}
            </Text>
          </View>
          <View className="item">
            <View className="label-wrap">
              <Text className="title">报名时限</Text>
              <Text>：</Text>
            </View>
            <Text className="text">
              {dayjs(currentActivity.endJoinDate).format("YYYY-MM-DD HH:mm")}
            </Text>
          </View>
          <View className="item">
            <View className="label-wrap">
              <Text className="title">人数限制</Text>
              <Text>：</Text>
            </View>
            <Text className="text">
              {currentActivity.limit === 0
                ? "不限制"
                : `${currentActivity.limit}人`}
            </Text>
          </View>
          <View className="item">
            <View className="label-wrap">
              <Text className="title">公开状态</Text>
              <Text>：</Text>
            </View>
            <Text className="text">
              {currentActivity.open ? "公开" : "不公开"}
            </Text>
          </View>
          <View className="item">
            <View className="label-wrap">
              <Text className="title">活动介绍</Text>
              <Text>：</Text>
            </View>
            <Text className="text">{currentActivity.description}</Text>
          </View>
          <View className="item">
            <View className="label-wrap">
              <Text className="title">参与人</Text>
              <Text>：</Text>
            </View>
            <View className="user-wrap">
              {currentActivity.joinedUser.map(user => (
                <Text className="user" key={user.id}>
                  {user.username}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {currentActivity.status === 0 && !currentActivity.manager && (
          <AtButton className="btn" type="primary" onClick={this.handleJoin}>
            {currentActivity.joined ? "取消报名" : "立即报名"}
          </AtButton>
        )}
        {currentActivity.status === 1 && !currentActivity.manager && (
          <AtButton className="btn" type="primary" disabled>
            招募已结束
          </AtButton>
        )}

        {currentActivity.status === 2 && (
          <AtButton className="btn " type="primary" disabled>
            活动已开始
          </AtButton>
        )}
        {currentActivity.status === 3 && (
          <AtButton className="btn disabled" disabled>
            活动已结束
          </AtButton>
        )}
        {(currentActivity.status === 0 || currentActivity.status === 1) &&
          currentActivity.manager && (
            <AtButton
              className="btn"
              type="primary"
              onClick={this.editActivity}
            >
              编辑活动
            </AtButton>
          )}
      </View>
    );
  }
}

export default Detail as ComponentClass<PageOwnProps, PageState>;

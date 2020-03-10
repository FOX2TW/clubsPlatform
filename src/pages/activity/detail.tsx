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
import "./detail.scss";

type PageStateProps = {
  activity: ActivityDetail;
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

  componentDidMount() {
    const { id } = this.$router.params;
    this.props.getActivityDetail(id);
  }

  handleJoin = joined => async () => {
    const { id } = this.$router.params;
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
  };

  render() {
    const { activity } = this.props;
    console.log(activity);
    return (
      <View className="activity-detail-container">
        <AtMessage />
        <Image className="banner" src={activity.picture}></Image>
        <View className="content">
          <View className="item">
            <View className="label-wrap">
              <Text className="title">俱乐部</Text>
              <Text>：</Text>
            </View>
            <Text className="text">{activity.clubName}</Text>
          </View>
          <View className="item">
            <View className="label-wrap">
              <Text className="title">活动名称</Text>
              <Text>：</Text>
            </View>
            <Text className="text">{activity.name}</Text>
          </View>
          <View className="item">
            <View className="label-wrap">
              <Text className="title">活动时间</Text>
              <Text>：</Text>
            </View>
            <Text className="text">
              {dayjs(activity.startDate).format("MM/DD HH:mm")} -
              {dayjs(activity.endDate).format("MM/DD HH:mm")}
            </Text>
          </View>
          <View className="item">
            <View className="label-wrap">
              <Text className="title">报名时限</Text>
              <Text>：</Text>
            </View>
            <Text className="text">
              {dayjs(activity.startDate).format("YYYY-MM-DD HH:mm")}
            </Text>
          </View>
          <View className="item">
            <View className="label-wrap">
              <Text className="title">人数限制</Text>
              <Text>：</Text>
            </View>
            <Text className="text">
              {activity.limit === 0 ? "不限制" : `${activity.limit}人`}
            </Text>
          </View>
          <View className="item">
            <View className="label-wrap">
              <Text className="title">活动介绍</Text>
              <Text>：</Text>
            </View>
            <Text className="text">{activity.description}</Text>
          </View>
          <View className="item">
            <View className="label-wrap">
              <Text className="title">参与人</Text>
              <Text>：</Text>
            </View>
            <View className="user-wrap">
              {activity.joinedUser.map(user => (
                <Text className="user" key={user.id}>
                  {user.username}
                </Text>
              ))}
            </View>
          </View>
        </View>
        {activity.status === 0 && (
          <AtButton
            className="btn"
            type="primary"
            onClick={this.handleJoin(activity.joined)}
          >
            {activity.joined ? "取消报名" : "立即报名"}
          </AtButton>
        )}
        {activity.status !== 0 && (
          <AtButton className="btn disabled" disabled>
            {activity.status === 2 ? "活动已结束" : "活动已开始"}
          </AtButton>
        )}
      </View>
    );
  }
}

export default Detail as ComponentClass<PageOwnProps, PageState>;

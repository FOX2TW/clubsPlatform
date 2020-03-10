import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import dayjs from "dayjs";
import { AtIcon, AtButton } from "taro-ui";
import { connect } from "@tarojs/redux";
import { bindActionCreators } from "redux";
import { getActivityDetail } from "@/actions/activity";
import { Activity } from "@/types/index";
import "./detail.scss";

type PageStateProps = {
  activity: Activity;
};

type PageDispatchProps = {
  getActivityDetail: (id: string) => void;
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
    bindActionCreators({ getActivityDetail } as PageDispatchProps, dispatch)
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
  render() {
    const { activity } = this.props;
    return (
      <View className="activity-detail-container">
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
              {dayjs(activity.startTime).format("MM/DD HH:mm")} -
              {dayjs(activity.endTime).format("MM/DD HH:mm")}
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
              {activity.numberLimitation === 0
                ? "不限制"
                : `${activity.limit}人`}
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
                <Text className="user">{user}</Text>
              ))}
            </View>
          </View>
        </View>
        {activity.status === 0 && (
          <AtButton className="btn" type="primary">
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

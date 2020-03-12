import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { ComponentClass } from "react";
import { AtButton, AtTag, AtAvatar, AtIcon, AtFab } from "taro-ui";
import { getClubDetail, getClubTypes } from "@/actions/clubs";
import { getClubActivity } from "@/actions/activity";
import { ClubDetail, ClubTypes, Activities } from "@/types/index";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import Empty from "@/components/Empty/index";
import { get } from "@/utils/tools";

import "./detail.scss";

type PageStateProps = {
  clubDetail: {
    [key: number]: ClubDetail;
  };
  types: ClubTypes;
  clubActivity: {
    [key: number]: Activities;
  };
};
type PageDispatchProps = {
  getClubDetail: (id) => void;
  getClubTypes: () => void;

  getClubActivity: (id) => any;
};
type PageOwnProps = {};
type PageState = {};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Detail {
  props: IProps;
}

@connect(
  ({ clubs, activity }) => ({
    clubDetail: clubs.clubDetail,
    types: clubs.types,
    clubActivity: activity.clubActivity
  }),
  dispatch =>
    bindActionCreators(
      {
        getClubDetail,
        getClubTypes,
        getClubActivity
      } as PageDispatchProps,
      dispatch
    )
)
class Detail extends Component {
  config: Config = {
    navigationBarTitleText: "俱乐部详情"
  };

  get clubTypes() {
    return this.props.types.reduce((a, b) => {
      return { ...a, [b.id]: b.name };
    }, {});
  }

  componentDidShow() {
    const { clubId } = this.$router.params;
    this.props.getClubDetail(clubId);
    this.props.getClubTypes();
    this.props.getClubActivity(clubId);
  }

  navigate = url => () => {
    Taro.navigateTo({ url });
  };

  render() {
    const { clubId } = this.$router.params;
    const { clubActivity, clubDetail } = this.props;
    const detail = get(clubDetail, clubId, {});
    const activityList = get(clubActivity, clubId, []);
    return (
      <View className="club-detail-container">
        <Image className="picture" src={detail.picture} />
        <View className="card-wrapper">
          <View className="info-title">
            <Text>基本信息</Text>
          </View>
          <View className="item">
            <View className="label">
              <Text>俱乐部名称</Text>
              <Text>：</Text>
            </View>
            <View className="text">
              <Text>{detail.name}</Text>
            </View>
          </View>
          <View className="item">
            <View className="label">
              <Text>类型</Text>
              <Text>：</Text>
            </View>
            <View className="text">
              <AtTag size="small" active>
                {this.clubTypes[detail.type]}
              </AtTag>
            </View>
          </View>
          <View className="item">
            <View className="label">
              <Text>地区</Text>
              <Text>：</Text>
            </View>
            <View className="text">暂无</View>
          </View>
          <View className="item">
            <View className="label">
              <Text>创建时间</Text>
              <Text>：</Text>
            </View>
            <View className="text">
              <Text>
                {dayjs(detail.createdAt).format("YYYY-MM-DD HH:mm:ss")}
              </Text>
            </View>
          </View>
        </View>
        <View className="card-wrapper">
          <View className="info-title">
            <Text>俱乐部介绍</Text>
          </View>
          <View className="intro">
            <Text>{detail.introduction}</Text>
          </View>
        </View>

        {detail.isApproved && (
          <View className="card-wrapper">
            <View className="info-title">
              <Text>俱乐部会员</Text>
            </View>
            <View className="user-wrapper">
              <View className="users">
                {get(detail, "members", []).map(user => (
                  <View className="user-item" key={user.id}>
                    <AtAvatar circle image={user.profileImagePath}></AtAvatar>
                    <Text>{user.username}</Text>
                  </View>
                ))}
              </View>
              <View
                className="more"
                onClick={this.navigate(
                  `/pages/clubs/member?clubId=${detail.id}`
                )}
              >
                <Text>更多会员</Text>
                <AtIcon value="chevron-right" size="20"></AtIcon>
              </View>
            </View>
          </View>
        )}

        {detail.isApproved && (
          <View className="card-wrapper">
            <View className="info-title">
              <Text>俱乐部活动</Text>
            </View>

            {activityList.map(activity => (
              <View
                className="extra-item"
                key={activity.id}
                onClick={this.navigate(
                  `/pages/activity/detail?id=${activity.id}`
                )}
              >
                <View className="content">
                  <Text className="name">{activity.name}</Text>
                  <Text className="des">{activity.description}</Text>
                </View>
                <View className="right">
                  {activity.status === 0 && (
                    <Text className="note">招募中</Text>
                  )}
                  <AtIcon value="chevron-right" size="20"></AtIcon>
                </View>
              </View>
            ))}
            {activityList.length === 0 && <Empty text="还没有活动哟" />}
          </View>
        )}
        {!detail.isJoin && detail.isApproved && (
          <AtButton
            type="primary"
            className="join-btn"
            onClick={this.navigate(`/pages/clubs/apply?clubId=${detail.id}`)}
          >
            申请加入
          </AtButton>
        )}
        {detail.isJoin && (
          <View
            className="fab"
            onClick={this.navigate(`/pages/clubs/setting?clubId=${detail.id}`)}
          >
            <AtFab>
              <Text className="at-fab__icon at-icon at-icon-settings"></Text>
            </AtFab>
          </View>
        )}
      </View>
    );
  }
}

export default Detail as ComponentClass<PageOwnProps, PageState>;

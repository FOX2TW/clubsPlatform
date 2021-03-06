import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { Button, Text, View } from "@tarojs/components";
import { AtIcon, AtMessage } from "taro-ui";
import { ClubApply, JoinClubApply } from "@/types/index";
import { connect } from "@tarojs/redux";
import {
  cancelCreateClub,
  cancelJoinClub,
  getClubApply,
  getJoinClubApply
} from "@/actions/clubs";
import { bindActionCreators } from "redux";
import Empty from "@/components/Empty/index";
import dayjs from "dayjs";

import "./apply.scss";

type PageStateProps = {
  clubApply: Array<ClubApply>;
  joinClubApply: Array<JoinClubApply>;
};
type PageDispatchProps = {
  getClubApply: () => void;
  getJoinClubApply: () => void;
  cancelCreateClub: (id) => void;
  cancelJoinClub: (id) => void;
};
type PageOwnProps = {};
type PageState = {};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Approve {
  props: IProps;
}

@connect(
  ({ clubs }) => ({
    clubApply: clubs.clubApply,
    joinClubApply: clubs.joinClubApply
  }),
  dispatch =>
    bindActionCreators(
      {
        getClubApply,
        getJoinClubApply,
        cancelCreateClub,
        cancelJoinClub
      } as PageDispatchProps,
      dispatch
    )
)
class Approve extends Component {
  config: Config = {
    navigationBarTitleText: "我的申请"
  };

  componentDidShow() {
    this.props.getClubApply();
    this.props.getJoinClubApply();
  }

  cancelCreateClub = async id => {
    await this.props.cancelCreateClub(id);
    Taro.atMessage({
      message: "俱乐部创建撤销成功",
      type: "success",
      duration: 2000
    });
  };

  cancelJoinClub = async id => {
    await this.props.cancelJoinClub(id);
    Taro.atMessage({
      message: "会员加入撤销成功",
      type: "success",
      duration: 2000
    });
  };

  editClub = clubId => {
    Taro.navigateTo({ url: `/pages/clubs/form?id=${clubId}&apply=true` });
  };

  renderClubApproveCard = item => {
    return (
      <View className="card">
        <AtMessage />
        <View className="card-title-wrap">
          <View>
            <AtIcon
              prefixClass="icon"
              value="chuangjian"
              size="15"
              color="#F00"
            />
            <Text className="title">俱乐部创建</Text>
          </View>
          <Text className="extra">
            {dayjs(item.applyDate).format("YYYY-MM-DD HH:mm:ss")}
          </Text>
        </View>
        <View className="card-content">
          <View className="text-wrapper">
            <Text className="label">创建人：</Text>
            <Text className="text">{item.creatorName}</Text>
          </View>
          <View className="text-wrapper">
            <Text className="label">俱乐部名称：</Text>
            <Text className="text">{item.name}</Text>
          </View>
          <View className="text-wrapper">
            <Text className="label">俱乐部描述：</Text>
            <Text className="text">{item.introduction}</Text>
          </View>
        </View>
        <View className="card-actions">
          <Button
            className="btn"
            onClick={() => this.cancelCreateClub(item.id)}
          >
            撤销
          </Button>
          <Button className="btn" onClick={() => this.editClub(item.id)}>
            编辑
          </Button>
        </View>
      </View>
    );
  };

  renderMemberApproveCard = item => {
    return (
      <View className="card">
        <View className="card-title-wrap">
          <View>
            <AtIcon
              prefixClass="icon"
              value="jiaru"
              size="15"
              color="#6190E8"
            />
            <Text className="title">会员加入</Text>
          </View>
          <Text className="extra">
            {dayjs(item.applyDate).format("YYYY-MM-DD HH:mm:ss")}
          </Text>
        </View>
        <View className="card-content">
          <View className="text-wrapper">
            <Text className="label">申请人：</Text>
            <Text className="text">{item.applicantName}</Text>
          </View>
          <View className="text-wrapper">
            <Text className="label">申请俱乐部：</Text>
            <Text className="text">{item.clubName}</Text>
          </View>
          <View className="text-wrapper">
            <Text className="label">申请理由：</Text>
            <Text className="text">{item.reason}</Text>
          </View>
        </View>
        <View className="card-actions">
          <Button
            className="btn"
            onClick={() => this.cancelJoinClub(item.clubId)}
          >
            撤销
          </Button>
        </View>
      </View>
    );
  };

  render() {
    const applyList = this.props.clubApply;
    const joinList = this.props.joinClubApply;
    return (
      <View className="approve-container">
        {applyList.map(item => (
          <View key={item.id}>{this.renderClubApproveCard(item)}</View>
        ))}

        {joinList.map(item => (
          <View key={item.clubId}>{this.renderMemberApproveCard(item)}</View>
        ))}
        {applyList.length === 0 && joinList.length === 0 && (
          <Empty text="还没有申请记录哟" />
        )}
      </View>
    );
  }
}

export default Approve as ComponentClass<PageOwnProps, PageState>;

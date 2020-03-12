import { ComponentClass } from "react";
import { AtIcon, AtMessage } from "taro-ui";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import dayjs from "dayjs";
import { connect } from "@tarojs/redux";
import {
  approveClub,
  approveJoinClub,
  getClubApprove,
  getJoinClubApprove
} from "@/actions/clubs";
import { ClubApprove, JoinClubApprove } from "@/types/index";
import { bindActionCreators } from "redux";
import Empty from "@/components/Empty/index";

import "./approve.scss";

type PageStateProps = {
  clubApprove: Array<ClubApprove>;
  joinClubApprove: Array<JoinClubApprove>;
};
type PageDispatchProps = {
  getClubApprove: () => void;
  getJoinClubApprove: () => void;
  approveClub: (approveResult) => void;
  approveJoinClub: (approveResult) => void;
};
type PageOwnProps = {};
type PageState = {};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;
interface Approve {
  props: IProps;
}

@connect(
  ({ clubs }) => ({
    clubApprove: clubs.clubApprove,
    joinClubApprove: clubs.joinClubApprove
  }),
  dispatch =>
    bindActionCreators(
      {
        getClubApprove,
        getJoinClubApprove,
        approveClub,
        approveJoinClub
      } as PageDispatchProps,
      dispatch
    )
)
class Approve extends Component {
  config: Config = {
    navigationBarTitleText: "我的审批"
  };

  componentWillMount(): void {
    this.props.getClubApprove();
    this.props.getJoinClubApprove();
  }

  approveClub = async (item, result) => {
    const req = {
      clubId: item.id,
      approveStatus: result
    };
    await this.props.approveClub(req);
    Taro.atMessage({
      message: "已同意俱乐部创建",
      type: "success",
      duration: 2000
    });
  };

  approveJoinClub = async (item, result) => {
    const req = {
      clubId: item.clubId,
      isAgree: result,
      recordId: item.recordId,
      managerComment: ""
    };
    await this.props.approveJoinClub(req);
    Taro.atMessage({
      message: "已同意会员加入",
      type: "success",
      duration: 2000
    });
  };

  onClick = id => () => {
    Taro.navigateTo({ url: `/pages/clubs/detail?clubId=${id}` });
  };

  renderClubApproveCard = item => {
    return (
      <View className="card">
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
        <View className="card-content" onClick={this.onClick(item.id)}>
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
          <Button className="btn" onClick={() => this.approveClub(item, false)}>
            拒绝
          </Button>
          <Button className="btn" onClick={() => this.approveClub(item, true)}>
            同意
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
            onClick={() => this.approveJoinClub(item, false)}
          >
            拒绝
          </Button>
          <Button
            className="btn"
            onClick={() => this.approveJoinClub(item, true)}
          >
            同意
          </Button>
        </View>
      </View>
    );
  };

  render() {
    const clubApprove = this.props.clubApprove;
    const joinClubApprove = this.props.joinClubApprove;
    return (
      <View className="approve-container">
        <AtMessage />
        {clubApprove.map(item => (
          <View key={item.id}>{this.renderClubApproveCard(item)}</View>
        ))}
        {joinClubApprove.map(item => (
          <View key={item.applicantId}>
            {this.renderMemberApproveCard(item)}
          </View>
        ))}
        {clubApprove.length === 0 && joinClubApprove.length === 0 && (
          <Empty text="还没有审批记录哟" />
        )}
      </View>
    );
  }
}

export default Approve as ComponentClass<PageOwnProps, PageState>;

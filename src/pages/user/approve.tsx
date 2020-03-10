import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import "./approve.scss";
import {connect} from "@tarojs/redux";
import {getClubApprove, getJoinClubApprove} from "@/actions/clubs";
import {ClubApprove, JoinClubApprove} from "@/types/index";

type PageStateProps = {
  clubApprove: Array<ClubApprove>
  joinClubApprove: Array<JoinClubApprove>
};
type PageDispatchProps = {
  getClubApprove: () => void
  getJoinClubApprove: () => void
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
  }),dispatch => ({
    getClubApprove(){
      dispatch(getClubApprove())
    },
    getJoinClubApprove(){
      dispatch(getJoinClubApprove())
    }
  })
)
class Approve extends Component {
  config: Config = {
    navigationBarTitleText: "我的审批"
  };

  componentWillMount(): void {
    this.props.getClubApprove();
    this.props.getJoinClubApprove()
  }

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
          <Text className="extra">{item.applyDate}</Text>
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
          <Button className="btn">拒绝</Button>
          <Button className="btn">同意</Button>
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
          <Text className="extra">{item.applyDate}</Text>
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
            <Text className="text">{item.reson}</Text>
          </View>
        </View>
        <View className="card-actions">
          <Button className="btn">拒绝</Button>
          <Button className="btn">同意</Button>
        </View>
      </View>
    );
  };

  render() {
    const clubApprove = this.props.clubApprove;
    const joinClubApprove = this.props.joinClubApprove;
    return (
      <View className="approve-container">
        {clubApprove.map(item => (
          <View key={item.id}>
            {this.renderClubApproveCard(item)}
          </View>
        ))}
        {joinClubApprove.map(item => (
          <View key={item.applicantId}>
            {this.renderMemberApproveCard(item)}
          </View>
        ))}
      </View>
    );
  }
}

export default Approve as ComponentClass<PageOwnProps, PageState>;

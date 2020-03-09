import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { ComponentClass } from "react";
import { AtAvatar, AtButton, AtCard, AtList, AtListItem } from "taro-ui";
import {getClubDetail, getClubTypes} from "@/actions/clubs";
import "./detail.scss";
import {ClubDetail, ClubTypes} from "@/types/index";

type PageStateProps = {
    clubDetail: ClubDetail;
    types: ClubTypes;
};
type PageDispatchProps = {
  getClubDetail: (id) => void;
  getClubType: () => void;
};
type PageOwnProps = {};
type PageState = {};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Detail {
  props: IProps;
}

@connect(
  ({ clubs }) => ({
    clubDetail: clubs.clubDetail,
    types: clubs.types
  }),
  dispatch => ({
    getClubDetail(id) {
      dispatch(getClubDetail(id));
    },
    getClubType(){
      dispatch(getClubTypes())
    }
  })
)
class Detail extends Component {
  config: Config = {
    navigationBarTitleText: "俱乐部详情"
  };

  navigate = url => () => {
    Taro.navigateTo({ url });
  };

  User(user) {
    return (
      <View key={user.id} className="user">
        {/* <AtAvatar
          className="avatar"
          circle
          image={user.profileImagePath}
        />*/}
        <View className="name">{user.username}</View>
      </View>
    );
  }

  componentWillMount(): void {
    this.props.getClubDetail(parseInt(this.$router.params["clubId"]));
    this.props.getClubType();
  }

  render() {
    const detail = this.props.clubDetail;
    const types = this.props.types.reduce((a,b) => {return {...a, [b.id]: b.name}}, {});
    const isManager = this.$router.params["isManager"];
    const isJoin = this.$router.params["isJoin"];
    console.log("isManager:",isManager,"   isJoin:",isJoin);
    return (
      <View className="detail-container">
        <Image
          className="at-row"
          src={detail.picture}
        />

        <AtCard
          className="base-info"
          title={detail.name}
          // thumb={require(`./../../assets/images/club/${detail.photo}.jpg`)}
          extra={isManager=="true" ? "编辑" : ""}
          onClick={() => isManager=="true" && Taro.navigateTo({ url: "/pages/clubs/edit" })}
        >
          <View className="info-list">
            <View className="text-wrapper">
              <View className="label" style="align-self: center;">
                类别：
              </View>
              <View className="text" style="align-self: center;">
                <AtButton
                  type="secondary"
                  customStyle="height: 20px; padding-top:0; line-height: 40rpx;"
                  size="small"
                >
                  {types[detail.type]}
                </AtButton>
              </View>
            </View>
            <View className="text-wrapper">
              <View className="label">创建时间：</View>
              <View className="text">{detail.createDate}</View>
            </View>
            {detail.address && <View className="text-wrapper">
              <View className="label">地址：</View>
              <View className="text">{detail.address}</View>
            </View>}
            <View className="text-wrapper">
              <View className="label">简介：</View>
              <View className="text">{detail.introduction}</View>
            </View>
          </View>
        </AtCard>

        <AtCard
          title="会员"
          extra="所有会员"
          // thumb={require('./../../assets/images/club/avatar.jpg')}
          onClick={this.navigate(`/pages/clubs/users?isManager=${isManager}`)}
        >
          <View className="users">
            {detail.members && detail.members.length > 0
              ? detail.members.map(user => this.User(user))
              : "还没有会员"}
          </View>
        </AtCard>

        <AtCard
          title="活动"
          extra="历史活动"
          // thumb={require('./../../assets/images/club/avatar.jpg')}
        >
          <View className="activity">
            <AtList>
              <AtListItem
                title="活动1"
                onClick={() => console.log("跳转到活动详情")}
              />
              <AtListItem title="活动2" arrow="right" />
              <AtListItem title="活动2" extraText="详细信息" />
              <AtListItem title="活动2" disabled extraText="详细信息" />
            </AtList>
          </View>
        </AtCard>
      </View>
    );
  }
}

export default Detail as ComponentClass<PageOwnProps, PageState>;

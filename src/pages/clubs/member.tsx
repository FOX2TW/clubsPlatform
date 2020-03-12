import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { ComponentClass } from "react";
import { AtSwipeAction, AtAvatar } from "taro-ui";
import { connect } from "@tarojs/redux";
import { ClubDetail, User } from "@/types/index";
import { deleteClubMember } from "@/actions/clubs";
import { get } from "@/utils/tools";
import "./member.scss";

type PageStateProps = {
  clubDetail: {
    [key: number]: ClubDetail;
  };
  userInfo: User;
};
type PageDispatchProps = {
  deleteClubMember: (userId, clubId) => void;
};

type PageState = {};
type IProps = PageStateProps & PageDispatchProps;

interface Member {
  props: IProps;
}

@connect(
  ({ clubs, users }) => ({
    clubDetail: clubs.clubDetail,
    userInfo: users.userInfo
  }),
  dispatch => ({
    deleteClubMember(userId, clubId) {
      dispatch(deleteClubMember(userId, clubId));
    }
  })
)
class Member extends Component {
  config: Config = {
    navigationBarTitleText: "俱乐部会员"
  };

  swipeOptions = [
    {
      text: "设置管理",
      style: {
        backgroundColor: "#6190E8"
      }
    },
    {
      text: "踢出",
      style: {
        backgroundColor: "#FF4949"
      }
    }
  ];

  deleteClubMember = member => {
    Taro.showModal({
      title: "踢出会员提示",
      content: "确定要踢出该会员吗？",
      confirmText: "确定",
      success: async ({ confirm }) => {
        if (confirm) {
          const { clubId } = this.$router.params;
          const detail = get(this.props.clubDetail, clubId, {});
          await this.props.deleteClubMember(member.id, detail.id);
          Taro.navigateBack();
        }
      }
    });
  };

  handleClick = ({ text }, member) => {
    if (text === "设置管理") {
      Taro.showModal({
        title: "提示",
        content: "功能建设中"
      });
    } else {
      this.deleteClubMember(member);
    }
  };

  render() {
    const { clubId } = this.$router.params;
    const detail = get(this.props.clubDetail, clubId, {});
    const userId = this.props.userInfo.id || Taro.getStorageSync("userId") || 1;
    return (
      <View className="member-container">
        {get(detail, "members", []).map(member => (
          <AtSwipeAction
            key={member.id}
            options={this.swipeOptions}
            onClick={opotion => this.handleClick(opotion, member)}
            disabled={!detail.isManager || Number(userId) === member.id}
          >
            <View className="item">
              <AtAvatar circle image={member.profileImagePath}></AtAvatar>
              <View className="info">
                <Text className="name">{member.username}</Text>
                <View className="des">
                  <Text className="email">邮箱：{member.email}</Text>
                </View>
              </View>
            </View>
          </AtSwipeAction>
        ))}
      </View>
    );
  }
}

export default Member as ComponentClass<IProps, PageState>;

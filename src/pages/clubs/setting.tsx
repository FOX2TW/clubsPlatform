import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { ComponentClass } from "react";
import { AtIcon } from "taro-ui";
import { quitClub } from "@/actions/clubs";
import { ClubDetail } from "@/types/index";
import { bindActionCreators } from "redux";
import { get } from "@/utils/tools";

import "./setting.scss";

type PageStateProps = {
  clubDetail: ClubDetail;
};
type PageDispatchProps = {
  quitClub: (id) => any;
};

type IProps = PageStateProps & PageDispatchProps;

interface ClubSetting {
  props: IProps;
}

@connect(
  ({ clubs }) => ({
    clubDetail: clubs.clubDetail
  }),
  dispatch =>
    bindActionCreators(
      {
        quitClub
      } as PageDispatchProps,
      dispatch
    )
)
class ClubSetting extends Component {
  config: Config = {
    navigationBarTitleText: "俱乐部管理"
  };

  menberMannager = () => {
    const { clubId } = this.$router.params;
    Taro.navigateTo({ url: `/pages/clubs/member?clubId=${clubId}` });
  };

  editClub = () => {
    const { clubId } = this.$router.params;
    Taro.navigateTo({ url: `/pages/clubs/form?id=${clubId}` });
  };

  quitClub = async () => {
    Taro.showModal({
      title: "提示",
      content: "您确定要退出该俱乐部吗？",
      confirmText: "确定",
      success: async ({ confirm }) => {
        if (confirm) {
          const { clubId } = this.$router.params;
          await this.props.quitClub(clubId);
          Taro.switchTab({ url: "/pages/clubs/index" });
        }
      }
    });
  };

  render() {
    const { clubId } = this.$router.params;
    const { isManager } = get(this.props.clubDetail, clubId, {});
    return (
      <View className="club-setting-container">
        {isManager && (
          <View className="item" onClick={this.editClub}>
            <Text>编辑俱乐部</Text>
            <AtIcon value="chevron-right" size="20"></AtIcon>
          </View>
        )}
        {isManager && (
          <View className="item" onClick={this.menberMannager}>
            <Text>会员管理</Text>
            <AtIcon value="chevron-right" size="20"></AtIcon>
          </View>
        )}
        <View className="item" onClick={this.quitClub}>
          <Text>退出俱乐部</Text>
          <AtIcon value="chevron-right" size="20"></AtIcon>
        </View>
      </View>
    );
  }
}

export default ClubSetting as ComponentClass<IProps>;

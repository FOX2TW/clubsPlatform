import {ComponentClass} from "react";
import Taro, {Component, Config} from "@tarojs/taro";
import {connect} from "@tarojs/redux";
import {Text, View} from "@tarojs/components";

import {AtButton, AtForm, AtInput, AtTextarea} from "taro-ui";
import {joinClub} from "@/actions/clubs";

import "./form.scss";

type PageStateProps = {};
type PageDispatchProps = {
  joinClub: (joinClub) => void
};
type PageOwnProps = {};
type PageState = {};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface ClubApply {
  props: IProps;
}

@connect(
  () => ({}),
  dispatch => ({
    joinClub(joinInfo) {
      dispatch(joinClub(joinInfo));
    }
  })
)
class ClubApply extends Component {

  config: Config = {
    navigationBarTitleText: "申请加入俱乐部"
  };

  state = {
    cellphone: '',
    reason: '',
    weChatNo: '',
  };

  onSubmit = () => {
    const joinInfo = {
      cellphone: this.state.cellphone,
      reason: this.state.reason,
      weChatNo: this.state.weChatNo,
      clubId: parseInt(this.$router.params["clubId"])
    };
    this.props.joinClub(joinInfo);
    Taro.navigateBack();
  };
  cellphoneInputChange = cellphone => {
    this.setState({cellphone});
  };

  weChatNOInputChange = cellphone => {
    this.setState({cellphone});
  };

  introInputChange = e => {
    this.setState({reason: e.target.value});
  };


  render() {
    const {
      cellphone,
      reason,
      weChatNo
    } = this.state;
    return (
      <View className="club-form-container">
        <AtForm onSubmit={this.onSubmit}>
          <View className="form-item">
            <View className="label-wrap">
              <Text className="label">手机号码：</Text>
            </View>
            <AtInput
              name="value"
              type="text"
              placeholder="请输入手机号"
              value={cellphone}
              onChange={this.cellphoneInputChange}
            />
          </View>
          <View className="form-item">
            <View className="label-wrap">
              <Text className="label">微信号：</Text>
            </View>
            <AtInput
              name="value"
              type="text"
              placeholder="请输入微信号"
              value={weChatNo}
              onChange={this.weChatNOInputChange}
            />
          </View>
          <View className="form-item">
            <View className="label-wrap">
              <Text className="required">*</Text>
              <Text className="label">入会理由：</Text>
            </View>
            <AtTextarea
              count
              value={reason}
              onChange={this.introInputChange}
              maxLength={400}
              placeholder="请输入入会理由"
            />
          </View>
          <AtButton formType="submit" type="primary">
            提交
          </AtButton>
        </AtForm>
      </View>
    );
  }
}

export default ClubApply as ComponentClass<PageOwnProps, PageState>;

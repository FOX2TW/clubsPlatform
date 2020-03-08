import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { ComponentClass } from "react";
import { AtButton, AtForm, AtInput, AtTextarea } from "taro-ui";
import { Club, ClubDetail } from "@/types";
import { connect } from "@tarojs/redux";
import { editClub } from "@/actions/clubs";

type PageStateProps = {
  clubs: {
    clubDetail: Club;
  };
  isManager: boolean;
};
type PageDispatchProps = {
  editClub: (cubDetail: Club) => any;
};
type PageOwnProps = {};
type PageState = {
  club: Club;
};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface ClubInfoEdit {
  props: IProps;
}

@connect(
  ({ clubs }) => ({
    clubs
  }),
  dispatch => ({
    editClub(cubDetail) {
      dispatch(editClub(cubDetail));
    }
  })
)
class ClubInfoEdit extends Component {
  config: Config = {
    navigationBarTitleText: "俱乐部信息编辑"
  };

  state = {
    club: {
      id: 0,
      picture: "",
      name: "",
      type: "",
      isManager: false,
      isJoin: false,
      introduction: "",
      createDate: ""
    }
  };

  isManager = true;

  componentWillMount(): void {
    this.setState({
      club: this.props.clubs.clubDetail
    });
  }

  handleChange(key, value) {
    this.setState({
      club: {
        ...this.state.club,
        [key]: value
      }
    });
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    console.log("当前state里是啥", this.state);
    return value;
  }

  edit() {
    console.log(this.state.club);
    this.props.editClub(this.state.club);
    Taro.navigateBack();
  }

  render() {
    return (
      <View className="users-container">
        <AtForm>
          <AtInput
            name="value1"
            title="俱乐部名称"
            type="text"
            value={this.state.club.name}
            onChange={v => this.handleChange("name", v)}
          />
          <AtInput
            name="value1"
            title="类型"
            type="text"
            value={this.state.club.type}
            onChange={v => this.handleChange("type", v)}
          />
          <View style="padding: 15px 0 15px 15px;">简介</View>
          <AtTextarea
            value={this.state.club.introduction}
            onChange={v => this.handleChange("introduction", v.target.value)}
          />
        </AtForm>
        <AtButton
          type="primary"
          customStyle="margin-top: 10px;"
          onClick={() => this.edit()}
        >
          提交
        </AtButton>
      </View>
    );
  }
}

export default ClubInfoEdit as ComponentClass<PageOwnProps, PageState>;

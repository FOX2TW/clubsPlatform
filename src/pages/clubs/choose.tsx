import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { ComponentClass } from "react";
import { connect } from "@tarojs/redux";
import { bindActionCreators } from "redux";
import { AtRadio, AtButton } from "taro-ui";
import { getMyclubs } from "@/actions/clubs";
import { ClubList } from "@/types/index";
import "./choose.scss";

type PageStateProps = {
  myClubs: ClubList;
};

type PageDispatchProps = {
  getMyclubs: (id: number) => void;
};

type PageState = {
  value: string;
};
type IProps = PageStateProps & PageDispatchProps;

interface ClubsChoose {
  props: IProps;
}

@connect(
  ({ clubs }) => ({
    myClubs: clubs.myClubs
  }),
  dispatch => bindActionCreators({ getMyclubs } as PageDispatchProps, dispatch)
)
class ClubsChoose extends Component {
  config: Config = {
    navigationBarTitleText: "选择俱乐部"
  };

  state = {
    value: ""
  };

  componentDidMount() {
    const userId = 1;
    this.props.getMyclubs(userId);
  }

  get radioOptions() {
    const { myClubs } = this.props;
    return myClubs.map(club => ({
      label: club.name,
      value: Number(club.id),
      disabled: !club.isManager
    }));
  }

  handleChange = value => {
    this.setState({ value });
  };

  next = () => {
    const { value } = this.state;
    Taro.navigateTo({ url: `/pages/activity/form?id=${value}` });
  };

  renderEmpty = () => {
    return (
      <View>
        <Text>您还未加入任何俱乐部哦</Text>
      </View>
    );
  };

  render() {
    return (
      <View className="club-choose-container">
        <View className="title-wrap">
          <View className="line" />
          <Text className="title">选择俱乐部</Text>
        </View>
        <View className="item-wrap">
          <AtRadio
            options={this.radioOptions}
            value={this.state.value}
            onClick={this.handleChange}
          />
        </View>
        <AtButton
          type="primary"
          onClick={this.next}
          disabled={!this.state.value}
        >
          下一步
        </AtButton>
      </View>
    );
  }
}

export default ClubsChoose as ComponentClass<IProps, PageState>;

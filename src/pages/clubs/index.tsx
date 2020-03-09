import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import {AtTabs, AtTabsPane} from "taro-ui";
import { connect } from "@tarojs/redux";
import { getClubs } from "@/actions/clubs";
import {ClubList} from "@/types/index";
import ClubItem from "@/components/ClubItem";

import "./index.scss";

type PageStateProps = {
  clubs: ClubList;
};
type PageDispatchProps = {
  getClubs: () => void;
};
type PageOwnProps = {};
type PageState = {
  currentPage: number;
};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Clubs {
  props: IProps;
}

@connect(
  ({ clubs }) => ({
    clubs: clubs.clubs,
  }),
  dispatch => ({
    getClubs() {
      dispatch(getClubs());
    }
  })
)
class Clubs extends Component {
  config: Config = {
    navigationBarTitleText: "俱乐部"
  };

  state = {
    currentPage: 0
  };

  handleClick(value) {
    this.setState({
      currentPage: value
    });
  }

  navigate = url => () => {
    Taro.navigateTo({ url });
  };

  componentWillMount(): void {
    this.props.getClubs();
  }

  render() {
    const allClubs = this.props.clubs;
    const tabList = [{ title: '我的俱乐部' }, { title: '俱乐部列表' }];
    return (
      <View className="index">
        <AtTabs current={this.state.currentPage} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.currentPage} index={0} >
              <View className="tab-content">
                {//前期俱乐部较少时，获取所有俱乐部，并且过滤显示我的俱乐部
                  allClubs
                    .filter(club => club.isJoin)
                    .map(club => (
                      <View key={club.id}>
                        <ClubItem
                          club={club}
                          isNotMyClub={false}
                          onClick={this.navigate(
                            `/pages/clubs/detail?clubId=${club.id}&isManager=${club.isManager}&isJoin=${club.isJoin}`
                          )}
                        />
                      </View>
                    ))}
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.currentPage} index={1}>
              <View className="tab-content">
              {allClubs.map(club => (
                <View key={club.id}>
                  <ClubItem
                    club={club}
                    isNotMyClub
                    onClick={this.navigate(`/pages/clubs/detail?clubId=${club.id}&isManager=${club.isManager}&isJoin=${club.isJoin}`)}
                  />
                </View>
              ))}
              </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}

export default Clubs as ComponentClass<PageOwnProps, PageState>;

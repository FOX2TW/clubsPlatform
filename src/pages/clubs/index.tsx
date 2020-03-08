import {ComponentClass} from "react";
import Taro, {Component, Config} from "@tarojs/taro";
import {View} from "@tarojs/components";

import "./index.scss";
import {connect} from "@tarojs/redux";
import {getClubs} from "./store/actions/clubs.action";
import {ClubList} from "./model/clubs";
import ClubItem from './item';
import {AtSegmentedControl} from "taro-ui";

type PageStateProps = {
  currentUserId: number
  clubs: {
    clubs: ClubList
  }
};
type PageDispatchProps = {
  getClubs: () => void
};
type PageOwnProps = {};
type PageState = {
  currentPage: number
};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Clubs {
  props: IProps
}


@connect(
  ({clubs}) => ({
    clubs
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

  handleClick (value) {
    this.setState({
      currentPage: value
    })
  }

  navigate = url => () => {
    Taro.navigateTo({url});
  };

  componentWillMount(): void {
    this.props.getClubs()
  }

  render() {
    const allClubs = this.props.clubs.clubs
    return (
      <View className='index'>
        <AtSegmentedControl
          values={['我的俱乐部', '俱乐部列表']}
          onClick={this.handleClick.bind(this)}
          current={this.state.currentPage}
        />
        {
          this.state.currentPage === 0
            ? <View className='tab-content'>
                { //前期俱乐部较少时，获取所有俱乐部，并且过滤显示我的俱乐部
                  allClubs.filter(club => club.isJoin).map((club, i) =>
                    <View key={i}>
                      <ClubItem  club={club} isNotMyClub={false} onClick={this.navigate(`/pages/clubs/detail?clubId=${club.id}`)} />
                    </View>
                  )
                }
            </View>
            : null
        }
        {
          this.state.currentPage === 1
            ? allClubs.map((club, i) =>
              <View key={i}>
                <ClubItem key={i} club={club} isNotMyClub onClick={this.navigate("/pages/clubs/detail?clubId=${club.id}")} />
              </View>
            )
            : null
        }

      </View>
    );
  }
}

export default Clubs as ComponentClass<PageOwnProps, PageState>;

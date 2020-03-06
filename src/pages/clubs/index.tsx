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
  clubs: {
    clubs: ClubList
  }
};
type PageDispatchProps = {
  getClubs: () => void
};
type PageOwnProps = {};
type PageState = {
  current: number
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
    current: 0
  };

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  navigate = url => () => {
    Taro.navigateTo({url});
  };

  componentWillMount(): void {
    this.props.getClubs()
  }

  render() {
    console.log(this.props.clubs)
    return (
      <View className='index'>
        <AtSegmentedControl
          values={['我的俱乐部', '俱乐部列表']}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
        {
          this.state.current === 0
            ? <View className='tab-content'>
                {
                  this.props.clubs.clubs.map((club, i) =>
                    <ClubItem key={i} club={club} isNotMyClub={false} onClick={this.navigate("/pages/clubs/detail")} />
                  )
                }
            </View>
            : null
        }
        {
          this.state.current === 1
            ? this.props.clubs.clubs.map((club, i) =>
              <ClubItem key={i} club={club} isNotMyClub onClick={this.navigate("/pages/clubs/detail")} />
            )
            : null
        }

      </View>
    );
  }
}

export default Clubs as ComponentClass<PageOwnProps, PageState>;

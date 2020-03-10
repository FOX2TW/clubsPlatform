import {ComponentClass} from "react";
import Taro, {Component, Config} from "@tarojs/taro";
import {connect} from "@tarojs/redux";
import {bindActionCreators} from "redux";
import {Text, View} from "@tarojs/components";

import {
  AtActionSheet,
  AtActionSheetItem,
  AtButton,
  AtForm,
  AtIcon,
  AtImagePicker,
  AtInput,
  AtSwitch,
  AtTextarea
} from "taro-ui";
import cls from "classnames";
import {Club, ClubTypes,ClubList} from "@/types/index";
import {createClub, editClub, getClubTypes} from "@/actions/clubs";

import "./form.scss";

type PageStateProps = {
  types: ClubTypes;
  clubs: ClubList;
};
type PageDispatchProps = {
  getClubTypes: () => void;
  createClub: (club: Club) => void;
  editClub: (club: Club) => void;
};
type PageOwnProps = {};
type PageState = {};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;
interface ClubForm {
  props: IProps;
}

@connect(
  ({ clubs }) => ({
    types: clubs.types,
    clubs: clubs.clubs
  }),
  dispatch =>
    bindActionCreators(
      {
        getClubTypes, createClub, editClub
      },
      dispatch
    )
)
class ClubForm extends Component {

  state = {
    id: 0,
    isUseDefault: true,
    isOpenType: false,
    picture: "",
    name: "",
    type: {},
    introduction: "",
    address: "",
    files: [],
  };

  componentWillMount() {
    this.props.getClubTypes();
    const id = parseInt(this.$router.params["id"]);
    if (id){
      const filter = this.props.clubs.filter(c => c.id === id);
      if (filter.length > 0) {
        const club = filter[0];
        this.setState({
          ...club,
          type: {
            id: club.type,
            name: this.props.types.filter(t => t.id === club.type)[0].name
          },
        });
        Taro.setNavigationBarTitle({title: "俱乐部修改"})
      }
    }else{
      Taro.setNavigationBarTitle({title: "俱乐部创建"})
    }

  }

  onSubmit = () => {
    const club = {
      id: this.state.id,
      picture: this.state.picture,
      name: this.state.name,
      type: this.state.type.id,
      introduction: this.state.introduction,
    };
    if (club.id) {
      this.props.editClub(club)
    }else {
      this.props.createClub(club)
    }
    Taro.navigateBack()
  };
  nameInputChange = name => {
    this.setState({ name });
  };

  introInputChange = e => {
    this.setState({ introduction: e.target.value });
  };

  switchChange = () => {
    this.setState({ isUseDefault: !this.state.isUseDefault, type: "" });
  };

  typeInputChange = type => {
    this.setState({type: {name: type}});
  };

  openTypeActionSheet = () => {
    this.setState({
      isOpenType: true
    });
  };

  actionSheetClosed = () => {
    this.setState({
      isOpenType: false
    });
  };

  actionSheetItemClick = type => () => {
    this.setState({ type, isOpenType: false });
  };

  onFileChange = files => {
    this.setState({
      files
    });
  };
  onFileFail = mes => {
    console.log(mes);
  };

  render() {
    const {
      name,
      type,
      introduction,
      files,
      isUseDefault,
      isOpenType
    } = this.state;
    const { types } = this.props;
    return (
      <View className="club-form-container">
        <AtForm onSubmit={this.onSubmit}>
          <View className="form-item">
            <View className="label-wrap">
              <Text className="required">*</Text>
              <Text className="label">俱乐部名称：</Text>
            </View>
            <AtInput
              name="value"
              type="text"
              placeholder="请输入名称"
              value={name}
              onChange={this.nameInputChange}
            />
          </View>
          <View className="form-item">
            <View className="label-wrap">
              <Text className="required">*</Text>
              <Text className="label">俱乐部介绍：</Text>
            </View>
            <AtTextarea
              count={true}
              value={introduction}
              onChange={this.introInputChange}
              maxLength={400}
              placeholder="请输入介绍"
            />
          </View>
          <View className="form-item">
            <View className="label-wrap">
              <Text className="required">*</Text>
              <Text className="label">俱乐部类型：</Text>
            </View>
            <View className="select-wrap">
              {isUseDefault && (
                <View className="select" onClick={this.openTypeActionSheet}>
                  <Text className={cls({ "select-value": !!type.name })}>
                    {!!type.name ? type.name : "请选择类型"}
                  </Text>
                  <AtIcon value="chevron-down" size="24" color="#cdcdcd" />
                </View>
              )}
              {!isUseDefault && (
                <AtInput
                  name="value"
                  type="text"
                  placeholder="请输入类型"
                  value={type.name}
                  onChange={this.typeInputChange}
                />
              )}
              <View>
                <AtSwitch
                  border={false}
                  title="自定义"
                  checked={!isUseDefault}
                  onChange={this.switchChange}
                />
              </View>
            </View>
            <AtActionSheet
              isOpened={isOpenType}
              cancelText="取消"
              title="请选择俱乐部类型"
              onClose={this.actionSheetClosed}
            >
              {types.map(item => (
                <AtActionSheetItem
                  key={item.id}
                  onClick={this.actionSheetItemClick(item)}
                >
                  {item.name}
                </AtActionSheetItem>
              ))}
            </AtActionSheet>
          </View>

          <View className="form-item">
            <View className="label-wrap">
              <Text className="required">*</Text>
              <Text className="label">宣传图上传：</Text>
            </View>
            <AtImagePicker
              mode="aspectFit"
              length={2}
              showAddBtn={files.length === 0}
              files={this.state.files}
              onChange={this.onFileChange}
              onFail={this.onFileFail}
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

export default ClubForm as ComponentClass<PageOwnProps, PageState>;

import { ComponentClass } from "react";
import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { bindActionCreators } from "redux";
import { Text, View } from "@tarojs/components";

import {
  AtActionSheet,
  AtActionSheetItem,
  AtButton,
  AtForm,
  AtIcon,
  AtImagePicker,
  AtInput,
  AtSwitch,
  AtTextarea,
  AtMessage
} from "taro-ui";
import cls from "classnames";
import { Club, ClubTypes, ClubDetail, ClubApply } from "@/types/index";
import { createClub, editClub, getClubTypes } from "@/actions/clubs";

import "./form.scss";

type PageStateProps = {
  types: ClubTypes;
  clubDetail: {
    [key: number]: ClubDetail;
  };
  clubApply: Array<ClubApply>;
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
    clubDetail: clubs.clubDetail,
    clubApply: clubs.clubApply
  }),
  dispatch =>
    bindActionCreators(
      {
        getClubTypes,
        createClub,
        editClub
      } as PageDispatchProps,
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
    type: Infinity,
    introduction: "",
    address: "",
    files: []
  };

  componentDidMount() {
    this.initPage();
  }

  initPage = () => {
    this.props.getClubTypes();
    console.log(this.props);
    const { id, apply } = this.$router.params;
    if (id) {
      Taro.setNavigationBarTitle({ title: "俱乐部修改" });
      let detail: any = {};
      if (apply) {
        const { clubApply } = this.props;
        console.log(clubApply);
        detail = {
          ...clubApply.find(({ id: clubId }) => clubId === Number(id))
        };
      } else {
        const { clubDetail } = this.props;
        detail = { ...clubDetail[id] };
      }
      this.setState({
        id,
        picture: detail.picture,
        name: detail.name,
        introduction: detail.introduction,
        type: detail.type,
        files: detail.picture ? [{ url: detail.picture }] : []
      });
      console.log(detail, apply);
    } else {
      Taro.setNavigationBarTitle({ title: "俱乐部创建" });
    }
  };

  onSubmit = async () => {
    Taro.showLoading({ title: "loading..." });
    const club = {
      id: this.state.id,
      picture: this.state.picture,
      name: this.state.name,
      type: this.state.type,
      introduction: this.state.introduction
    };
    if (club.id) {
      await this.props.editClub(club);
      Taro.hideLoading();
      Taro.atMessage({
        message: "编辑俱乐部成功",
        type: "success",
        duration: 1000
      });
    } else {
      await this.props.createClub(club);
      Taro.hideLoading();
      Taro.atMessage({
        message: "提交创建申请成功,等待管理员通过中~",
        type: "success",
        duration: 1000
      });
    }
    setTimeout(() => {
      Taro.navigateBack();
    }, 1000);
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
    this.setState({ type: { name: type } });
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

  actionSheetItemClick = types => () => {
    this.setState({ type: types.id, isOpenType: false });
  };

  onFileChange = files => {
    if (files.length > 0) {
      this.setState({
        files,
        picture: files[0].url
      });
    } else {
      this.setState({
        files,
        picture: ""
      });
    }
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
    const currentType: any = types.find(n => n.id === type) || {};
    return (
      <View className="club-form-container">
        <AtMessage />
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
                  <Text className={cls({ "select-value": !!currentType.name })}>
                    {!!currentType.name ? currentType.name : "请选择类型"}
                  </Text>
                  <AtIcon value="chevron-down" size="24" color="#cdcdcd" />
                </View>
              )}
              {!isUseDefault && (
                <AtInput
                  name="value"
                  type="text"
                  placeholder="请输入类型"
                  value={String(type)}
                  onChange={this.typeInputChange}
                />
              )}
              {/* <View>
                <AtSwitch
                  border={false}
                  title="自定义"
                  checked={!isUseDefault}
                  onChange={this.switchChange}
                />
              </View> */}
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

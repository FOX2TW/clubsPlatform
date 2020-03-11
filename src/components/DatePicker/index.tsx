import Taro, { PureComponent } from "@tarojs/taro";
import { ComponentClass } from "react";
import { Text, View, Picker } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import cls from "classnames";
import dayjs from "dayjs";

import "./index.scss";

type IProps = {
  onChange: (date: number) => void;
  value: number;
};
interface DatePicker {
  props: IProps;
}

class DatePicker extends PureComponent {
  state = {
    date: "",
    time: ""
  };

  static getDerivedStateFromProps(nextProps) {
    const { value } = nextProps;
    if (value) {
      const date = dayjs(value).format("YYYY-MM-DD");
      const time = dayjs(value).format("HH:mm");
      return { date, time };
    }
    return null;
  }

  dateChange = e => {
    const { time } = this.state;
    const date = e.target.value;
    this.setState({ date });
    this.props.onChange(dayjs(`${date} ${time}`).valueOf());
  };

  timeChange = e => {
    const { date } = this.state;
    const time = e.target.value;
    this.setState({ time });
    this.props.onChange(dayjs(`${date} ${time}`).valueOf());
  };

  render() {
    const { date, time } = this.state;
    return (
      <View className="date-picker">
        <View className="picker-wrap">
          <Picker mode="date" value={date} onChange={this.dateChange}>
            <View className="date">
              <Text className={cls({ placeholder: !date })}>
                {date || "请选择日期"}
              </Text>
              <AtIcon value="calendar" size="20" color="#6190E8" />
            </View>
          </Picker>
        </View>
        <Text className="line">-</Text>
        <View className="picker-wrap">
          <Picker mode="time" value={time} onChange={this.timeChange}>
            <View className="date">
              <Text className={cls({ placeholder: !time })}>
                {time || "请选择时间"}
              </Text>
              <AtIcon value="calendar" size="20" color="#6190E8" />
            </View>
          </Picker>
        </View>
      </View>
    );
  }
}

export default DatePicker as ComponentClass<IProps>;

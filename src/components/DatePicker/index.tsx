import Taro, { useEffect, useState } from "@tarojs/taro";
import { Text, View, Picker } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import cls from "classnames";
import dayjs from "dayjs";

import "./index.scss";

type IProps = {
  onChange: (date: number) => void;
};

export default function DatePicker({ onChange }: IProps) {
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  useEffect(() => {
    onChange(dayjs(`${date} ${time}`).valueOf());
  }, [date, time]);

  function dateChange(event) {
    setDate(event.target.value);
  }

  function timeChange(event) {
    setTime(event.target.value);
  }

  return (
    <View className="date-picker">
      <View className="picker-wrap">
        <Picker mode="date" value={date} onChange={dateChange}>
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
        <Picker mode="time" value={time} onChange={timeChange}>
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

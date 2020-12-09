import React from "react";
import DayListItem from "components/DayListItem";

//import 'components/DayListItem.scss';
// import classNames from 'classnames';

export default function DayList(props) {

  const dayListItems = props.days.map((day, index) => {
    return (
      <DayListItem
        key = {day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return (
    <ul>{ dayListItems }</ul>
  );
};

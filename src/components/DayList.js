import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const dayListItems = props.days.map((day, index) => {
    return (
      <DayListItem
        key = {day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={(e) => props.setDay(day.name)}
      />
    );
  });

  return (
    <ul>{ dayListItems }</ul>
  );
};

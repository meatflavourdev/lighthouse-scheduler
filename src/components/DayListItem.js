import React from "react";

import 'components/DayListItem.scss';
import classNames from 'classnames';

export default function DayListItem(props) {

  const formatSpots = function (spots) {
    let spotText = spots;
    if (spots >= 2) {
      spotText = `${spots} spots remaining`;
    } else if (spots < 2) {
      spotText = `${spots} spot remaining`;
    }
    if (!spots) {
      spotText = 'no spots remaining';
    }
    return spotText;
   };

  const dayClass  = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots,
  });

  return (
    <li className={ dayClass } onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

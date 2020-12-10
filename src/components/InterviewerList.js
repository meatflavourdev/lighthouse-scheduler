import React from "react";

import 'components/InterviewerList.scss';
import InterviewerListItem from "./InterviewerListItem";

/*
------- Props -------
interviewers:array - an array of objects containing the information of each interviewer
interviewer:number - the id of an interviewer
setInterviewer:function - a function that accepts an interviewer id
*/

export default function InterviewerList(props) {

  const interviewerListItems = props.interviewers.map((interviewer, index) => {
    return (
      <InterviewerListItem
        key = {interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        onChange={(e) => props.onChange(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        { interviewerListItems }
      </ul>
    </section>
  );
}

import React from 'react';
import Header from './Header';
import Confirm from './Confirm';
import Empty from './Empty';
import Error from './Error';
import Form from './Form';
import Show from './Show';
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode';

import './styles.scss';

// Mode constants
const CONFIRM = 'CONFIRM';
const EMPTY = 'EMPTY';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const EDIT = 'EDIT';
const SAVING = 'SAVING';
const DELETING = 'DELETING';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then((value) => {
        console.log('Saved: ', value)
        transition(SHOW)
      })
      .catch((reason) => {
        console.log('AXIOS ERROR: ', reason)
        transition(ERROR_SAVE, true)
      })
  };

  function confirmDelete(id) {
    transition(CONFIRM)
  }

  function destroy(id) {
    transition(DELETING, true)
    props.cancelInterview(id)
    .then((value) => {
      console.log('Deleted: ', value)
      transition(EMPTY)
    })
    .catch((reason) => {
      console.log('AXIOS ERROR: ', reason)
      transition(ERROR_DELETE, true)
    })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={() => transition(EDIT)}
        onDelete={() => confirmDelete(props.id)}
      />}
      {mode === CONFIRM && <Confirm message="Delete the appointment?" onConfirm={() => destroy(props.id)} onCancel={() => back()} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={() => back()} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()} />}
      {mode === EDIT && <Form interviewers={props.interviewers} name={props.interview.student} interviewer={props.interview.interviewer.id} onSave={save} onCancel={() => back()} />}
    </article>
  );
}

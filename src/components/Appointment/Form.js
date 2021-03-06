import Button from 'components/Button'
import InterviewerList from 'components/InterviewerList'
import React, { useState } from 'react'

/*
------- State -------
name:String
interviewer:Number

------- Props -------
name:String
interviewers:Array
interviewer:Number
onSave:Function
onCancel:Function

------- Actions -------
setName:Function
setInterviewer:Function
*/

export default function Form(props) {

  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");

  const reset = function() {
    setInterviewer(null)
    setName("")
  }

  const cancel = function () {
    props.onCancel()
    reset()
  }

  function validate() {
    if (!name || name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button data-testid="app-cancel" onClick={cancel} danger>Cancel</Button>
          <Button data-testid="app-save" onClick={(e) => validate()} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}

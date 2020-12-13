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

  const [interviewer, setInterviewer] = useState(props.interviewer);
  const [name, setName] = useState(props.name);

  const reset = function() {
    setInterviewer(null)
    setName("")
  }

  const cancel = function () {
    props.onCancel()
    reset()
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
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={(e) => props.onSave(name, interviewer)} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}

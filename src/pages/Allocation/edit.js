import React, { useState, useEffect } from 'react';
import {  Form, Button, Input, FormGroup, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import Page from '../../components/Page';
import api from '../../services/api';

export default function Edit(props) {
  const [form, setForm] = useState({ dayOfWeek: '', startHour: '', endHour: '', course: '', professor: '' });
  const [courses, setCourses] = useState([]);
  const [professors, setProfessors] = useState([]);

  const { history, match: { params: { id } } } = props;
  const isNewAllocation = id === 'new';

  const onError = () => {
    toast.error('Unexpected Error');
  };

  useEffect(() => {
    if (!isNewAllocation) {
      api.get(`/allocation/${id}`)
        .then(({ data }) => {
          setForm({
            dayOfWeek: data.dayOfWeek,
            startHour: data.startHour,
            endHour: data.endHour,
            course: data.course.id,
            professor: data.professor.id,
          });
        })
        .catch(onError);
    }
  }, [id, isNewAllocation]);

  useEffect(() => {
    api.get('/course')
      .then(({ data }) => setCourses(data))
      .catch(onError);
  }, []);

  useEffect(() => {
    api.get('/professor')
      .then(({ data }) => setProfessors(data))
      .catch(onError);
  }, []);

  const onSuccess = () => {
    const action = isNewAllocation ? 'Created' : 'Updated';
    toast.info(`${action} with Success`);
    history.push('/allocation');
  };

  const onSubmit = () => {
    const formData = {
      ...form,
      course: {
        id: form.course,
      },
      professor:{
        id: form.professor,
      },
    };
    if (isNewAllocation) {
      api.post('/allocation', formData)
        .then(onSuccess)
        .catch(onError);
    } else {
      api.put(`/allocation/${id}`, formData)
        .then(onSuccess)
        .catch(onError);
    }
  };

  const onChange = (event) => {
    const { target: { name, value } } = event;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <Page title={isNewAllocation ? 'Create Allocation' : 'Edit Allocation'}>
      <Form>
        <FormGroup>
          <Label>Course</Label>
          <Input
            value={form.course}
            name="course"
            type="select"
            onChange={onChange}
          >
            <option value="">Select a course</option> 
            {courses.map((course) => (
              <option
                value={course.id}
                key={course.id}
              >
                {course.name}

              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Day</Label>
          <Input
            value={form.dayOfWeek}
            name="dayOfWeek"
            type="select"
            onChange={onChange}
          >
            <option value="">Select a day</option> 
            {days.map((day, index) => (
              <option
                value={day}
                key={index}
              >
                {day}

              </option>
            ))}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label>Start Hour</Label>
          <Input
            value={form.startHour}
            name="startHour"
            type="number"
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>End Hour</Label>
          <Input
            value={form.endHour}
            name="endHour"
            type="number"
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Professor</Label>
          <Input
            value={form.professor}
            name="professor"
            type="select"
            onChange={onChange}
          >
            <option value="">Select a professor</option> 
            {professors.map((professor) => (
              <option
                value={professor.id}
                key={professor.id}
              >
                {professor.name}

              </option>
            ))}
          </Input>
        </FormGroup>
      </Form>
      <Button color="secondary" onClick={()=>{history.goBack()}}> Cancel </Button> {' '}
      <Button color="primary" onClick={onSubmit}>Save</Button> 
    </Page>
  );
}
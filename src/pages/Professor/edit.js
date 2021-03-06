import React, { useState, useEffect } from 'react';
import {  Button, Input, FormGroup, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import Page from '../../components/Page';
import api from '../../services/api';

export default function Edit(props) {
  const [form, setForm] = useState({ cpf: '', departament: '', name: '' });
  const [departaments, setDepartments] = useState([]);

  const { history, match: { params: { id } } } = props;
  const isNewProfessor = id === 'new';

  const onError = () => {
    toast.error('Unexpected Error');
  };

  useEffect(() => {
    if (!isNewProfessor) {
      api.get(`/professor/${id}`)
        .then(({ data }) => {
          setForm({
            cpf: data.cpf,
            name: data.name,
            departament: data.departament.id,
          });
        })
        .catch(onError);
    }
  }, [id, isNewProfessor]);

  useEffect(() => {
    api.get('/departament')
      .then(({ data }) => setDepartments(data))
      .catch(onError);
  }, []);

  const onSuccess = () => {
    const action = isNewProfessor ? 'Created' : 'Updated';
    toast.info(`${action} with Success`);
    history.push('/professor');
  };

  const onSubmit = () => {
    const formData = {
      ...form,
      departament: {
        id: form.departament,
      },
    };
    if (isNewProfessor) {
      api.post('/professor', formData)
        .then(onSuccess)
        .catch(onError);
    } else {
      api.put(`/professor/${id}`, formData)
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

  return (
    <Page title={isNewProfessor ? 'Create Professor' : 'Edit Professor'}>
      <div>
        <FormGroup>
          <Label>Name</Label>
          <Input
            value={form.name}
            name="name"
            type="text"
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>CPF</Label>
          <Input
            value={form.cpf}
            name="cpf"
            type="text"
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Departament</Label>
          <Input
            value={form.departament}
            name="departament"
            type="select"
            onChange={onChange}
          >
            <option value="">Select a department</option> 
            {departaments.map((departament) => (
              <option
                value={departament.id}
                key={departament.id}
              >
                {departament.name}

              </option>
            ))}
          </Input>
        </FormGroup>
      </div>
      <Button color="secondary" onClick={()=>{history.goBack()}}> Cancel </Button> {' '}
      <Button color="primary" onClick={onSubmit}>Save</Button> 
    </Page>
  );
}

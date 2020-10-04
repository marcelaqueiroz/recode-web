import React, { useState, useEffect } from 'react';
import {Table, Button} from 'reactstrap';
import Page from '../../components/Page';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';

export default function Index(props) {
  const {history} = props;
  const [departaments, setDepartaments] = useState([]);

  useEffect(() => {
    api.get('/departament')
    .then((response)=>{
      const {data} = response;
      setDepartaments(data);
    })
    .catch(()=>{
      toast.error('Unexpected Error');
    });
  }, []);

  const onDelete = (id) => {
    if(window.confirm('are you sure you want to delete this item?')){
      api.delete(`/departament/${id}`)
      .then(()=> {
        const departamentList = departaments.filter((departament) => departament.id !== id);
        setDepartaments(departamentList);
        toast.success('Department deleted with success');
      })
      .catch(()=> {
        toast.error('Unexpected Error');
      });
    }
  };

  return (
    <Page title="Department">
      <Link className="btn btn-primary" to={'/departament/new'}> Create Department </Link>
      <Table className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departaments.map((departament, index)=>(
            <tr key={index}>
              <td>{departament.id}</td>
              <td>{departament.name}</td>
              <td>
                <Button size="sm" color="secondary" onClick ={() => {history.push(`/departament/${departament.id}`)}}>Edit</Button> {' '}
                <Button size="sm" color="danger" onClick ={() => onDelete(departament.id)}>Delete</Button>
              </td>
            </tr>
            ))}
        </tbody>
      </Table>
    </Page>
  );
};

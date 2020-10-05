import React, { useState, useEffect } from 'react';
import Page from '../../components/Page';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {Button, Table} from 'reactstrap';
import api from '../../services/api';

export default function Index(props) {
  const {history} = props
  const [allocations, setAllocations] = useState ([]);
  
  const onError = () =>{
    toast.error('Unexpected Error');
  };

  useEffect(() => {
    api.get('/allocation')
    .then((response) => {
      const { data } = response;
      setAllocations(data);
    })
    .catch(() => {
      toast.error('Could not get data!');
    });
  }, []);

  const onDelete = (id) =>{
    if(window.confirm('Are you sure you want to delete this item?')){
      api.delete(`allocation/${id}`)
      .then(() => {
        const allocationList = allocations.filter((allocation) => allocation.id !== id);
        setAllocations(allocationList);
        toast.success('Allocation deleted with success');
      })
      .catch(onError);
    }
  };



  return (
    <Page title="Allocation">
      <Link className = "btn btn-primary" to="/allocation/new"> Create Allocation</Link>
      <Table className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course</th>
            <th>Day</th>
            <th>Start Hour</th>
            <th>End Hour</th>
            <th>Professor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allocations.map((allocation, index) => (
            <tr key={index}>
              <td>{allocation.id}</td>
              <td>{allocation.course.name}</td>
              <td>{allocation.day}</td>
              <td>{allocation.start}</td>
              <td>{allocation.end}</td>
              <td>{allocation.professor.name}</td>
              <td>
              <Button size="sm" color="secondary" onClick={ () => {history.push(`/allocation/${allocation.id}`)}}>Edit</Button>{' '}
              <Button size="sm" onClick={() => onDelete(allocation.id)} color="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Page>
  );
}

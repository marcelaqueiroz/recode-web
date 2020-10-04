import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Page from '../../components/Page';
import api from '../../services/api';

export default function Edit(props) {
    const [form, setForm] = useState({name:''});
    
    const { history, match : { params : { id } } } = props;    
    const isNewCourse = id === 'new';

    const onError = () => {
      toast.error('Unexpected Error');
    };

    const onSuccess = () => {
      const action = isNewCourse ? 'Created' : 'Updated';
      toast.info(`${action} with Success`);
      history.push('/course');
    };

    useEffect(() => {
      if(!isNewCourse) {
        api.get(`/course/${id}`)
        .then(({data}) => {
          setForm({
            name: data.name,
          });
        })
        .catch(onError) 
      }
    }, [id, isNewCourse]);

    const onSubmit =() =>{
      const formData ={
        ...form,
      };  
      if (isNewCourse){
          api.post('/course',formData)
          .then(onSuccess)
          .catch(onError);
        } else {
            api.put(`/course/${id}`, formData)
            .then(onSuccess)
            .catch(onError);
        }
    };
  
    const onChange = (event) => {
        const {
          target: { name, value },
        } = event;
       
        setForm({
          ...form,
          [name]: value,
        });
      };

     
    return (
      <Page title={isNewCourse ? 'Create Course' : 'Edit Course'}>
            <Form>        
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" value={form.name} name="name" id="name" onChange={onChange} />
              </FormGroup>
            </Form> 
            <Button color="secondary" onClick={()=>{history.goBack()}}> Cancel </Button> {' '}
            <Button color="primary" onClick={onSubmit}>Save</Button>
        </Page>
      );
}

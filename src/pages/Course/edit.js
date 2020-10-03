import React, {useState, useEffect} from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Page from '../../components/Page';
import api from '../../services/api';

export default function Edit(props) {
    const {match : { params : { id } } } = props;    
    const isNewCourse = id === 'new';

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        api.get('/course').then((response) => {
          const { data } = response;
          setCourses(data);
        }).catch((error) => {
          console.log(error);
        });
      }, []);

    const onSubmit =() =>{
        if (isNewCourse){
            api.post('/course',{}).then().catch();
        } else {
            api.put(`/course/${id}`, {}).then().catch();
        }
    };
    

    const [form, setForm] = useState({
        name: courses.name,
        departament: courses.departament
      });
      
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
              <FormGroup key={id}>
                <Label for="name">Name</Label>
                <Input type="text" value={courses.name} name="name" id="name" onChange={onChange} />
              </FormGroup>
              <FormGroup>
                <Label for="departament">Departament</Label>
                <Input type="text" value={courses.departament} name="departament" id="departament" onChange={onChange}/>
              </FormGroup>        
            </Form> 
            <Button onClick={onSubmit}>Save</Button>
        </Page>
      );
}

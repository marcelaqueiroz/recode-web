import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Page from '../../components/Page'
import api from '../../services/api';


export default function Edit(props) {
    const { history, match : { params : { id }}} = props;
    const isNewDepartament = id === 'new';
    const [form, setForm] = useState({name:''});
    
    const onError = () => {
        toast.error('Unexpected Error');
    };
  
    const onSuccess = () => {
        const action = isNewDepartament ? 'Created' : 'Updated';
        toast.info(`${action} with Success`);
        history.push('/departament');
    };

    useEffect(() => {
        if(!isNewDepartament){
            api.get(`/departament/${id}`)
            .then(({data}) =>{
                setForm({
                    name: data.name,
                });
            })
            .catch(onError)
        }
    }, [id, isNewDepartament]);

    const onChange = (event) =>{
        const{
            target: { name, value },
        } = event;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const onSubmit = () => {
        const formData ={
            ...form,
        };
        if (isNewDepartament){
            api.post('/departament', formData)
            .then(onSuccess)
            .catch(onError)
        } else {
            api.put(`/departament/${id}`, formData)
            .then(onSuccess)
            .catch(onError)
        }
    };

    return (
        <Page title={isNewDepartament ? 'Create Department' : 'Edit Department'}>
            <Form>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" value={form.name} name="name" id="name" onChange={onChange}></Input>
                </FormGroup>
            </Form>
            <Button color="secondary" onClick={()=> history.goBack()}>Cancel</Button>{' '}
            <Button color="primary" onClick={onSubmit}>Save</Button>
        </Page>
    )
}

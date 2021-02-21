//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import formFields from './formFields';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';





class SurveyForm extends React.Component{

    
    renderFields(){
        return _.map(formFields, ({label, name})=>{
            return (
                <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
            );
        });
    }

    render(){
        return (
        <div>
            <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                {this.renderFields()}
                <Link to="/surveys" className="red btn-flat white-text">
                    Cancel
                </Link>
                <button className="teal btn-flat right white-text" type="submit">
                    Continue
                    <i className="material-icons right">arrow_forward</i>
                </button>
            </form>
        </div>);
    };
};

function validate(values){
    const errors={};
    
    // after click countinue on form change emails like this and  str = str.replace(/,\s*$/, "");

    if(values.recipients!==undefined){
        errors.recipients=validateEmails(values.recipients.endsWith(',')?values.recipients.slice(0,-1):values.recipients || '');
    }
    

    _.each(formFields, ({name})=>{
        if(!values[name]){
            errors[name]=`Missing ${name}! You must provide a value`
        }
    })

    return errors;
}

export default reduxForm({
    validate,
    form:'surveyForm',
    destroyOnUnmount:false
})(SurveyForm);
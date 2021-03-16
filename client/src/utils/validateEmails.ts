const re=/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validateEmails=(emails:string)=>{
    const invalidEmails=emails
    .split(',')
    .map(email=>email.trim())
    .filter(email=>re.test(email)===false);

    if(invalidEmails.length){
        return `Theese emails are invalid: ${invalidEmails}`;
    }

    return;
};


export default validateEmails;
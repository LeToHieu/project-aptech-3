export default class Exception extends Error{
    constructor(message, validationError = {}){
        super(message);
        console.error(message);
        this.validationError = validationError;
    }
}
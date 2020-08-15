export default class RequestError{

    constructor( {status, message} ){
        this.name = "RequestError"
        this.status = status;
        this.message = message;
    }

    getError(){
        return {
            status: this.status,
            message: this.message
        }
    }

    toString(){
        return JSON.stringify({
            status: this.status,
            message: this.message
        });
    }
}
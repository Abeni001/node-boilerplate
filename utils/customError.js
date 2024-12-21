class customError extends Error {
    constructor(message,statusCode){
        super(message)    // passing error message to built in Error class
        this.statusCode = statusCode
        this.status = statusCode >=400 && statusCode < 500 ? 'fail' :'error'

        Error.captureStackTrace(this,this.constructor)  // to display where the error occured
    }
}
export default customError
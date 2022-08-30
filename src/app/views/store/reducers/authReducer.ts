export interface Action{
    type: string;
    payload: any;
}

const isAuthenticated = {    
    loggedIn:false,
    isProcessingRequest: false,
 };




export function authReducer(state = isAuthenticated, action : Action){
    switch(action.type){
        case "start":
                return {
                    loggedIn:false,
                    isProcessingRequest: true
                }
        case "login":
            return {
                ...action.payload,
                loggedIn:true,
                isProcessingRequest: false
            }
        case "logount":
            return {
                loggedIn:false,
                isProcessingRequest: false
            }    
        default:
            return state;

    
    }

}



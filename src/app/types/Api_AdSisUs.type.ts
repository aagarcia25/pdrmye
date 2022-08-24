//SE DECLARAN TODAS LAS INTERFACES PARA USUAR EN LAS OPERACIONES DE USUARIOS


export default interface AuthState{
    status: string, // 'checking', 'not-authenticated', 'authenticated'
    isProcessingRequest: boolean;
    uid?: string,
    email?: string,
    displayName?: string,
    photoURL?: string,
    errorMessage?: string,
  }

export default interface Iuserdata{
  id?:number,
  name?:string,
  email?:string
}


export default interface Iuser{
  CHID?:string
}
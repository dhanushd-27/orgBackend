export interface signUpbody{
  name: string,
  email: string,
  password: string
}

export interface signInbody{
  email: string,
  password: string
}

export interface user{
  id: string,
  email: string
}

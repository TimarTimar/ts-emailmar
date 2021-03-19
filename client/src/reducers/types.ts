export interface Survey{
	yes: number
	no: 0
  state: "draft" | "sent"
  dateSent?: any
  _id: string
  title: string
  subject: string
  participiants?: string
  body: string
  _user?: string
  lastResponded?:any
}

export interface SurveyState{
    surveys:Survey[]
}


export interface AuthState{
	credits?:number
	_id?:string
	googleId?:string
}
const domain = "http://localhost:8000"

export const appConfig ={
    chats: domain + "/api/chat",
    register: domain + "/api/user",
    login: domain + "/api/user/login",
    user: domain +"/api/user",
    group: domain +"/api/chat/group",
    message:domain + '/api/message'
}
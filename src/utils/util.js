export const getSender = (loggedInId, users) => {
  return users?.find((item) => item._id !== loggedInId);
};

export const getSenderUsername = (loggedInId, users) => {
  return users?.find((item) => item._id !== loggedInId);
};

export const isSender = (loggedInId, sender) => {
  if (loggedInId === sender) return true;
  else return false;
};

export const isSameSender =(messages,m, i,userId)=>{
    if(i < messages.length-1){
        if(messages[i+1].sender._id === m.sender._id && messages[i+1].sender._id !== userId) return true
        else return false
        // if(messages[i+1].sender._id === m.sender._id) return true
        // else return false
    }

    return false
}
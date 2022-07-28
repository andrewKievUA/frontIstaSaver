const INITIAL_STATE = {
  auth: false,
  email: "",
  token: "",
  userId:"",
  confirmed: false
};

const userReducer = (state = INITIAL_STATE, action) => {
  

  switch (action.type) {
    
    case "login" :
        console.log("hello from reducer  true", action);
        return { ...state, 
            auth: true, 
            email: action.payload.user || "",
            token:action.payload.token || "",
            userId:action.payload.userId || "",
            confirmed: action.payload.confirmed || false,
            cartNumber:action.payload.cartNumber || "",
            name: action.payload.name || ""

        
        };

    case "LogOut":
      console.log("hello from reducer   false", action.payload);
      return { ...state, auth: false, email: "" };

    default:
      return { ...state };
  }
};

export default userReducer;

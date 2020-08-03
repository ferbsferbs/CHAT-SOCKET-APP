export { login, register,loginAsyncStorage,getDataIsSucess };
import AsyncStorage from "@react-native-community/async-storage";
const login = async (user, pass) => {
  let data = {
    method: "POST",
    credentials: "same-origin",
    mode: "same-origin",
    body: JSON.stringify({
      email: user,
      password: pass,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  console.warn(data);
  return fetch("http://192.168.0.68:4001/api/auth/login", data)
    .then((response) => response.json()) // promise
    .then((json) => {
        console.warn(json)
        if(json.token){
        storeDataIsSaved({ mail: user, password:pass,userId:json.userId }, "credentials");

        return Promise.resolve(true)
    }
else{
    return alert("Verificá los datos!")
}});
};

const register = (email, password,name) => {
  let data = {
    method: "POST",
    credentials: "same-origin",
    mode: "same-origin",
    body: JSON.stringify({
      email,
      password,
      name,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  console.warn(data);
  return fetch("http://192.168.0.68:4001/api/auth/register", data)
    .then((response) => response.json()) // promise
    .then((json) => {
      if (json.id) {
        storeDataIsSaved({ mail: email, password,name,userId:json.id }, "credentials");
       
      return  login(email, password).then((res) => {
   

         if(!res.errors){
        

             return true
         }
         else{
            return alert("Se pudo crear la cuenta, pero no se pudo hacer login automatico, Hacé login!")

         }
        });
      }
     else{
        return alert(json.message)

     }
    })
    .catch(err=>{return alert(err)})
    
};

const loginAsyncStorage =  () => {
  return  getDataIsSucess("credentials").then(res=>{
     return login(res.mail,res.password).then(res=>{return res})
    })
};

const getDataIsSucess = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : false;
  } catch (e) {
    return false;
  }
};

const storeDataIsSaved = async (value, key) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    return false;
  }
};

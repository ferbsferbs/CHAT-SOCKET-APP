export { SearchForUsers };


const SearchForUsers = (query) => {
    let data = {
      method: "POST",
      credentials: "same-origin",
      mode: "same-origin",
      body: JSON.stringify({
        field: query
       
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    console.warn(data);
    return fetch("http://192.168.0.68:4001/api/auth/search", data)
      .then((response) => response.json()) // promise
      .then((json) => {
       if(json.user){
           return Promise.resolve(json.user)
       }
       return alert("algo salió mal, vuelva a intentar")
      })
      .catch(err=>{return alert(err)})
      
  };
import jwt from 'jsonwebtoken'

// const getUserInfo = async() => {
//   const token = localStorage.getItem('token')
//   if (!token) {
//     return null
//   }
//   const decodedToken = jwt.decode(token);
//   console.log(decodedToken);
//   let res =await fetch(process.env.baseUrl+"/api/userDetail",{
//     method:"POST",
//     headers: {
//         'Content-Type': 'application/json'
//    },
//    body: JSON.stringify({
//        id: decodedToken.userId,
//    })
//   });

//    let data= await res.json();
//    const isTokenExpired = Date.now() >= decodedToken.exp * 1000;


// if (isTokenExpired) {
//   localStorage.removeItem('token');
//   this.$router.push('/login');
//   return false
// }

//   if(data.status == 500){
//     // alert(data.message);
//     localStorage.removeItem('token');
//     this.$router.push('/register');
//     return false;
//    }
//    return data;
   
 
//   return decodedToken.userId;
// }

const getLoginUserInfo = async() => {
  let res =await fetch(process.env.apiUrl+"api/getUserDetails",{
    method:"POST",
    headers: {
        'Content-Type': 'application/json'
   },
   body: JSON.stringify({
       token:localStorage.token
   })
  });
  let data = await res.json();
  if(data[0] == 'token_expired'){
    localStorage.removeItem('token');
    window.location.href = process.env.appUrl+"/login";
    // this.$router.push("/login");
    return false;
  }
  return data;
}

export default ({ app }, inject) => {
  const jwtPlugin = {
    // getUserInfo,
    getLoginUserInfo
  }
  inject('jwt', jwtPlugin)
}

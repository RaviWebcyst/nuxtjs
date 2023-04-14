<template>
  <div class="col-md-5 mx-auto py-5  bg-light ">
    <div class="container">
      <div class="alert alert-info" v-if="message">{{ message }}</div>
    <form @submit.prevent="login" >
      <div class="text-center py-3">
        <h5>Login</h5>
      </div>
      <div class="form-group">
        <input type="text" v-model="email" placeholder="Email Id Or User Id" class="form-control" />
      </div>
      <div class="form-group">
        <input type="password" v-model="password" placeholder="Password"  class="form-control" />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Login <b-spinner variant="info" type="grow" label="Spinning" :class="{'d-none':spin}"></b-spinner></button>
      </div>
      <div class="pt-3">
          <strong>Don't have an account?  </strong><span><nuxt-link to="/register" class="btn btn-link pl-2" >Register</nuxt-link></span>
      </div>
    </form>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        message:false,
        url:process.env.baseUrl,
        apiUrl:process.env.apiUrl,
        spin:true,
      }
    },
   async created(){
   },
   mounted(){
  
   },
    methods: {

       async login() {
        this.spin = false;
        // console.log(JSON.stringify({
        //         email: this.email,
        //       password: this.password
        //     }));
            // axios.post('/api/auth/login',{
            //     email: this.email,
            //      password: this.password,
            // }).then(res=>{
            //     console.log(res);
            // }).catch(err=>{
            //     console.log(err);
            // });
          
            try{

              let res= await fetch(this.apiUrl+'api/userlogin',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    email: this.email,
                    password: this.password
                  })
               });
               let token = await res.json();
               console.log(token.message);
               if(token.message){
                if(token.message.email){
                    this.$bvToast.toast(token.message.email, {
                      variant: 'danger',
                      solid: true
                    });
                }
                if(token.message.password){
                    this.$bvToast.toast(token.message.password, {
                      variant: 'danger',
                      solid: true
                    });
                }

                this.$bvToast.toast(token.message, {
                      variant: 'danger',
                      solid: true
                    });
                
                this.spin =true;
                this.disabled = false;
                return false;
               }
               
               token = token.token;
               localStorage.setItem('token',token);
               if(localStorage.token){
                  this.$router.push('/home');
               }


      //   let response= await fetch(this.url+'/api/auth/login',{
      //       method:'POST',
      //       headers: {
      //            'Content-Type': 'application/json'
      //       },
      //       body: JSON.stringify({
      //           email: this.email,
      //         password: this.password
      //       })
      //   });

      //   const data = await response.json();
      //   this.spin = true;
      //   if(data.status == 500){
      //     this.message = data.message;
      //     return false;
          
      //   }
      //   localStorage.setItem("token",data.token);
        
      //   // console.log(this.$store);
      // //  this.$store.commit('SET_TOKEN', true);
      //   this.$router.push('/home');
      }
      catch(err){
        console.log(err);
        this.spin = true;
        
      }
        // this.$router.push('/');
        // try {
        //    await this.$auth.loginWith('local', {
        //     data: {
        //       email: this.email,
        //       password: this.password
        //     },
        //   }).then(() => this.$toast.success('Logged In!'));
        //   // this.$router.push('/');
        // } catch (error) {
        //   console.error(error)
        // }
      }
    }
  }
  </script>
  
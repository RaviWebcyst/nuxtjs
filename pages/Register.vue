<template>
<div class="col-md-5 mx-auto py-5  bg-light ">
  <div class="container">
    <div class="alert alert-info" v-if="message">{{ message }}</div>
  <form @submit.prevent="registerUser" >
    <div class="text-center py-3">
      <h5>Register</h5>
    </div>
    <div class="form-group">
      <label>Sponser Id:</label>
      <input type="text" v-model="spid" class="form-control" required @change="getSponser">
      <div class="text-danger" v-if="error">{{ error }}</div>
      <div class="text-success" v-if="success">{{ success }}</div>
      </div>
    <div class="form-group">
      <label>Name:</label>
      <input type="text" v-model="name" class="form-control" required>
      </div>
      <div class="form-group">
      <label>Email:</label>
      <input type="email" v-model="email" class="form-control" required>
      </div>
      <div class="form-group">
      <label>Password:</label>
      <input type="password" v-model="password" class="form-control" required>
      </div>
      <div class="form-group">
      
      <button type="submit" class="btn btn-primary" :disabled="disabled">Register <b-spinner variant="info" type="grow" label="Spinning" :class="{'d-none':spin}"></b-spinner></button>
      </div>
      <div class="pt-3">
          <strong>Already have an account?  </strong><span><nuxt-link to="/login" class="btn btn-link pl-2">Login</nuxt-link></span>
      </div>
    </form>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        spid:'',
        message:false,
        url:process.env.baseUrl,
        apiUrl:process.env.apiUrl,
        spin:true,
        disabled:false,
        success:false,
        error:false
      }
    },
    methods: {
       async registerUser() {
        this.disabled = true;
        this.spin = false;
        try {
          const response = await fetch(this.url+'/api/auth/register', {
            method:"POST",
            headers: {
                 'Content-Type': 'application/json'
            },
            body:JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password,
            spid:this.spid
            })
          });

          var data = await response.json();
          console.log(data);
          this.message = data.message;
          this.$bvToast.toast(this.message, {
            variant: 'info',
            solid: true
          });
          this.name = "";
          this.email = "";
          this.password = "";
          this.spin = true;
          this.disabled = false;
          
      
          // Handle successful registration (e.g., redirect to login page)
        } catch (error) {
          console.log(error.message);
          // Handle registration error (e.g., display error message)
        }
      },
      async getSponser(){
        try {
          const response = await fetch(this.apiUrl+'api/getSponser', {
            method:"POST",
            headers: {
                 'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              spid:this.spid
            })
          });

          var data = await response.json();
          console.log(data);
          if( data.error){
            this.error = data.error;
            this.success = false
          }
          if(data.sp_name){
            this.error ="";
            this.success = data.sp_name;
          }
         
          // Handle successful registration (e.g., redirect to login page)
        } catch (error) {
          console.log(error);
          // this.error = error.message;
          // this.success = false;
          // console.log(error.message);
          // Handle registration error (e.g., display error message)
        }
      }
    }
  }
  </script>
  
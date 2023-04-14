<template>
    <!-- <header>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li v-if="$auth.loggedIn"><span>Welcome, {{$auth.user.name}}</span></li>
          <li v-if="$auth.loggedIn"><button @click.prevent="$auth.logout()">Logout</button></li>
          <li v-else><router-link to="/login">Login</router-link></li>
          <li v-else><router-link to="/register">Register</router-link></li>
        </ul>
      </nav>
    </header> -->
    <div class="gs-container">
        <div class="row">
            <div class="col-lg-5 col-md-6 mx-auto" style="padding-bottom: 200px;">
                <img src="https://res.cloudinary.com/fiewin/image/upload/images/dwl-banner.png" alt="" class="w-100">
                <marquee behavior="sliding" class="py-2" direction="left"><img src="https://source.unsplash.com/100x100/?man" alt="" class="marquee-img rounded-circle">
                    ****139 ₹69 in Dice game
                </marquee>
                <div class="my-3">
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-5">
                            <p class="text-muted">Balance</p>
                            <h3>{{ balance }} <small>rupee</small></h3>
                            <p class="text-muted">UID: {{ user.uid }}</p>
                        </div>
                        <div class="col-5">
                            <nuxt-link to="recharge" class="btn btn-primary btn-block rounded-pill shadow mt-3"><b>Recharge</b></nuxt-link>
                            <button class="btn btn-light btn-block rounded-pill shadow mt-3"><b>Withdraw</b></button>
                        </div>
                        <div class="col-1"></div>
                    </div>
                    <!-- <div class="row mt-5">
                        <div class="col-6 text-center">
                            <i class="bi bi-gift-fill p-3 bg-warning rounded-pill text-white" style="font-size: 1.3rem;"></i>
                            <b>Task
                                Reward</b>
                        </div>
                        <div class="col-6 text-center">
                            <i class="bi bi-calendar-check-fill p-3 bg-success rounded-pill text-white" style="font-size: 1.3rem;"></i>
                            <b>Check In</b>
                        </div>
                    </div> -->
                    <div class="row mt-5">
                        <div class="col-6 my-2">
                            <nuxt-link to="spin" href="#">
                                <img src="https://res.cloudinary.com/fiewin1/image/upload/images/dwl-fastparity.png" class="w-100" alt="">
                            </nuxt-link>
                        </div>
                        <div class="col-6 "><a href="javascript:;">
                                <img :src="url+'coming-soon.png'" class="w-100" alt="">
                            </a></div>
                        <!-- <div class="col-6 my-2">
                            <a href="#">
                                <img src="https://res.cloudinary.com/fiewin1/image/upload/images/dwl-fastparity.png" class="w-100" alt="">
                            </a>
                        </div>
                        <div class="col-6 my-2"><a href="#">
                                <img src="https://res.cloudinary.com/fiewin1/image/upload/images/dwl-fastparity.png" class="w-100" alt="">
                            </a></div> -->
                    </div>
                </div>
               <Footer />
            </div>
        </div>

    </div>

  
  </template>


  <script>
export default {
  name: 'home',
  data(){
    return {
       user:{},
       url:process.env.appUrl,
       balance:0,
       user:{}
    }
  },
  async created(){
   if(process.browser){

     var data = await this.$jwt.getLoginUserInfo();
     this.user = data.user;
     this.balance = data.balance;
    //  var data = await this.$jwt.getUserInfo();
    //  this.user = data.data;
    //  this.balance = data.balance;
   }
  },
  mounted(){
    if(!localStorage.token){
        // this.$router.push("/login");
    }
  }
}
</script>
<style >
.gs-container{
    overflow-x: hidden;
}
</style>
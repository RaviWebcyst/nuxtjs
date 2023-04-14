<template>
    <div class="gs-container">
         <div class="row">
             <div class="col-lg-5 col-md-6 mx-auto" style="padding-bottom: 150px;">
                 <div class="py-2 border-bottom">
                     <h3 class="text-center"><b>Update Profile</b></h3>
                        <div class="my-5 container">
                            <form>
                                <div class="form-group">
                                    <label for=""> Profile Image</label>
                                    <input type="file" class="form-control" >
                                </div>
                                <div class="form-group">
                                    <label for=""> Password</label>
                                    <input type="password" class="form-control" v-model="form.password">
                                </div>
                                <div class="form-group">
                                    <label for=""> Confirm Password</label>
                                    <input type="password" class="form-control" v-model="form.cpwd">
                                </div>
                            </form>
                        </div>
                 </div>

             <Footer />
             </div>
         </div>
 
     </div>
 </template>
 
 <script>
 import pagination from 'vue-pagination-2';
 export default {
     name:"orders",
     components:{
        pagination
     },
     data(){
         return {
             user:{},
             wallets:[],
             apiUrl:process.env.apiUrl,
             records:1,
             page:1,
             per_page:1,
             last_page:1,
             form:{
                image:"",
                password:"",
                cpwd:""
             }
         }
     },
    async created(){
         if(process.client){
            //   var data = await this.$jwt.getUserInfo();
            //   this.user = data.data;
            var data = await this.$jwt.getLoginUserInfo();
            this.user = data.user;
         }
         this.transactions();
     },

     methods: {
        async transactions(){
      const response = await fetch(this.apiUrl+'api/transactions?page='+this.page, {
            method:"POST",
            headers: {
                 'Content-Type': 'application/json'
            },
            body:JSON.stringify({
            user_id:this.user.id,
            })
          });
          var res = await response.json();
          
          this.wallets = res.wallets.data;
          this.page = res.wallets.current_page;
          this.records = res.wallets.total;
          this.per_page = res.wallets.per_page;
          this.last_page = res.wallets.last_page;
        },
     },
 }
 
 </script>
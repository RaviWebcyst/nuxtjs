<template>
    <div class="gs-container">
         <div class="row">
             <div class="col-lg-5 col-md-6 mx-auto" style="padding-bottom: 150px;">
                 <div class="py-2 border-bottom">
                     <h3 class="text-center"><b>Transactions</b></h3>
                     <div class="table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <td>Amount</td>
                        <td>Type</td>
                        <td>Description</td>
                        <td>Date & Time</td>
                      </tr>
                      </thead>
                      <tbody v-if="wallets.length > 0">
                        <tr v-for="wallet in wallets">
                          <td>${{ wallet.amount }}</td>
                          <td>{{ wallet.type }}</td>
                          <td>{{ wallet.description }}</td>
                          <td>{{ new Date(wallet.created_at).toLocaleString() }}</td>
                        </tr>
                      </tbody>
                  </table>
                  <pagination v-model="page" :records="records" @paginate="transactions" :per-page="per_page" class="mt-4 d-none"  />
                </div>
                <b-pagination
                    v-model="page"
                    :total-rows="records"
                    :per-page="per_page"
                    last-number
                  ></b-pagination>
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
             last_page:1
         }
     },
    async created(){
         if(process.client){
              // var data = await this.$jwt.getUserInfo();
              // this.user = data.data;
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
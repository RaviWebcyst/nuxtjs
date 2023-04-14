<template>
    <div class="gs-container">
         <div class="row">
             <div class="col-lg-5 col-md-6 mx-auto" style="padding-bottom: 150px;">
                 <div class="py-2 border-bottom">
                    <div class="d-flex">

                      <h3 class="text-center"><b>Orders</b></h3>
                     </div>
                     <div class="table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <td>Game Id </td>
                        <td>Selected</td>
                        <td>Amount</td>
                        <td>Result</td>
                        <td>Status</td>
                        <td>Date & Time</td>
                      </tr>
                      </thead>
                      <tbody v-if="orders.length > 0">
                        <tr v-for="order in orders">
                          <td>{{ order.game_id }}</td>
                          <td :style="'color:'+order.color">{{ order.color }}</td>
                          <td>{{ order.bet }}</td>
                          <td>{{ order.result }}</td>
                          <td>{{ order.status }}</td>
                          <td>{{ new Date(order.created_at).toLocaleString() }}</td>
                        </tr>
                      </tbody>
                  </table>
                  <pagination v-model="page" :records="records" @paginate="myOrders" :per-page="per_page"  class="mt-3 d-none"/>
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
             orders:[],
             apiUrl:process.env.apiUrl,
             records:1,
             page:1,
             per_page:1
         }
     },
    async created(){
         if(process.client){
              // var data = await this.$jwt.getUserInfo();
              // this.user = data.data;
              var data = await this.$jwt.getLoginUserInfo();
             this.user = data.user;
         }
         this.myOrders();
     },

     methods: {
        async myOrders(){
      const response = await fetch(this.apiUrl+'api/myOrders?page='+this.page, {
            method:"POST",
            headers: {
                 'Content-Type': 'application/json'
            },
            body:JSON.stringify({
            user_id:this.user.id,
            })
          });
          var res = await response.json();
          this.orders = res.orders.data;
          this.page = res.orders.current_page;
          this.records = res.orders.total;
          this.per_page = res.orders.per_page
        },
     },
 }
 
 </script>
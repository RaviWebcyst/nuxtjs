<template>
   <div class="gs-container">
        <div class="row py-2">
            <div class="col-lg-5 col-md-6 mx-auto" style="padding-bottom: 200px;">
                <div class="row border-bottom align-items-center">
                    <div class="col-4 text-center">
                        <p class="text-muted">Records</p>
                    </div>
                    <div class="col-4 text-center">
                        <h5><b>Recharge</b></h5>
                    </div>
                    <div class="col-4 text-center">
                        <p class="text-muted">Help</p>
                    </div>
                </div>
                <p class="text-center mt-3 mb-0"><small>Balance</small></p>
                <h2 class="text-center"><b>₹{{ balance }}</b></h2>
                <div class="mt-3">
                    <p><b>Amount</b></p>
                    <form action="">
                        <label class="sr-only" for="amount">Username</label>
                        <div class="input-group mb-2 border-bottom">
                            <div class="input-group-prepend">
                                <div class="input-group-text border-0 bg-white" style="font-size: 2rem;">₹</div>
                            </div>
                            <input type="text" class="form-control form-control-lg border-0" id="amount" placeholder="25 ~ 50000" style="font-size: 2rem;" v-model="form.amount">
                        </div>
                    </form>
                    <div class="row justify-content-around">
                        <div class="col-4 my-2">
                            <button class="btn btn-dark btn-block" @click="cal(50)">₹50</button>
                        </div>
                        <div class="col-4 my-2">
                            <button class="btn btn-dark btn-block" @click="cal(300)">₹300</button>
                        </div>
                        <div class="col-4 my-2">
                            <button class="btn btn-dark btn-block" @click="cal(800)">₹800</button>
                        </div>
                        <div class="col-4 my-2">
                            <button class="btn btn-dark btn-block" @click="cal(3500)">₹3500</button>
                        </div>
                        <div class="col-4 my-2">
                            <button class="btn btn-dark btn-block" @click="cal(10000)">₹10,000</button>
                        </div>
                        <div class="col-4 my-2">
                            <button class="btn btn-dark btn-block" @click="cal(40000)">₹40,000</button>
                        </div>
                    </div>
                    <nuxt-link :to="{name:'payment',params:{amount:form.amount}}" class="btn btn-primary btn-block mt-3" >Recharge</nuxt-link>
                    <div class="mt-5">
                        <div class="row">
                            <div class="col-2"></div>
                            <div class="col-4 text-center">
                                <span class="p-2 bg-dark rounded-circle text-white ">
                                    <i class="bi bi-shield-fill-check " style="font-size: 1.3rem;"></i> 
                                </span>
                                <span> Security</span>
                            </div>
                            <div class="col-4 text-center">
                                <i class="bi bi-lightning-charge-fill p-2 bg-dark rounded-circle text-white" style="font-size: 1.3rem;"></i> Fast
                            </div>
                            <div class="col-2"></div>
                        </div>
                    </div>
                    <!-- <marquee behavior="sliding" direction="up">Hellooooo</marquee> -->
                    <!-- <marquee behavior="sliding" class="mt-4 text-center py-2" direction="up"><img src="https://source.unsplash.com/100x100/?man" alt="" class="marquee-img rounded-circle">
                        ****139 ₹69 in Dice game
                    </marquee> -->
                <div class="table-responsive my-5">
                    <table class="table table-striped  mt-5">
                    <thead>
                        <tr>
                            <th>Hash</th>
                            <th>Screen Shot</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                            <!-- <th>Action</th> -->
                        </tr>
                    </thead>
                    <tbody v-if="payments.length > 0">
                        <tr class="lh" v-for="pay in payments" v-if="pay.status == 'Pending'">
                            <td class="text-dark">{{ pay.ref_no }}</td>
                            <td><img :src="apiUrl+'payments/'+pay.image" alt="" width="100"></td>
                            <td class="text-dark">{{ pay.amount }}</td>
                            <td class="text-danger">Pending</td>
                            <td class="text-dark">{{ new Date(pay.updated_at).toLocaleString() }}</td>
                            <!-- <td><a href="javascript:;" @click="checkStatus(pay.upi_id,pay.amount,pay.ref_no,pay.user_id,pay.screen_shot)">Check Status</a></td> -->
                        </tr>
                    </tbody>
                </table>
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
  // components:{
  //   vuejsCountdownTimer
  // },
  
  data(){
    return {
       balance:0,      
       form:{
        amount:""
       },
       payments:[],
       apiUrl:process.env.apiUrl,
       url:process.env.appUrl
    }
  },
  async created(){
   if(process.browser){
    //  var data = await this.$jwt.getUserInfo();
    //  this.balance= data.balance;
        var data = await this.$jwt.getLoginUserInfo();
     this.balance = data.balance;
   }
   this.getPayments();
  },
  methods:{
 
    cal(amount){
        this.form.amount = amount;
    },
    async getPayments(){
        const response = await fetch(this.apiUrl+'api/getPayments', {
            method:"POST",
            headers: {
                 'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                token:localStorage.token
            })
          });
          var res = await response.json();
          console.log(res);
          this.payments  = res.payments;
    }
  }
}

</script>
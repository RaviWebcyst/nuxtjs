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
    <div class="col-md-5 mx-auto  mb-5 card">
      <div class="mt-3">
      <Spinner @game_id="getId" @prev_game_id="prevGame"/>
      </div>
      <div class="row my-3 container">
        <div class="col-6">
          <h6>Game Id</h6>
          <div><strong>{{ game_id.game_id }}</strong></div>
        </div>
        <div class="col-6 text-right">
          <h6>Count Down</h6>
          <div><strong>
           
            {{ hours }}:{{ minutes }}:{{ seconds }}
            <!-- <vuejs-countdown-timer
              :start-time="times.start_time"
              :end-time="times.end_time"
              :interval="1000"
              label-position="begin"
              :end-text="null"
              :day-txt="null"
              :hour-txt="':'"
              :minutes-txt="':'"
              :seconds-txt="null"
            >
            </vuejs-countdown-timer> -->

          </strong></div>
        </div>
      </div>
      <div class="col-md-12 mx-auto my-5">
          <h6 class="text-center mb-3">Choose Color</h6>
          <div class="row">
            <div class="col-4">
              <button class="btn btn-primary btn-block" @click="colors('blue',1)" :class="{'disabled':blue}">Blue</button>
            </div>
            <div class="col-4">
              <button class="btn btn-danger btn-block" @click="colors('red',2)" :class="{'disabled':red}">Red</button>
            </div>
            <div class="col-4">
              <button class="btn btn-warning btn-block text-white" @click="colors('yellow',3)" :class="{'disabled':yellow}">Yellow</button>
            </div>
          </div>
        </div>
        <div class="col-md-12 mx-auto my-2 mb-4">
          
          <div class="my-2">
            <div class="d-flex"></div>
              <p><b>BET AMOUNT</b></p>
              <form action="">
                  <div class="input-group mb-2 border-bottom">
                      <div class="input-group-prepend">
                          <div class="input-group-text border-0 bg-white" style="font-size: 1.5rem;">₹</div>
                      </div>
                      <input type="text" class="form-control  border-0" v-model="form.amount" placeholder="25 ~ 50000" style="font-size: 1.5rem;">
                  </div>
                </form>
                
          </div>

        <div class="row">
          <div class="col-3">
            <button class="btn btn-outline-dark btn-block" @click="cal(10)" >10</button>
          </div>
          <div class="col-3">
            <button class="btn btn-outline-dark btn-block" @click="cal(20)">20</button>
          </div>
          <div class="col-3">
            <button class="btn btn-outline-dark btn-block" @click="cal(50)">50</button>
          </div>
          <div class="col-3">
            <button class="btn btn-outline-dark btn-block" @click="cal(100)">100</button>
          </div>
          
        </div>
        <div class="row mt-3">
          <div class="col-3">
            <button class="btn btn-outline-dark btn-block" @click="cal(250)">250</button>
          </div>
          <div class="col-3">
            <button class="btn btn-outline-dark btn-block" @click="cal(500)">500</button>
          </div>
          <div class="col-3">
            <button class="btn btn-outline-dark btn-block" @click="cal(1000)">1000</button>
          </div>
          <div class="col-3">
            <button class="btn btn-outline-dark btn-block" @click="cal(5000)">5000</button>
          </div>
          
        </div>
        <div class="mb-2 mt-5">
            <button class="btn btn-block btn-outline-dark" :disabled="disable" @click="submitBet">Submit <b-spinner variant="info" type="grow" label="Spinning" :class="{'d-none':spin}"></b-spinner></button>
        </div>
        </div>
        

        <div class="mb-5 pb-5 pt-2 mt-2 cstm-tab">
            <b-tabs content-class="mt-3 " fill>
              <b-tab title="All Orders" active>
                <div class="table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Game Id </th>
                        <th>User </th>
                        <th>Selected</th>
                        <th>Amount</th>
                        <th>Result</th>
                        <th>Status</th>
                      </tr>
                      </thead>
                      <tbody v-if="all_orders.length > 0">
                        <tr v-for="order in all_orders">
                          <td>{{ order.game_id }}</td>
                          <td>{{ order.user_id }}</td>
                          <td :style="'color:dark-'+order.color">{{ order.color }}</td>
                          <td>{{ order.bet }}</td>
                          <td>{{ order.result }}</td>
                          <td>{{ order.status }}</td>
                        </tr>
                      </tbody>
                  </table>
                </div>

              </b-tab>
              <b-tab title="My Orders">
                <div class="table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <td>Game Id </td>
                        <td>Selected</td>
                        <td>Amount</td>
                        <td>Result</td>
                        <td>Status</td>
                      </tr>
                      </thead>
                      <tbody v-if="my_orders.length > 0">
                        <tr v-for="order in all_orders">
                          <td>{{ order.game_id }}</td>
                          <td :style="'color:dark-'+order.color">{{ order.color }}</td>
                          <td>{{ order.bet }}</td>
                          <td>{{ order.result }}</td>
                          <td>{{ order.status }}</td>
                        </tr>
                      </tbody>
                  </table>
                </div>
                  <nuxt-link to="orders" class="text-center">View More</nuxt-link>
              </b-tab>
              
            </b-tabs>
        </div>


        
        <div class="container">
        <div class="modal fade" id="modal" aria-hidden="true" :class="{'show d-block':modal2}" >
            <div class="modal-dialog modal-dialog-centered " v-if="results.length > 0" >
                <div class="modal-content game_table_bg" v-for="result in results">
                    <div class="modal-header text-center" id="header"  :class="result.profit > 0 ? 'bg-success': result.loss > 0?'bg-danger':''">
                        <h5 class="modal-title text-center text-white" id="title">{{ result.profit > 0 ? "WIN":result.loss > 0? "LOSE":"" }}</h5>
                        <button class="close" data-dismiss="modal" aria-label="Close" @click="modalss"><span
                                aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex justify-content-center">
                            <p class="h1  rounded-circle px-3 py-3 text-white" id="number" style="width:75px;height: 75px;" :class="'bg-'+result.result"></p>
                        </div>
                        <div class="row mb-2 justify-content-center">
                            <div class="col text-center">Game ID</div>
                            <div class="col text-center">{{ result.game_id}}</div>
                        </div>

                        <div class="rounded-lg bg-cstm p-2 text-white">
                            <div class="d-flex flex-row justify-content-between mb-2" v-if="records >1">
                                <button class="btn btn-secondary" id="prev" :disabled="page == 1?true:false" @click="prev()">Prev</button>
                                <button class="btn btn-secondary" id="next" :disabled="page == records?true:false" @click="next()">Next</button>
                            </div>

                            <table class="table text-white table-borderless text-center" >
                                <tbody >
                                    <tr>
                                        <th class="text-dark">Bet Amount</th>
                                        <td id="point" class="text-dark">{{ result.bet }}$</td>
                                    </tr>
                                    <tr>
                                        <th class="text-dark">Selected</th>
                                        <td id="select" class="text-dark">{{result.color}}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-dark">{{ result.profit > 0 ? 'Profit':'Lose' }}</th>
                                        <td class="h5" :class="result.profit > 0 ? 'text-success':'text-danger'" >{{ result.profit > 0 ? result.profit:result.loss }}$</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

      <Footer />
    </div>

  
  </template>


  <script>
// import vuejsCountdownTimer from 'vuejs-countdown-timer';
import io from 'socket.io-client';

export default {
  name: 'home',
  // components:{
  //   vuejsCountdownTimer
  // },
  
  data(){
    return {
       user:{},
       form:{
        amount:"",
        color:"",
         type:""
       },
       times:{},
       game_id:{},
       appUrl:process.env.baseUrl,
       apiUrl:process.env.apiUrl,
       minutes:'00',
       hours:'00',
       seconds:'00',
       spin:true,
       disable:false,
       all_orders:[],
       my_orders:[],
       modal2:false,
       results:[],
       records:1,
       page:1,
       disabled:false,
       red:false,
       blue:false,
       yellow:false,
       prev_game_id:""
      
    }
  },
  async created(){
   if(process.browser){
    //  var data = await this.$jwt.getUserInfo();
    //  this.user= data.data;
     var data = await this.$jwt.getLoginUserInfo();
     this.user = data.user;
   }
   this.getTimes();
   this.getGameId();
   this.allOrders();
   this.myOrders();

  },
  methods:{
    prevGame(id){
      this.prev_game_id = id;
    },
        next(){
            this.page = this.page+1;
            console.log(this.page);
            this.getResult();
        },
        prev(){
            this.page = this.page-1;
            this.getResult();
        },
    modalss(){
      this.modal2 = false;
    },

    async getResult(){
      const response = await fetch(this.apiUrl+'api/getResult?page='+this.page, {
            method:"POST",
            headers: {
                 'Content-Type': 'application/json'
            },
            body:JSON.stringify({
            user_id:this.user.id,
            game_id:this.prev_game_id
            })
          });
          var res = await response.json();
          console.log(res.data);
          this.results = res.data;
         
          this.page = res.current_page;
          this.records = res.total;
          
    },
    async allOrders(){
      let res = await fetch(this.apiUrl+'api/allOrders',{method:'POST'});
      res= await res.json();
      this.all_orders = res.orders.data;
    },
    async myOrders(){
      const response = await fetch(this.apiUrl+'api/myOrders', {
            method:"POST",
            headers: {
                 'Content-Type': 'application/json'
            },
            body:JSON.stringify({
            user_id:this.user.id,
            })
          });
          var res = await response.json();
          this.my_orders = res.orders.data;
    },
    cal(amount){
      this.form.amount = amount;
    },
    async getTimes(){
      let res = await fetch(this.appUrl+'/api/getTime');
      var times = await res.json();
      this.times = times.timer;
    },
    async getGameId(){
      let res = await fetch(this.appUrl+'/api/getGameId');
      var game_id = await res.json();
      this.game_id = game_id.game_id;
    } ,
     getId(value){
      var month = new Date().getMonth();
        var date = new Date().getDate();
        if (date < 9) {
            var date = "0" + date;
        }
        if (month < 9) {
            var month = "0" + month;
        }
        var year = new Date().getFullYear();

        var game_id = String(year) + String(month) + String(date) + "0001";
        if(this.game_id == 'undefined'){
          this.game_id = game_id;
        }
        if(value){

          this.game_id = value.game_id;
        }
    },
    colors(culr,type){
      this.form.color= culr;
      this.form.type= type;
      if(culr == 'blue') { this.blue =true;this.red=false;this.yellow=false;}
      if(culr == 'red') { this.blue =false;this.red=true;this.yellow=false;}
      if(culr == 'yellow') { this.blue =false;this.red=false;this.yellow=true;}
    },
    async submitBet(){
      this.spin = false;
      try {
        this.disable = true;
          const response = await fetch(this.appUrl+'/api/submitBet', {
            method:"POST",
            headers: {
                 'Content-Type': 'application/json'
            },
            body:JSON.stringify({
            amount: this.form.amount,
            type: this.form.type,
            color: this.form.color,
            user_id:this.user.id,
            game_id:this.game_id.game_id
            })
          });

          var data = await response.json();
          this.myOrders();
          this.allOrders();
          this.message = data.message;

          var variant = 'success';
          if(data.status == 500){
            variant = 'danger';
          }

          this.$bvToast.toast(this.message, {
            variant: variant,
            solid: true
          });
          // alert(this.message);
          this.form.amount = "";
          this.form.color = "";
          this.form.type = "";
          this.spin = true;
          this.disable = false;
          this.red = false;
          this.yellow = false;
          this.blue = false;
         
      
        } catch (error) {
          console.log(error.message);
          this.spin = true;
          this.disable=false;
          this.red = false;
          this.yellow = false;
          this.blue = false;
          // this.disable = false;
         
        }
    }
  },

  mounted(){

   
    if(!localStorage.token){
        this.$router.push("/login");
    }
    var vm = this;

    setInterval(function () {
            var now = new Date().getTime();
            vm.distance = vm.times.end_time - now;
            var m = Math.floor(vm.distance % (1000 * 60 * 60)) / (1000 * 60);
            vm.minutes = parseFloat(m).toFixed(0);
            vm.seconds = Math.floor((vm.distance % (1000 * 60)) / 1000);
            // console.log(vm.minutes);
            if(vm.seconds < 1 && vm.minutes < 1){
              vm.minutes = '00';
              vm.seconds = '0';
            }
           
            if (vm.minutes == 0 && (vm.seconds == 8 || vm.seconds == 9)) {
                // vm.$loading.show();
                // vm.disabled = true;
            }
            if (vm.seconds < 10) {
                vm.seconds = "0" + vm.seconds;
            }
            console.log(vm.minutes);
            if (vm.seconds < 1 && vm.minutes < 1) {
              
              vm.getTimes();
              vm.getResult();
              if(vm.results.length > 0){
                 vm.modal2 = true;
              }
              vm.getGameId();
              vm.myOrders();
              vm.allOrders();
            }

            if (vm.seconds > 29) {
                vm.minutes -= 1;
                vm.minutes = vm.minutes.toString();
            }
            if (vm.minutes != '00') {
                vm.minutes = "0" + vm.minutes;
            }
           
            if (vm.minutes == 0 && vm.seconds <= 10) {
                vm.disable = true;
                
               
            }
            if (vm.minutes == 0 && vm.seconds == 10) {
              console.log('working');
              const socket = io('http://localhost:4000');
              socket.emit('rotate','spin_rotate');
              
            }
            if (vm.minutes >= 0 && vm.seconds >= 10) {
              vm.disable = false;
            }
            if (vm.minutes < 1) {
                // vm.disable= true;
                
                // vm.spinShow = true;
                // vm.getResults();
                // vm.$loading.show();
            }
            if (vm.minutes > 0) {
                vm.disable= false;
                // vm.spinShow = true;
                // vm.getResults();
                // vm.$loading.show();
            }
            if (vm.minutes <= 0 && vm.seconds <= 0) {
            
                // vm.disabled = false;
                // vm.getResults();
                // vm.spinShow = false;
                // vm.$loading.hide();
                // window.location.reload();
            }
           

            if (vm.distance < 0) {
                // vm.getResults();
                if (vm.distance < -1000 * 60 * 24 * 1) {
                    vm.countDownDate += 1000 * 60 * 60 * 24 * 1 * 365;
                }
            }
        }, 1000);
  },

}
</script>
<style>
.cstm-tab>div>div>ul>li>.active{
background-color:#17a2b8 !important;
color:white !important;
}
.cstm-tab>div>div>ul>li>a{
  color:black;
}
.bg-Blue{
  background-color: darkblue;
}
.bg-Red{
  background-color: darkred;
}
.bg-Yellow{
  background-color: rgb(207, 203, 13);
}
</style>
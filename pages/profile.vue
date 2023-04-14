<template>
   <div class="gs-container">
        <div class="row">
            <div class="col-lg-5 col-md-6 mx-auto" style="padding-bottom: 150px;">
                <div class="py-2 border-bottom">
                    <h3 class="text-center"><b>Profile</b></h3>
                </div>
                <div class="row mt-3 align-items-center">
                    <div class="col-3 text-center">
                        <img src="https://res.cloudinary.com/fiewin/image/upload/images/defaultAvatar.png" alt=""
                            class="w-50">
                    </div>
                    <div class="col-6">
                        <p class="m-0"><b>UID:{{ user.uid }}</b></p>
                        <p class="m-0">Email: {{ user.email }}</p>
                        <p class="m-0">Name: {{ user.name }}</p>
                    </div>
                    <div class="col-3">
                        <p>Modify <i class="bi bi-chevron-right"></i></p>
                    </div>
                </div>
                <ul class="list-group list-group-flush mt-5">
                    <nuxt-link to="orders" class="list-group-item d-flex justify-content-between align-items-center list-style-none text-dark" >
                        <p><i class="bi bi-list-ul" style="font-size: 1.3rem;"></i> Order Record</p>
                        <i class="bi bi-chevron-right"></i>
                    </nuxt-link>
                    <nuxt-link class="list-group-item d-flex justify-content-between align-items-center list-style-none text-dark" to="transactions">
                        <p><i class="bi bi-wallet2" style="font-size: 1.3rem;"></i> All Transactions</p>
                        <i class="bi bi-chevron-right"></i>
                    </nuxt-link>
                </ul>
                <ul class="list-group list-group-flush mt-5">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <p><i class="bi bi-info-circle" style="font-size: 1.3rem;"></i> About Us</p>
                        <i class="bi bi-chevron-right"></i>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <p><i class="bi bi-chat-dots" style="font-size: 1.3rem;"></i> Financial Details</p>
                        <i class="bi bi-chevron-right"></i>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <p><i class="bi bi-telegram" style="font-size: 1.3rem;"></i> Financial Details</p>
                        <i class="bi bi-chevron-right"></i>
                    </li>
                </ul>
                <h4 class="text-center"><a href="javascript:;" class="text-muted " @click="logout">Sign Out</a></h4>
            <Footer />
            </div>
        </div>

    </div>
</template>
<script>
export default {
    name:"profile",
    data(){
        return {
            user:{}
        }
    },
   async created(){
        if(process.client){
            //  var data = await this.$jwt.getUserInfo();
            //  this.user = data.data;
            var data = await this.$jwt.getLoginUserInfo();
            this.user = data.user;
        }
    },
    methods: {
        logout(){
            // if(process.client){
                localStorage.removeItem('token');
                this.$router.push("/login");
            // }
        }
    },
}

</script>
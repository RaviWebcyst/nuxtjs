<template>
    <footer class="col-lg-5 col-md-6 mx-auto" style="z-index:99">
        <div class="row justify-content-around">
            <div class="col-3 text-center">
                <nuxt-link to="home" class="d-block text-dark">
                    <i class="bi bi-house-fill" style="font-size: 1.5rem;"></i>
                    <p class="m-0">Home</p>
                </nuxt-link>
            </div>
            <div class="col-3 text-center">
                <nuxt-link to="invite" class="d-block text-dark">
                    <i class="bi bi-card-text" style="font-size: 1.5rem;"></i>
                    <p class="m-0">Invite</p>
                </nuxt-link>
            </div>
            <div class="col-3 text-center">
            <nuxt-link to="recharge" class="d-block text-dark">
                    <i class="bi bi-cash-coin" style="font-size: 1.5rem;"></i>
                    <p class="m-0">Recharge</p>
            </nuxt-link>
            </div>
            <div class="col-3 text-center">
            <nuxt-link to="profile" class="d-block text-dark">
                    <i class="bi bi-person-fill" style="font-size: 1.5rem;"></i>
                    <p class="m-0">Profile</p>
            </nuxt-link>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
  name: 'Footer',
  data(){
    return {
        url:process.env.appUrl
    }
  },
  mounted(){
    if(!localStorage.token){
        this.$router.push("/login");
    }
  }
}
</script>
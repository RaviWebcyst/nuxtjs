<template>
    <div class="">
      <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"> -->
      <!-- Bootstrap Icons -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
        <div class="col-lg-5 col-md-6 mx-auto " style="padding-bottom: 200px;">
            <div class="row border-bottom align-items-center bg-primary text-white py-2">
                <div class="col-4 text-left">
                    <nuxt-link to="recharge" class="text-white"><i class="bi bi-chevron-left"></i></nuxt-link>
                </div>
                <div class="col-4 text-center text-white">
                    <h5><b>Recharge</b></h5>
                </div>
                <div class="col-4 text-right">
                    <p>Help</p>
                </div>
            </div>
            <div class="row">
            <div class="bg-primary text-white pt-3 p-2">
                <p class="mb-0">Transaction ID: 987632</p>
                <div class="row align-items-center">
                    <div class="col-6">
                        <h2><b>₹{{ amount }}</b><button
                                class="btn btn-outline-light ml-3 btn-sm rounded-pill">Copy</button></h2>
                    </div>
                    <div class="col-6 text-right">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
                            alt="" class="w-25 bg-white">
                        <button class="btn btn-outline-light btn-sm ml-3 rounded-pill">Save</button>
                    </div>
                </div>
            </div>
          </div>
            <div class="mt-3">
                <div class="row">
                    <div class="col-1 align-items-center">
                        <div id="ss-check" class="bg-grey rounded-circle d-flex justify-content-center text-white" style="width:25px;height: 25px;">
                            <i class="bi bi-check"></i>
                        </div>
                        <div id="ss-timeline" class="bg-grey h-100 ml-2" style="width: 6px;"></div>
                    </div>
                    <div class="col-11 pb-5">
                        <div class="h5">If You have paid, please upload a screenshot</div>
                        <!-- <div class="position-relative" style="width: 13%;">
                            <img id="myImg"
                                src="https://cdn.osxdaily.com/wp-content/uploads/2019/09/example-screenshot-iphone-11-pro-369x800.jpeg"
                                alt="" style="width: 100%;" @click ="myImg">
                            <button class="position-absolute btn btn-primary rounded-0"
                                style="right: 0; bottom: 0"><i class="bi bi-zoom-in"></i></button>
                        </div> -->
                        <label class="image-choose-btn" id='img-btn' v-if="images == undefined">
                            <i class="bi bi-plus" style="font-size: 2rem;"></i>
                            <input type="file" name="image" v-on:change="checkEnable" id="imgInp">
                            Upload
                        </label>
                        <div class='position-relative' id='image-div' v-if="images != undefined">
                            <img id="blah" :src="'/../uploads'+images" alt="your image" width="100" />
                            <!-- <label class='btn btn-outline-primary rounded-pill btn-sm text-primary' id="change-btn">
                                Change
                                <input type="file" style="display: none;" name="image" @change="checkEnable1"
                                    id="imgInp1" />
                            </label> -->
                        </div>
                        <div class='position-relative' id='image-div'  style="display:none; "  v-else>
                            <!-- <img id="blah" src="#" alt="your image" width="100" /> -->
                            <img id="blah" src="#" alt="your image" width="100" />
                            <!-- <label class='btn btn-outline-primary rounded-pill btn-sm text-primary' id="change-btn">
                                Change
                                <input type="file" style="display: none;" name="image" @change="checkEnable1"
                                    id="imgInp1" />
                            </label> -->
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-1 align-items-center">
                        <div id="process-check"
                            class="bg-grey rounded-circle d-flex justify-content-center text-white" style="width:25px;height: 25px;"><i
                                class="bi bi-check"></i></div>
                        <div id="process-timeline" class="bg-grey h-100 ml-2" style="width: 6px;"></div>
                    </div>
                    <div class="col-11 pb-5">
                        <div class="h5">We are processing your recharge</div>
                        <!--<div id="countdown" class="h4"></div>-->
                    </div>
                </div>
                <div class="row" v-if="completed == 'rejected'">
                    <div class="col-1 align-items-center">
                        <div id="cross-check"
                            class="bg-grey rounded-circle d-flex justify-content-center text-white"><i class="bi bi-x"></i></div>
                        <!-- <div class="bg-grey h-100 w-25 mx-auto"></div> -->
                    </div>
                    <div class="col-11">
                        <div class="h5">Rejected</div>
                    </div>
                </div>
                <div class="row" v-else>
                    <div class="col-1 align-items-center">
                        <div id="complete-check"
                            class="bg-grey rounded-circle d-flex justify-content-center text-white" style="width:25px;height: 25px;"><i
                                class="bi bi-check"></i></div>
                        <!-- <div class="bg-grey h-100 w-25 mx-auto"></div> -->
                    </div>
                    <div class="col-11">
                        <div class="h5">Completed</div>
                    </div>
                </div>
            </div>
            
        </div>


</div>
</template>
<script>
// import $ from 'jquery';

export default {
data() {
    return {
        amount: this.$route.params.amount,
        upi: this.$route.params.upi,
        refno: this.$route.params.refno,
        user_id: this.$route.params.user_id,
        completed: "",
        images: this.$route.params.image,
        apiUrl:process.env.apiUrl


    }
},
created() {
    if(this.$route.params.amount == undefined){
        this.$router.push("recharge");
    }
    // if (this.$route.name == 'slipUpload') {
        // var interval = setInterval(() => {
        //     console.log("amount" + this.amount);
        //     axios
        //         .get("/demo/api/getStatus", {
        //             params: {
        //                 refno: this.refno
        //             }
        //         })
        //         .then(res => {
        //             console.log("ressss " + res.data.status);
        //             if (res.data.status == 1) {
        //                 this.refno = "";
        //                 this.completed = "completed";
        //                 document.getElementById('process-timeline').classList.toggle('bg-success');
        //                 document.getElementById('process-timeline').classList.toggle('bg-grey');
        //                 document.getElementById('complete-check').classList.toggle('bg-success');
        //                 document.getElementById('complete-check').classList.toggle('bg-grey');

        //                 clearInterval(interval);
        //             }
        //             else if (res.data.status == 2) {
        //                 this.completed = "rejected";
        //                 this.refno = "";
        //                 document.getElementById('process-timeline').classList.toggle('bg-danger');
        //                 document.getElementById('process-timeline').classList.toggle('bg-grey');
        //                 document.getElementById('cross-check').classList.toggle('bg-danger');
        //                 document.getElementById('cross-check').classList.toggle('bg-grey');

        //                 clearInterval(interval);
        //             }
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         });

        // }, 5000);
    // }
},
methods: {
   async checkEnable(e) {

        var image = e.target.files[0];

        const [file] = imgInp.files;
        //   console.log("file",file);
        var blah = document.getElementById('blah');
        if (file) {
            blah.src = URL.createObjectURL(file)
            document.getElementById('img-btn').style.display = 'none';
            document.getElementById('image-div').style.display = 'block';
        }

        var forms = new FormData();
        
        forms.append('image', image);
        forms.append('amount', this.amount);
        forms.append('upi', this.upi);
        forms.append('refno', this.refno);
        forms.append('token', localStorage.token);

        // var plainFormData = Object.fromEntries(forms.entries());
        // var jsonData = JSON.stringify(plainFormData);

        // console.log(jsonData);

        // for (const pair of forms.entries()) {
        //      console.log(`${pair[0]}, ${pair[1]}`);
        // }


        //   console.log("file"+ JSON.stringify(file));
        try {
          const response = await fetch(this.apiUrl+'api/payment', {
            method:"POST",
            // headers: {
            //     'Content-Type': 'multipart/form-data',
            //     // 'Content-Type': 'application/json',
            // },
            body:forms
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
        
        // axios
        //     .post("/demo/api/payment/" + this.user_id, formData,
        //         {
        //             headers: {
        //                 'content-type': 'multipart/form-data'
        //             },
        //         })
        //     .then(res => {
        //         console.log(res);


        //         //this.s("payment request sent to admin");

        //         //this.$router.push({name:"wallet"});
        //         //localStorage.setItem("path", "wallet");
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         this.e(err.response.data.message);
        //     });

        // Changing the colors of timeline
        document.getElementById('ss-check').classList.toggle('bg-success');
        document.getElementById('ss-check').classList.toggle('bg-grey');
        document.getElementById('ss-timeline').classList.toggle('bg-success');
        document.getElementById('ss-timeline').classList.toggle('bg-grey');
        document.getElementById('process-check').classList.toggle('bg-success');
        document.getElementById('process-check').classList.toggle('bg-grey');

        // Starting countdown timer
        // if (type === 'ss') {
        //     document.getElementById('countdown').style.animationPlayState = 'running';
        // }

        console.log(this.completed);
        if (this.completed) {
            document.getElementById('process-timeline').classList.toggle('bg-success');
            document.getElementById('process-timeline').classList.toggle('bg-grey');
            document.getElementById('complete-check').classList.toggle('bg-success');
            document.getElementById('complete-check').classList.toggle('bg-grey');
        }

    },
    checkEnable1(e) {
        var image = e.target.files[0];
        const [file1] = imgInp1.files;
        console.log("file", file1);
        var blah = document.getElementById('blah');
        if (file1) {
            blah.src = URL.createObjectURL(file1)
            console.log(document.getElementById('img-btn'));
            document.getElementById('img-btn').style.display = 'none';
            document.getElementById('image-div').style.display = 'block';
        }


        let formData = new FormData();

        formData.append('refno', this.refno);
        console.log(formData);


        //   console.log("file"+ JSON.stringify(file));

        // axios
        //     .post("/demo/api/payment/" + this.user_id, formData,
        //         {
        //             headers: {
        //                 'content-type': 'multipart/form-data'
        //             },
        //         })
        //     .then(res => {
        //         console.log(res);

        //         //this.s("payment request sent to admin");

        //         //this.$router.push({name:"wallet"});
        //         //localStorage.setItem("path", "wallet");
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         this.e(err.response.data.message);
        //     });

        // // Changing the colors of timeline
        document.getElementById('ss-check').classList.toggle('bg-success');
        document.getElementById('ss-check').classList.toggle('bg-grey');
        document.getElementById('ss-timeline').classList.toggle('bg-success');
        document.getElementById('ss-timeline').classList.toggle('bg-grey');
        document.getElementById('process-check').classList.toggle('bg-success');
        document.getElementById('process-check').classList.toggle('bg-grey');

    }
},
mounted() {
    if(this.images != undefined){
        document.getElementById('ss-check').classList.toggle('bg-success');
        document.getElementById('ss-check').classList.toggle('bg-grey');
        document.getElementById('ss-timeline').classList.toggle('bg-success');
        document.getElementById('ss-timeline').classList.toggle('bg-grey');
        document.getElementById('process-check').classList.toggle('bg-success');
        document.getElementById('process-check').classList.toggle('bg-grey');

    }
    // $('#countdown').get([0]).style.animationPlayState = 'paused';
    // $(document).ready(function () {
    //     function checkEnable(type) {
    //         //alert('ertyuio')
    //         $((type + '-check')).addClass('bg-grey');
    //         $((type + '-check')).removClass('bg-success');
    //         $((type + '-progress')).addClass('bg-grey');
    //         $((type + '-progress')).removClass('bg-success');
    //         if (type === 'ss') {
    //             // $('#countdown').get([0]).style.animationPlayState = 'running';
    //         }
    //     }
    //     var countdown;
    //     var deadline = new Date().getTime() + 61000;
    //     countdown = setInterval(() => {
    //         var start = new Date().getTime();
    //         var t = deadline - start;
    //         var seconds = Math.floor((t % (1000 * 60)) / 1000);
    //         // document.getElementById('countdown').style.setProperty('--timer-deg', Math.floor(360 - (360 / seconds)));
    //         // console.log(Math.floor(360 - (360 / seconds)))
    //         if (seconds.toString().length == 1) { seconds = seconds.toString().padStart(2, 0) }
    //         $('#countdown').text(seconds);
    //         if (t <= 0) {
    //             $('#countdown').text('00');
    //             clearInterval(countdown);
    //             // startTimer(new Date().getTime() + 0.1 * 60000);
    //         }
    //     }, 1000);
    //     clearInterval(countdown);

    //     var span = document.getElementsByClassName("close")[0];

    //     span.onclick = function () {
    //         // modal.style.display = "none";
    //     }
    // });
}
}
</script>
<style>
/* :root {
--timer-deg: 350deg;
}

#countdown {
--timer-deg: 359deg;
height: 60px;
width: 60px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 50%;
background-image: conic-gradient(blue 0deg, blue 359deg, cyan 359deg, cyan 360deg);
color: #fff;
animation-name: timer;
animation-duration: 1s;
animation-iteration-count: 60;
animation-timing-function: linear;
}

@keyframes timer {
0% {
    background-image: conic-gradient(blue 0deg, blue 360deg, cyan 360deg, cyan 360deg);
}

10% {
    background-image: conic-gradient(blue 0deg, blue 336deg, cyan 336deg, cyan 360deg);
}

20% {
    background-image: conic-gradient(blue 0deg, blue 288deg, cyan 288deg, cyan 360deg);
}

30% {
    background-image: conic-gradient(blue 0deg, blue 252deg, cyan 252deg, cyan 360deg);
}

40% {
    background-image: conic-gradient(blue 0deg, blue 216deg, cyan 216deg, cyan 360deg);
}

50% {
    background-image: conic-gradient(blue 0deg, blue 180deg, cyan 180deg, cyan 360deg);
}

60% {
    background-image: conic-gradient(blue 0deg, blue 144deg, cyan 144deg, cyan 360deg);
}

70% {
    background-image: conic-gradient(blue 0deg, blue 108deg, cyan 108deg, cyan 360deg);
}

80% {
    background-image: conic-gradient(blue 0deg, blue 72deg, cyan 72deg, cyan 360deg);
}

90% {
    background-image: conic-gradient(blue 0deg, blue 36deg, cyan 36deg, cyan 360deg);
}

100% {
    background-image: conic-gradient(blue 0deg, blue 0deg, cyan 0deg, cyan 360deg);
}
} */

.modal-content {
animation-name: zoom;
animation-duration: 0.6s;
}

@keyframes zooms {
from {
    transform: scale(0.1)
}

to {
    transform: scale(1)
}
}

.close {
position: absolute;
top: 15px;
right: 35px;
color: #f1f1f1;
font-size: 40px;
font-weight: bold;
transition: 0.3s;
}

.close:hover,
.close:focus {
color: #bbb;
text-decoration: none;
cursor: pointer;
}

.modal {
display: none;
position: fixed;
z-index: 55;
padding-top: 100px;
left: 0;
top: 0;
width: 100%;
height: 100%;
overflow: auto;
background-color: rgb(0, 0, 0);
background-color: rgba(0, 0, 0, 0.9);
}

.modal-content {
margin: auto;
display: block;
width: 60%;
max-width: 300px;
}

input[type=file] {
display: none;
}

.image-choose-btn {
display: flex;
border-radius: 10px;
/* max-width: 30%; */
max-width: 150px;
background-color: #bbb;
align-items: center;
justify-content: center;
padding: 70px 15px;
}

.image-choose-btn:hover {
background-color: #ccc;
}

marquee.py-2 {
font-size: large;
border-bottom: 1px solid lightgray;
}

.marquee-img {
width: 6%;
height: auto;
}

.gs-container {
width: 100%;
box-sizing: border-box;
margin: 0px;
padding: 0px;
}

footer {
background-color: #fff;
position: fixed !important;
bottom: 0px;
border-top: 1px solid lightgray;
}

.bg-image {
background-image: url(https://res.cloudinary.com/fiewin1/image/upload/images/proxyBg.png);
background-size: cover contain;
}

.bg-grey {
background-color: #bbb;
}

#change-btn:hover {
color: white !important;
}
</style>
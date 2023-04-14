<template>
    <div>
        <!-- <b-container> -->
            <b-row>
                <b-col md="3"></b-col>
                <b-col md="6" class="pl-0 pr-0">
                    <b-card class="bg-white mh">
                        <b-row>
                            <b-col cols="6" class="text-dark">
                                <!-- <router-link :to="{name:'wallet'}">
                                    <b-icon
                                        icon="chevron-left"
                                        class="h3 text-dark"
                                        @click="back"
                                />
                            </router-link> -->
                                <span style="position:relative;bottom:10px;">
                                    Payments
                                </span>
                            </b-col>
                            <b-col cols="6"></b-col>
                        </b-row>
                        <b-container class="mt-5 ">
                            <div class="text-info">
                                Step 1 : Copy UPI Information
                            </div>
                            <label class="text-dark">Amount</label>
                            <b-input-group class="mb-3">
                                <input
                                    type="text"
                                    class="form-control cstmform"
                                    v-model="form.amount"
                                />
                                <b-input-group-append>
                                    <b-button
                                        variant="primary"
                                        >Copy</b-button
                                    >
                                </b-input-group-append>
                            </b-input-group>
                            <label class="text-dark">UPI Account</label>
                            <b-input-group class="mb-3">
                                <input
                                    type="text"
                                    class="form-control cstmform"
                                    v-model="form.upi"
                                />
                                <b-input-group-append>
                                    <b-button
                                        variant="primary"
                                        >Copy</b-button
                                    >
                                </b-input-group-append>
                            </b-input-group>
                            <div class="text-info">
                                Step 2 : Open online banking or wallet ,
                                transfer to the UPI account
                            </div>
                            <div class="text-dark">
                                <small>transfer the money to UPI account</small>
                            </div>
                            <div class="text-danger">
                                <small
                                    >the UPI account may change any time.Please
                                    do not save the UPI account</small
                                >
                            </div>
                            <div class="text-info">
                                Step 3 : Enter Ref No.
                            </div>
                            <div class="text-dark">
                                <small
                                    >check the UPI reference no. after payment
                                    from your UPI app Example in below
                                    image</small
                                >
                            </div>

                            <input
                                type="text"
                                class="form-control cstmform"
                                placeholder="REF NO."
                                v-model="form.refno"
                            />
                            <small class="text-danger"
                                >*Please enter Ref No. to complete to
                                recharge.</small
                            >
                            <div class="text-center mt-3">
                                <button  type="button" class="btn btn-primary" @click="modal"
                                    >Confirm REF No.</button
                                >
                            </div>
                        </b-container>
                    </b-card>
                </b-col>
                <b-col md="3"></b-col>
            </b-row>
        <!-- </b-container> -->

        <b-modal ref="my-modal" hide-footer title="Payment Details">
            <div class="text-center">
                <p>Amount:{{ form.amount }}</p>
                <p>UPI Account:{{ form.upi }}</p>
                <p>Ref No.:{{ form.refno }}</p>
            </div>
            <button class="btn btn-primary float-right" @click="pay" 
                    >Pay</button
            >
    </b-modal>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            error: "",
            user_id: "",
            loading: false,
            modal1: false,
            form: {
                amount: this.$route.params.amount,
                upi: "abc123@upi",
                refno: ""
            }
        };
    },
    created() {
        if(this.form.amount == undefined){
            this.$router.push("recharge");
        }
       
    },
    methods: {
        back() {
            localStorage.setItem("path", "wallet");
        },
        value() {
            this.$bvToast.toast("Link Copied", {
            variant: 'info',
            solid: true
          });
            return this.form.amount;
        },
        value1() {
            this.$bvToast.toast("Link Copied", {
            variant: 'info',
            solid: true
          });
            // this.i("link copied");
            return this.form.upi;
        },
        handleRef() {
            // axios
            //     .post("api/payment/" + this.user_id, {
            //         refno: this.form.refno
            //     })
            //     .then(res => {
            //         console.log(res);
            //     })
            //     .catch(err => {
            //         console.log(err);
            //         if (err.response.data) {
            //             this.i(err.response.data.res);
            //             this.error = err.response.data.res;
            //         }
            //     });
        },
        modal() {
            if (this.form.refno == "") {
                this.$bvToast.toast("please enter refernce no.", {
                    variant: 'info',
                    solid: true
                });
                return false;
               
            }
            if (this.form.amount == "") {
                this.$bvToast.toast("Enter Valid Amount", {
                    variant: 'info',
                    solid: true
                });
                return false;
               
            }
            this.$refs['my-modal'].show();
            
            // axios
            //     .post("../api/payment/" + this.user_id, {
            //         refno: this.form.refno,
            //         status:1
            //     })
            //     .then(res => {

            //         console.log(res);
            //         if(res.data == 200){
            //             this.modal1 = true;
            //         }
            //     })
            //     .catch(err => {
            //         console.log(err);
            //         if (err.response.data) {
            //             this.i(err.response.data.res);
            //             this.error = err.response.data.res;
            //         }
            //     });

        },
        pay() {
          
          this.$router.push({name:"slip_upload",params:{amount:this.form.amount,upi:this.form.upi,refno:this.form.refno,user_id:this.user_id}});
          return false;


        },
        
    }
};
</script>

<style scoped>
.cstmform {
    background-color: transparent !important;
    border-color: black !important;
    color: black !important;
}
.cstmform::placeholder {
    color:black !important;
}
.cstmform:focus {
    background: transparent !important;
    color: black !important;
}
.mh {
    min-height: 570px !important;
}
@media (max-width: 600px) {
    .mh {
        min-height: 672px !important;
    }
}
</style>
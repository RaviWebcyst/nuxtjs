<template>
    <div class="gs-container">
         <div class="row">
             <div class="col-lg-5 col-md-6 mx-auto" style="padding-bottom: 150px;">
                 <div class="my-5">
                    <div class="border border-info dotted p-5">
                        <h4 class="text-center pb-4">Invite</h4>
                        <div class="input-group mb-2 ">
                            <input type="text" class="form-control border-info" v-model="url">
                            <div class="input-group-append">
                                <button type="button" class=" btn btn-outline-info" >Copy</button>
                            </div>
                        </div>
                    </div>
                 </div>
             <Footer />
             </div>
         </div>
 
     </div>
 </template>

 <script>
 export default {
     name:"invite_page",
     data(){
        return{
            url:process.env.appUrl,
            link:"invite/abc"
        }
     }
 }
 
 </script>
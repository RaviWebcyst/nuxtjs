<template>
  <div class="d-flex justify-content-center">
    <div class="fw-container " >

      <div class="fw-wheel">
        <img src="https://xiaolin1995.github.io/vue-fortune-wheel/demo/img/wheel.1feeccf9.png" class="wheel" :class="{ rotating: isRotating }" :style="rotateStyle" >
      </div>
      <div class="fw-btn">
        <div class="fw-btn_image">
          <img  src="https://xiaolin1995.github.io/vue-fortune-wheel/demo/img/button.7e09e29c.png" style="width: 60px;z-index: 1111;position: relative" />
          </div>
      </div>

      
  </div>
  <!-- <button @click="handleClick">click</button> -->
  </div>
  </template>
  
  <script>
  import io from 'socket.io-client';

  export default {
    data() {
      return {
        isRotating: false,
        rotateEndDeg:180,
        duration:10000,
        angleBase:-30,
        angle1:0,
        angle:0,
        game_id:"",
        apiUrl:process.env.baseUrl,
        prizes: [
        {
          id: 1, //* The unique id of each prize, an integer greater than 0
          name: 'Blue', // Prize name, display value when type is canvas (this parameter is not needed when type is image)
          value: 'Blue\'s value', //* Prize value, return value after spinning
          bgColor: '#45ace9', // Background color (no need for this parameter when type is image)
          color: '#ffffff', // Font color (this parameter is not required when type is image)
          probability: 30, //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
          weight: 1 // Weight, if useWeight is true, the probability is calculated by weight (weight must be an integer), so probability is invalid
        },
        {
          id: 2,
          name: 'Red',
          value: 'Red\'s value',
          bgColor: '#dd3832',
          color: '#ffffff',
          probability: 40,
          weight: 1
        },
        {
          id: 3,
          name: 'Yellow',
          value: 'Yellow\'s value',
          bgColor: '#fef151',
          color: '#ffffff',
          probability: 30,
          weight: 1
        }
      ],
      }
    },

    mounted() {
      // this.isRotating = true; // start the rotation animation
      // setTimeout(() => {
      //   this.isRotating = false; // stop the rotation animation after 5 seconds
      // }, 10000);
    },
    created()
    {
      const socket = io('http://localhost:4000');
        // socket.emit('hello', { message: 'Hello, server!' });
        socket.on('spin-rotate', data => {
          this.handleClick();
        
          this.rotateEndDeg = this.rotateBase + this.getTargetDeg(data.message);
        console.log(data.message); 
        this.$emit('prev_game_id',data.prev_game_id);
        });
        socket.on('game-result', data => {
          // this.handleClick();
          // this.rotateEndDeg = this.rotateBase + this.getTargetDeg(data.message);
        console.log(data.message); 
        });

    } ,
 methods:{
  
  async getTime(){
      let res = await fetch(this.apiUrl+'/api/getTime');
      var times = await res.json();
      // this.times = times.timer;
      this.$emit('times', times.timer);
    },
  async getGameId(){
      let res = await fetch(this.apiUrl+'/api/getGameId');
      var game_id = await res.json();
      this.$emit('game_id', game_id);
    } ,
      handleClick(){
        // this.rotateEndDeg = 180;
        // this.duration=10000;
        // this.angleBase=-30;
        // this.angle1=0;
        // this.angle=0;
        // this.rotateStyle();
        // this.rotateBase();
        // this.getTargetDeg(1);
        this.isRotating = true;
        // this.rotateEndDeg = this.rotateBase + this.getTargetDeg(2);
         setTimeout(() => {
        this.isRotating = false; // stop the rotation animation after 5 seconds
        this.rotateEndDeg %= 360;
        this.getGameId();
      }, this.duration);


      },
      // rotateDuration(){
      //   this.duration= this.isRotating ? this.duration / 1000 : 0;
      // },
      
    //   rotateStyle () {
    //   return {
    //     '-webkit-transform': `rotateZ(${this.rotateEndDeg}deg)`,
    //     transform: `rotateZ(${this.rotateEndDeg}deg)`,
    //     // '-webkit-transition-duration': `${this.rotateDuration}s`,
    //     // 'transition-duration': `${this.rotateDuration}s`,
    //     // '-webkit-transition-timing-function:': this.timingFun,
    //     // 'transition-timing-function': this.timingFun
    //     '-webkit-transition-duration': `${this.duration}s`,
    //     'transition-duration': `${this.duration}s`,
    //   }
    // },
    // rotateBase () {
    //   let angle = this.angleBase * 360;
    //   if (this.angleBase < 0) angle -= 360;
    //   this.angle1= angle;
    // },
    getTargetDeg (prizeId) {
      const angle = 360 / this.prizes.length;
      const num = this.prizes.findIndex(row => row.id === prizeId);
      this.prizeRes = this.prizes[num];
      return (360 - (angle * num + angle /2))+60;

          console.log(this.prizes[num]);
    }
    },
    computed:{
      rotateStyle () {
      return {
        '-webkit-transform': `rotateZ(${this.rotateEndDeg}deg)`,
        transform: `rotateZ(${this.rotateEndDeg}deg)`,
        // '-webkit-transition-duration': `${this.rotateDuration}s`,
        // 'transition-duration': `${this.rotateDuration}s`,
        // '-webkit-transition-timing-function:': this.timingFun,
        // 'transition-timing-function': this.timingFun
        '-webkit-transition-duration': `${this.rotateDuration}s`,
        'transition-duration': `${this.rotateDuration}s`,
        
      }
    },
    rotateDuration (){
      return this.isRotating ? this.duration / 1000 : 0;
    },

    rotateBase () {
      let angle = this.angleBase * 360;
      if (this.angleBase < 0) angle -= 360;
      return angle;
    },
   
  }
  }
  </script>
  
  <style>
  .wheel  {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    /* border: 5px solid black; */
  }
  .fw-wheel{
    width: 200px;
    height: 200px;
  }
  
  /* .rotating { */
    /* animation: rotate 1s linear infinite; */
    /* -webkit-transform: rotateZ(360deg);
    transform: rotateZ(360deg); */

    /* -webkit-transition-duration: 5s;
    transition-duration: 5s; */
  /* } */
  
  /* @keyframes rotate {
    0% { transform: rotate(0); }
    100% { transform: rotate(360deg); }
  } */
  @keyframes rotate {
    to {
    transform: rotate(360deg);
  }
  /* Change the percentage value to stop the spinner at a specific degree */
  50% {
    transform: rotate(180deg);
  }
  }
  .fw-container {
    position: relative;
    display: inline-block;
    font-size: 0;
    overflow: hidden;
  }
  .fw-btn, .fw-btn__btn {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .fw-btn {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}
fw-btn__image {
    display: inline-block;
}
  </style>
  
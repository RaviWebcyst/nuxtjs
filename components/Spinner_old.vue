<template>
    <div style="display: flex;justify-content: center;">
        <FortuneWheel
      style="width: 300px"
      type="image"
      :useWeight="true"
      :prizes="prizes"
      :angleBase="-50"
      :prizeId="prizeId"
      @rotateStart="onImageRotateStart"
      @rotateEnd="onRotateEnd"
      :duration="10000"
    >
      <img slot="wheel" src="https://xiaolin1995.github.io/vue-fortune-wheel/demo/img/wheel.1feeccf9.png" style="transform: rotateZ(60deg)" />
      <img slot="button" src="https://xiaolin1995.github.io/vue-fortune-wheel/demo/img/button.7e09e29c.png" style="width: 80px;" @click="onChangePrize(2)" ref="btn" />
    </FortuneWheel>
   
    <!-- <button @click="onImageRotateStart">hello</button> -->
    <!-- type: canvas -->
    <!-- <FortuneWheel
      style="width: 500px"
      :canvas="canvasOptions"
      :prizes="prizes"
      :verify="canvasVerify"
      @rotateStart="onCanvasRotateStart"
      @rotateEnd="onRotateEnd"
    /> -->
    </div>
</template>

<script>
import FortuneWheel from 'vue-fortune-wheel'
import 'vue-fortune-wheel/lib/vue-fortune-wheel.css';
import io from 'socket.io-client';


export default {
    name:'Spinner',
    components: {
    FortuneWheel,
  },
  data() {
    return {
        prizeId: 0,
        verified:false,
      canvasVerify: true, // Whether the turntable in canvas mode is enabled for verification
      canvasOptions: {
        borderWidth: 6,
        borderColor: '#584b43',
      },
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
    //   prizesImage: [
    //     {
    //       id: 1,
    //       value: 'Blue\'s value', // 奖品值
    //       weight: 1 // 权重
    //     },
    //     {
    //       id: 2,
    //       value: 'Red\'s value',
    //       weight: 0
    //     },
    //     {
    //       id: 3,
    //       value: 'Yellow\'s value',
    //       weight: 0
    //     }
    //   ]
    }
  },
    created(){
    
      // this.$emit('rotateStart');
        const socket = io('http://localhost:4000');
        // socket.emit('hello', { message: 'Hello, server!' });
        socket.on('cron-job', data => {
        console.log(data.message); 
        });
    // this.getData();
  },

  methods: {
    handleClick(){
      console.log("working");
      this.$emit('rotateStart');
    },
    DoServiceVerify(verified, duration) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(verified)
        }, duration)
      })
    },
    // async getData(){
    //     let data = await fetch('posts').then(res=>res.json());
    //     console.log(data);
    // },
    onChangePrize (id) {
      this.prizeId = id;
    },
    onImageRotateStart() {
      
      console.log('onRotateStart');
    },
   
    onCanvasRotateStart(rotate) {
      if (this.canvasVerify) {
        const verified = true // true: the test passed the verification, false: the test failed the verification
        this.DoServiceVerify(verified, 2000).then((verifiedRes) => {
          if (verifiedRes) {
            console.log('Verification passed, start to rotate')
            rotate() // Call the callback, start spinning
            this.canvasVerify = false // Turn off verification mode
          } else {
            alert('Failed verification')
          }
        })
        return
      }
      console.log('onCanvasRotateStart')
    },
    onRotateEnd(prize) {
      alert(prize.value)
    },
     
    
    
},
mounted() {
    
},

}
</script>
<template>
     <div
      class="fw-wheel"
      :style="rotateStyle"
      @transitionend="onRotateEnd"
      @webkitTransitionend="onRotateEnd"
    >
    <img slot="wheel" src="https://xiaolin1995.github.io/vue-fortune-wheel/demo/img/wheel.1feeccf9.png" style="transform: rotateZ(60deg)" />
      <img slot="button" src="https://xiaolin1995.github.io/vue-fortune-wheel/demo/img/button.7e09e29c.png" style="width: 80px;"   @click="handleClick" />
    </div>
  </template>
  <script>
  import random from 'lodash/random';
  import sumBy from 'lodash/sumBy';
  export default {
    data(){
        return{
            isRotating: false, // 是否正在旋转
            rotateEndDeg: 0, // 转盘旋转的角度
            prizeRes: {}, // 转盘的旋转结果,
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
    created(){
        
    },
    methods: {
        handleClick (){
          
      if (!this.canRotate) return;
      if (this.verify) {
        this.$emit('rotateStart', this.onRotateStart)
        return
      }
      this.$emit('rotateStart')
      this.onRotateStart()
    },
    // 开始旋转
    onRotateStart (){
      this.isRotating = true
      const prizeId = this.prizeId || this.getRandomPrize()
      this.rotateEndDeg = this.rotateBase + this.getTargetDeg(prizeId)
    },
    // 结束旋转
    onRotateEnd (){
      this.isRotating = false
      this.rotateEndDeg %= 360
      this.$emit('rotateEnd', this.prizeRes)
    },
      
    // rotateDuration (){
    //   return this.isRotating ? this.duration / 1000 : 0
    // },
    
    onRotateEnd (){
      this.isRotating = false;
      this.rotateEndDeg %= 360
      this.$emit('rotateEnd', this.prizeRes)
    },
    getRandomPrize () {
      const len = this.prizesIdArr.length
      const prizeId = this.prizesIdArr[random(0, len - 1)]
      return prizeId
    },
    getTargetDeg (prizeId) {
      const angle = 360 / this.prizes.length
      const num = this.prizes.findIndex(row => row.id === prizeId)
      this.prizeRes = this.prizes[num]
      return 360 - (angle * num + angle / 2)
    
  }
    
    },
    computed: {
    // canvas 的参数
    canvasConfig () {
      return Object.assign(canvasDefaultConfig, this.canvas)
    },
    // 所有奖品的概率和
    probabilityTotal () {
      if (this.useWeight) return 100
      return sumBy(this.prizes, (row) => row.probability || 0)
    },
    // 为了概率生成的奖品id的数组
    prizesIdArr () {
      const idArr= [];
      this.prizes.forEach((row) => {
        const count = this.useWeight ? (row.weight || 0) : ((row.probability || 0) * this.decimalSpaces)
        const arr = (new Array(count)).fill(row.id)
        idArr.push(...arr)
      })
      return idArr
    },
    // 奖品的概率保留几位小数, 最多保留 4 位 => ( 0: 1, 1: 10, 2: 100, 3: 1000, 4: 10000 )
    decimalSpaces () {
      if (this.useWeight) return 0
      const sortArr = [...this.prizes].sort((a, b) => {
        const aRes = String(a.probability).split('.')[1]
        const bRes = String(b.probability).split('.')[1]
        const aLen = aRes ? aRes.length : 0
        const bLen = bRes ? bRes.length : 0
        return bLen - aLen
      })
      const maxRes = String(sortArr[0].probability).split('.')[1]
      const idx = maxRes ? maxRes.length : 0
      return [1, 10, 100, 1000, 10000][idx > 4 ? 4 : idx]
    },
    rotateStyle () {
      return {
        '-webkit-transform': `rotateZ(${this.rotateEndDeg}deg)`,
        transform: `rotateZ(${this.rotateEndDeg}deg)`,
        '-webkit-transition-duration': `${this.rotateDuration}s`,
        'transition-duration': `${this.rotateDuration}s`,
        '-webkit-transition-timing-function:': 'cubic-bezier(0.36, 0.95, 0.64, 1)',
        'transition-timing-function': 'cubic-bezier(0.36, 0.95, 0.64, 1)'
      }
    },
    // 旋转一次的时长
    // rotateDuration () {
    //   return this.isRotating ? this.duration / 1000 : 0
    // },
    rotateBase () {
      let angle = this.angleBase * 360
      if (this.angleBase < 0) angle -= 360
      return angle
    },
    canRotate () {
      return !this.disabled && !this.isRotating && this.probabilityTotal === 100
    }
  },
    watch: {
    prizeId (newVal) {
      if (!this.isRotating) return
      let newAngle = this.getTargetDeg(newVal)
      if (this.angleBase < 0) newAngle -= 360
      const prevEndDeg = this.rotateEndDeg
      let nowEndDeg = this.angleBase * 360 + newAngle
      const angle = 360 * (Math.floor((nowEndDeg - prevEndDeg) / 360))
      if (this.angleBase >= 0) {
        nowEndDeg += Math.abs(angle)
      } else {
        nowEndDeg += -360 - angle
      }
      this.rotateEndDeg = nowEndDeg
    }
  },
  };
  </script>
  
  <style>
  .wheel-container {
  position: relative;
  width: 300px;
  height: 300px;
}

.wheel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://xiaolin1995.github.io/vue-fortune-wheel/demo/img/wheel.1feeccf9.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform-origin: center;
  transition: transform 50s ease-out;
}

.wheel.rotate {
  transform: rotate(720deg);
}

</style>
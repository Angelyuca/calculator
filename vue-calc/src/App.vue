<template>
  <div id="app">
    <calculator-component />
  </div>
</template>

<script>
import CalculatorComponent from './components/calculator.vue'

export default {
  name: 'App',
  components: {
    CalculatorComponent
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Poppins:300,500&display=swap");

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}
body {
  background-color: #3fa9fc;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>

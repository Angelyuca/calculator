<template>
  <div class="container">
    <div class="calculator">
      <div class="answer">{{ answer }}</div>
      <div class="display">{{ expression }}</div>
      <div @click="clear" id="clear" class="btn operator">C</div>
      <div @click="back" id="back" class="btn operator">&larr;</div>
      <div @click="forth" id="forth" class="btn operator">&rarr;</div>
      <div @click="addOperator('divide', '/')" id="divide" class="btn operator">/</div>
      <div @click="append('7')" id="n7" class="btn">7</div>
      <div @click="append('8')" id="n8" class="btn">8</div>
      <div @click="append('9')" id="n9" class="btn">9</div>
      <div @click="addOperator('times', '*')" id="times" class="btn operator">*</div>
      <div @click="append('4')" id="n4" class="btn">4</div>
      <div @click="append('5')" id="n5" class="btn">5</div>
      <div @click="append('6')" id="n6" class="btn">6</div>
      <div @click="addOperator('minus', '-')" id="minus" class="btn operator">-</div>
      <div @click="append('1')" id="n1" class="btn">1</div>
      <div @click="append('2')" id="n2" class="btn">2</div>
      <div @click="append('3')" id="n3" class="btn">3</div>
      <div @click="addOperator('plus', '+')" id="plus" class="btn operator">+</div>
      <div @click="append('0')" id="n0" class="zero">0</div>
      <div @click="dot" id="dot" class="btn">.</div>
      <div @click="equal" id="equal" class="btn operator">=</div>
    </div>
  </div>
</template>

<script>
import {calculation} from "@/api/api";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'calculator',
  data() {
    return {
      logList: [],
      current: [],
      answer: "",
      operatorClicked: true,
      history: [],
      forthHistory: []
    };
  },
  computed: {
    expression() {
      return this.fullLog.join(" ")
    },
    fullLog() {
      return [...this.logList, ...this.current]
    }
  },
  methods: {
    back() {
      this.animateOperator("back");
      this.operatorClicked = false
      if (this.history.length > 1) {
        this.current = []
        this.answer = this.history[this.history.length - 2].result
        this.logList = this.history[this.history.length - 2].log
        this.forthHistory.push(this.history[this.history.length - 1])
        this.history.pop()
      }
      // if (this.current.length) {
      //   this.current.pop()
      // } else this.logList.pop()
    },
    forth() {
      this.animateOperator("forth");
      if (this.forthHistory.length) {
        this.current = []
        const history = this.forthHistory[this.forthHistory.length - 1]
        this.answer = history.result
        this.logList = history.log
        this.history.push(history)
        this.forthHistory.pop()
      }


      // if (this.fullLog.length < this.history.length) {
      //   this.operatorClicked = false
      //   let length = this.fullLog.length
      //   this.logList.push(this.history[length])
      // }
    },
    append(number) {
      if (this.operatorClicked) {
        this.current = [];
        this.operatorClicked = false;
      }
      this.animateNumber(`n${number}`);
      this.current = [(`${this.current}${number}`)];
      // this.history = this.fullLog
    },
    addtoLog(operator) {
      if (this.operatorClicked == false) {
        this.logList.push(...this.current);
        this.logList.push(operator);
        this.current = [];
        this.operatorClicked = true;
        // this.history = [...this.logList]
      }
    },
    clear() {
      this.animateOperator("clear");
      this.current = [];
      this.history = []
      this.answer = "";
      this.logList = [];
      this.operatorClicked = false;
    },

    dot() {
      this.animateNumber("dot");
      if (this.current.length && this.current[0].indexOf(".") === -1) {
        this.append(".");
      }
    },
    addOperator(operator, symbol) {
      this.animateOperator(operator);
      this.addtoLog(symbol);
    },
    equal() {
      this.animateOperator("equal");
      if (this.fullLog.length) {
        if (this.operatorClicked == false) {
          calculation(this.fullLog).then((resp) => {
            if (resp.message) {
              console.warn(resp.message)
              this.answer = "Error!"
            } else {
              this.forthHistory = []
              this.history.push({result: resp.data.result, log: this.fullLog})
              this.answer = resp.data.result
            }
          })
        } else {
          this.answer = "Not correct!";
        }
      }
    },
    animateNumber(number) {
      let tl = this.$anime.timeline({
        targets: `#${number}`,
        duration: 250,
        easing: "easeInOutCubic"
      });
      tl.add({backgroundColor: "#c1e3ff"});
      tl.add({backgroundColor: "#f4faff"});
    },
    animateOperator(operator) {
      let tl = this.$anime.timeline({
        targets: `#${operator}`,
        duration: 250,
        easing: "easeInOutCubic"
      });
      tl.add({backgroundColor: "#a6daff"});
      tl.add({backgroundColor: "#d9efff"});
    },
  }
}
</script>

<style scoped>
::selection {
  background: none;
}

.calculator {
  display: grid;
  grid-template-rows: repeat(7, minmax(60px, auto));
  grid-template-columns: repeat(4, 60px);
  grid-gap: 12px;
  padding: 35px;
  font-family: "Poppins";
  font-weight: 300;
  font-size: 18px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 3px 80px -30px rgba(13, 81, 134, 1);
}

.btn,
.zero {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #484848;
  background-color: #f4faff;
  border-radius: 5px;
}

.display,
.answer {
  grid-column: 1 / 5;
  display: flex;
  align-items: center;
}

.display {
  color: #a3a3a3;
  border-bottom: 1px solid #e1e1e1;
  margin-bottom: 15px;
  overflow: hidden;
  text-overflow: clip;
}

.answer {
  font-weight: 500;
  color: #146080;
  font-size: 36px;
  height: 40px;
}

.zero {
  grid-column: 1 / 3;
}

.operator {
  background-color: #d9efff;
  color: #3fa9fc;
}
</style>

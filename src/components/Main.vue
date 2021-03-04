<template>
  <div class="q-pa">
    <section class="full-width row justify-center items-center content-center">
      <div class="col-md-4 col-sm-12 full-width">
        <div class="container">
        <div class="calc-body">
          <div class="calc-screen">
            <div class="calc-operation">{{history}}</div>
            <div class="calc-typed" id="display">{{display}}</div>
          </div>
          <div class="calc-button-row">
            <div class="button c" @click="clear">C</div>
            <div class="button l" @click="addOperator('^')">^</div>
            <div class="button l"  @click="addOperator('%')">%</div>
            <div class="button l" @click="addOperator('/')">/</div>
          </div>
          <div class="calc-button-row">
            <div class="button" @click="addNumTo(7)">7</div>
            <div class="button" @click="addNumTo(8)">8</div>
            <div class="button" @click="addNumTo(9)">9</div>
            <div class="button l" @click="addOperator('*')">*</div>
          </div>
          <div class="calc-button-row">
            <div class="button" @click="addNumTo(4)">4</div>
            <div class="button" @click="addNumTo(5)">5</div>
            <div class="button" @click="addNumTo(6)">6</div>
            <div class="button l" @click="addOperator('-')">−</div>
          </div>
          <div class="calc-button-row">
            <div class="button" @click="addNumTo(1)">1</div>
            <div class="button" @click="addNumTo(2)">2</div>
            <div class="button" @click="addNumTo(3)">3</div>
            <div class="button l" @click="addOperator('+')">+</div>
          </div>
          <div class="calc-button-row">
            <div class="buttonB l" @click="addNumTo(0)">0</div>
            <div class="button" @click="addNumTo('.')">.</div>
            <div class="button l" @click="operation">=</div>
          </div>
        </div>
      </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  data () {
    return {
      display: 0,
      history: '',
      valueA: '',
      valueB: '',
      operator: ''
    }
  },
  methods: {
    addNumTo (number) {
      if (this.operator) {
        this.valueB += number
        this.setDisplay(this.valueB)
        this.history += number
      } else {
        this.valueA += number
        this.setDisplay(this.valueA)
        this.history = `${this.valueA} `
      }
    },
    addOperator (operator) {
      this.operation()
      if (this.valueA) {
        this.operator = operator
        this.setDisplay(this.operator)
        this.history += `${this.operator} `
      }
    },
    operation () {
      if (this.valueA && this.valueB && this.operator) {
        /* eslint no-eval: 0 */
        let calcs = ''
        if (this.operator === '^') {
          calcs = Math.pow(this.valueA, this.valueB)
        } else {
          calcs = eval(this.valueA + this.operator + this.valueB)
        }

        this.valueA = calcs
        this.operator = this.valueB = ''
        this.setDisplay(calcs)
        this.history += ` ${this.valueB}`
      }
    },
    setDisplay (someValue) {
      const stringSize = String(someValue).length
      if (stringSize < 14) {
        this.display = someValue
      } else {
        this.display = 'Error'
        this.clear(false)
      }
    },
    clear (resetDisplay = true) {
      if (resetDisplay) {
        this.display = 0
      }
      this.history = ''
      this.valueA = ''
      this.valueB = ''
      this.operator = ''
    }
  }
}
</script>

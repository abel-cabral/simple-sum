<template>
  <div class="q-pa">
    <section class="full-width row justify-center items-center content-center">
      <div class="col-md-4 col-sm-12 full-width">
        <div class="container">
        <div class="calc-body">
          <div class="calc-screen">
            <div class="calc-operation">{{history}}</div>
            <div class="calc-typed" id="display" :style="{ 'font-size': fontSize + 'px' }">{{display}}</div>
          </div>
          <div class="calc-button-row">
            <div class="button c" @click="clear">C</div>
            <div class="button l" @click="addOperator('()')">^</div>
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
            <div class="button buttonB" @click="addNumTo(0)">0</div>
            <div class="button" @click="addNumTo('.')">.</div>
            <div class="button l final" @click="operation">=</div>
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
      fontSize: 40,
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
      if (!this.valueA || !this.valueB || !this.operator) {
        return // Previne a execução se algum valor for inválido
      }
      try {
        const result = this.calculador(this.valueA, this.operator, this.valueB)
        this.updateCalculationState(result)
      } catch (error) {
        this.displayError(error)
      }
    },
    updateCalculationState (result) {
      this.operator = this.valueB = ''
      this.valueA = result.toString()
      this.history += ` ${this.valueB}`
      this.setDisplay(result)
    },
    displayError (error) {
      // Aqui você pode implementar uma lógica para exibir erros na UI
      console.error(error)
      this.setDisplay('Erro: ' + error.message)
    },
    setDisplay (someValue) {
      this.fontSizeFunc(someValue)
      this.display = someValue
    },
    // calcula dinamicamente o tamanho da fonte, para exibir o máximo de numero no display
    fontSizeFunc (newValue) {
      const baseCharacters = 17
      const baseFontSize = 48

      if (String(newValue).length < baseCharacters) {
        return
      }

      this.fontSize = (baseFontSize * baseCharacters) / String(newValue).length
    },
    clear (resetDisplay = true) {
      if (resetDisplay) {
        this.display = 0
      }
      this.history = ''
      this.valueA = ''
      this.valueB = ''
      this.operator = ''
    },
    calculador (valueA, operator, valueB) {
      const numA = parseFloat(valueA)
      const numB = parseFloat(valueB)

      switch (operator) {
        case '+':
          return numA + numB
        case '-':
          return numA - numB
        case '*':
          return numA * numB
        case '%':
          return (numA / 100) * numB
        case '^':
          return Math.pow(this.valueA, this.valueB)
        case '/':
          if (numB === 0) {
            return 'erro, divisão por 0'
          }
          return numA / numB
        default:
          return 'Operador inválido'
      }
    }
  }
}
</script>

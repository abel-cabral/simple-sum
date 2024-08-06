<template>
  <div class="q-pa">
    <section class="full-width row justify-center items-center content-center">
      <div class="col-md-4 col-sm-12 full-width">
        <div class="container">
        <div class="calc-body">
          <div class="calc-screen">
            <div class="calc-operation">{{history}}</div>
            <div class="painel">
              <div class="calc-typed" id="display">{{display}}</div>
              <div class="button" @click="clear()">⌫</div>
            </div>
          </div>
          <div class="calc-button-row">
            <div class="button c" @click="clearAll()">C</div>
            <div class="button l" @click="addVal('(')">(</div>
            <div class="button l" @click="addVal(')')">)</div>
            <div class="button l" @click="addVal('/')">/</div>
          </div>
          <div class="calc-button-row">
            <div class="button" @click="addVal(7)">7</div>
            <div class="button" @click="addVal(8)">8</div>
            <div class="button" @click="addVal(9)">9</div>
            <div class="button l" @click="addVal('*')">*</div>
          </div>
          <div class="calc-button-row">
            <div class="button" @click="addVal(4)">4</div>
            <div class="button" @click="addVal(5)">5</div>
            <div class="button" @click="addVal(6)">6</div>
            <div class="button l" @click="addVal('-')">−</div>
          </div>
          <div class="calc-button-row">
            <div class="button" @click="addVal(1)">1</div>
            <div class="button" @click="addVal(2)">2</div>
            <div class="button" @click="addVal(3)">3</div>
            <div class="button l" @click="addVal('+')">+</div>
          </div>
          <div class="calc-button-row">
            <div class="button buttonB" @click="addVal(0)">0</div>
            <div class="button" @click="addVal('.')">.</div>
            <div class="button l final" @click="operation">=</div>
          </div>
        </div>
      </div>
      </div>
    </section>
  </div>
</template>

<script>
import { evaluate } from 'mathjs'

export default {
  data () {
    return {
      fontSize: 40,
      display: 0,
      history: '',
      value: ''
    }
  },
  methods: {
    addVal (expression) {
      this.value += expression
      this.setDisplay(this.value)
      this.history += expression
    },
    operation () {
      // Verifica se o valor está presente antes de prosseguir
      if (!this.value) {
        return // Previne a execução se algum valor for inválido
      }

      try {
      // Avalia a expressão matemática
        let result = evaluate(this.value)

        // Checa se o resultado é um número fracionário com mais de 2 casas decimais
        if (result % 1 !== 0) {
          result = parseFloat(result.toFixed(2))
        }

        // Atualiza o estado da calculadora com o resultado
        this.updateCalculationState(result)
      } catch (error) {
      // Exibe uma mensagem de erro caso ocorra uma exceção
        this.displayError('Error')
      }
    },
    updateCalculationState (result) {
      this.value = result
      this.setDisplay(result)
    },
    displayError (error) {
      // Aqui você pode implementar uma lógica para exibir erros na UI
      console.error(error)
      this.setDisplay('Error')
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
    // Limpando e resetando valores
    startPress () {
      this.isLongPress = false
      this.pressTimer = setTimeout(() => {
        this.isLongPress = true
        this.longPressAction()
      }, 500)
    },
    handleMouseUp () {
      if (!this.isLongPress) {
        this.clear()
      }
      this.cancelPress()
    },
    cancelPress () {
      clearTimeout(this.pressTimer)
      this.pressTimer = null
    },
    longPressAction () {
      // Ação a ser executada se o botão for pressionado e segurado por 3 segundos
      this.clearAll()
    },
    clear () {
      // Limpar o último caractere
      if (!this.value) {
        return
      }

      if (typeof this.value === 'number') {
        this.value = this.value.toString()
      }

      this.value = this.value.slice(0, -1)

      if (!this.value || this.value < 0) {
        this.clearAll()
      } else {
        this.history = this.history.slice(0, -1)
      }

      this.setDisplay(this.value)
    },
    clearAll () {
      this.history = ''
      this.value = ''
      this.display = 0
    }
  }
}
</script>

import { mount, shallowMount } from '@vue/test-utils'
import Main from '@/components/Main'

describe('Data Display Interaction', () => {
  it('Test Display', async () => {
    const wrapper = mount(Main)
    await wrapper.setData({ display: 100 })
    const display = wrapper.find('#display').element.innerHTML
    expect(parseInt(display)).toBe(wrapper.vm.display)
    wrapper.destroy()
  })

  it('Test number keys', async () => {
    const wrapper = mount(Main)
    let keys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const buttons = wrapper.findAll('.button')
    for (let i = 0; i < buttons.length; i++) {
      keys = keys.slice(parseInt(buttons.at(i).element.innerHTML), 1)
    }
    expect(keys.length).toBe(0)
    wrapper.destroy()
  })

  it('Test operations keys', async () => {
    const wrapper = mount(Main)
    let keys = ['+', '-', '*', '/', '^']
    const buttons = wrapper.findAll('.button')
    for (let i = 0; i < buttons.length; i++) {
      keys = keys.slice(parseInt(buttons.at(i).element.innerHTML), 1)
    }
    expect(keys.length).toBe(0)
    wrapper.destroy()
  })

  it('Test Special Keys', async () => {
    const wrapper = mount(Main)
    let keys = ['.', 'C', '=']
    const buttons = wrapper.findAll('.button')
    for (let i = 0; i < buttons.length; i++) {
      keys = keys.slice(parseInt(buttons.at(i).element.innerHTML), 1)
    }
    expect(keys.length).toBe(0)
    wrapper.destroy()
  })
})

describe('Basic Operations', () => {
  it('Sum', () => {
    const wrapper = shallowMount(Main)
    wrapper.vm.addNumTo(25)
    wrapper.vm.addOperator('+')
    wrapper.vm.addNumTo(75)
    const aux = wrapper.vm.operation()
    expect(aux).toEqual(100)
  })

  it('Subtraction', () => {
    const wrapper = shallowMount(Main)
    wrapper.vm.addNumTo(25)
    wrapper.vm.addOperator('-')
    wrapper.vm.addNumTo(75)
    const aux = wrapper.vm.operation()
    expect(aux).toEqual(-50)
  })

  it('Multiplication', () => {
    const wrapper = shallowMount(Main)
    wrapper.vm.addNumTo(25)
    wrapper.vm.addOperator('*')
    wrapper.vm.addNumTo(75)
    const aux = wrapper.vm.operation()
    expect(aux).toEqual(1875)
  })

  it('Division', () => {
    const wrapper = shallowMount(Main)
    wrapper.vm.addNumTo(25)
    wrapper.vm.addOperator('/')
    wrapper.vm.addNumTo(75)
    const aux = wrapper.vm.operation()
    expect(aux).toBeGreaterThanOrEqual(0.3333333333333333)
  })

  it('Potentiation', () => {
    const wrapper = shallowMount(Main)
    wrapper.vm.addNumTo(25)
    wrapper.vm.addOperator('/')
    wrapper.vm.addNumTo(75)
    const aux = wrapper.vm.operation()
    expect(aux.toString().length).toBeGreaterThanOrEqual(14)
  })
})

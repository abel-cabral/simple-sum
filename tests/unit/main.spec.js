import { mount } from '@vue/test-utils'
import Main from '@/components/Main'

describe('Main.vue', () => {
  it('Set display value ', () => {
    const wrapper = mount(Main)
    wrapper.element.setData({ display: 100 })
    const value = wrapper.find('#display').element.value
    expect(value).toBe(wrapper.vm.display)
    wrapper.destroy()
  })
})

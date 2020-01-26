import { mount } from '@vue/test-utils'
import Component from '@/components/Dashboard/RowsPerPage.vue'

describe('RowsPerPage', () => {
  test('является экземпляром Vue', () => {
    const wrapper = mount(Component, {
      propsData: {
        value: 1
      }
    })

    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('содержит входной параметр value', () => {
    const wrapper = mount(Component, {
      propsData: {
        value: 1
      }
    })

    expect(wrapper.vm.value).toEqual(1)

    wrapper.setProps({
      value: 2
    })
    expect(wrapper.vm.value).toEqual(2)
  })

  test('содержит входной параметр list', () => {
    const wrapper = mount(Component, {
      propsData: {
        value: 1
      }
    })

    expect(wrapper.vm.list).toEqual([2, 5, 10, 100])

    wrapper.setProps({
      list: [4, 18]
    })
    expect(wrapper.vm.list).toEqual([4, 18])
  })

  test('изменение выбранного количества генерирует событие input', () => {
    const wrapper = mount(Component, {
      propsData: {
        value: 1
      }
    })

    const select = wrapper.find('select.form-control')
    select.element.value = '10'
    select.trigger('input')
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0]).toEqual(['10'])
  })

  test('вызов changed генерирует событие input', () => {
    const wrapper = mount(Component, {
      propsData: {
        value: 1
      }
    })

    wrapper.vm.changed(3)
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0]).toEqual([3])
  })

  test('содержит список выбора', () => {
    const wrapper = mount(Component, {
      propsData: {
        value: 1
      }
    })

    expect(wrapper.exists('select.form-control')).toEqual(true)
  })

  test('правильно генерирует количество элементов у списка выбора', () => {
    const wrapper = mount(Component, {
      propsData: {
        value: 1
      }
    })

    expect(wrapper.find('select.form-control').findAll('option').length).toEqual(4)
  })
})

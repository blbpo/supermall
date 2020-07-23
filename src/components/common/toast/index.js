import Toast from './Toast'


const obj = {}

obj.install = function (Vue) {
  // document.body.appendChild(Toast.$el)

  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 2.通过new的方式 根据构造器 创建对象

  const toast = new toastContrustor()

  // 3.将对象 手动挂载到某一元素
  toast.$mount(document.createElement('div'))

  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
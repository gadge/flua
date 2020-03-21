function wrapper(target) {
  target.id = 'Jason'
  return target
}

const wrapperFun = wrapper(function decortor() {})
const wrapperDecorator = wrapperFun
console.log(wrapperDecorator.id) // Jason

decorator @call (callback) {
@wrap(klass => {
  function subclass (...args) {
    if (new.target === undefined) {
      return callback.call(klass, ...args)
    }
    else {
      return Reflect.construct(klass, args, new.target)
    }
  }
  subclass.__proto__ = klass
  subclass.prototype.__proto__ = klass
  return subclass
})
}

export decorator @callable {
@call(function (...args) { return this.call(...args) })
}

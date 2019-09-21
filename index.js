(function () {
  const methodsOfArray = [
    "concat",
    "copyWithin",
    "entries",
    "every",
    "fill",
    "filter",
    "find",
    "findIndex",
    "flat",
    "flatMap",
    "forEach",
    "includes",
    "indexOf",
    "join",
    "keys",
    "lastIndexOf",
    "map",
    "pop",
    "push",
    "reduce",
    "reduceRight",
    "reverse",
    "shift",
    "slice",
    "some",
    "sort",
    "splice",
    "toLocaleString",
    "toString",
    "unshift",
    "values",
  ]

  function proxyArrayFunc (arrayFuncName) {
    return function (func) {
      // valueOf is used to get primitive value of boolean.
      // Date.prototype.valueOf() return a timestamp. It's not what we want.
      const copy = isDate(this) ? this : this.valueOf()
      const result = [copy][arrayFuncName](func)
      if (!result) return undefined
      if (result.length > 1) return result
      return result[0]
    }
  }

  function isDate (value) {
    return value instanceof Date
  }

  const newProperties = methodsOfArray.reduce((obj, methodName) => {
    obj[methodName] = { value: proxyArrayFunc(methodName) }
    return obj
  }, {})

  /* eslint no-extend-native: off */
  Object.defineProperties(Object.prototype, newProperties)
})()

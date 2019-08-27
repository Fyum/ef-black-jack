const combineArraysValues =
  (list, n = 0, result = [], current = []) => {
    if (n === list.length) {
      result.push(current);
    }
    else {
      list[n]
        .forEach(item =>
          combineArraysValues(list, n + 1, result, [...current, item]))
    }
    return result
  }

export default combineArraysValues;
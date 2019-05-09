/* eslint-disable */
import clone from 'lodash/clone'
import toPath from 'lodash/toPath'

export const isInteger = obj => String(Math.floor(Number(obj))) === obj

function getIn(obj, key, def, p = 0) {
  const path = toPath(key)
  while (obj && p < path.length) {
    obj = obj[path[p++]]
  }
  return obj === undefined ? def : obj
}

function setIn(obj, path, value) {
  let res = clone(obj) // this keeps inheritance when obj is a class
  let resVal = res
  let i = 0
  let pathArray = toPath(path)

  for (; i < pathArray.length - 1; i++) {
    const currentPath = pathArray[i]
    let currentObj = getIn(obj, pathArray.slice(0, i + 1))

    if (currentObj) {
      resVal = resVal[currentPath] = clone(currentObj)
    } else {
      const nextPath = pathArray[i + 1]
      resVal = resVal[currentPath] =
        isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {}
    }
  }

  // Return original object if new value is the same as current
  if ((i === 0 ? obj : resVal)[pathArray[i]] === value) {
    return obj
  }

  if (value === undefined) {
    delete resVal[pathArray[i]]
  } else {
    resVal[pathArray[i]] = value
  }

  // If the path array has a single element, the loop did not run.
  // Deleting on `resVal` had no effect in this scenario, so we delete on the result instead.
  if (i === 0 && value === undefined) {
    delete res[pathArray[i]]
  }

  return res
}

export function yupToFormErrors(yupError) {
  let errors = {}

  if (yupError.inner.length === 0) {
    return setIn(errors, yupError.path, yupError.message)
  }
  for (let err of yupError.inner) {
    if (!errors[err.path]) {
      errors = setIn(errors, err.path, err.message)
    }
  }

  return errors
}

export function validateYupSchema(
  values,
  schema,
  sync = false,
  context: any = {}
) {
  const validateData = {}
  for (let k in values) {
    if (values.hasOwnProperty(k)) {
      const key = String(k)
      validateData[key] = values[key] !== '' ? values[key] : undefined
    }
  }
  return schema[sync ? 'validateSync' : 'validate'](validateData, {
    abortEarly: false,
    context,
  })
}

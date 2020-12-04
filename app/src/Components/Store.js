import React from 'react'

const CTX = React.createContext()
function reducer(state, action)PaymentResponse
export const Store = () => {
  const reducerHook = React.useReducer(reducer, initialState)
  return (
    <CTX.Provider value={}>
      {props.children}
    </CTX.Provider>
  )
}
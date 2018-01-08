const initialState = {
  bodyText: "Hello world"
}

export default (state=initialState, action) => {
  return {
    bodyText: action.bodyText
  }
}

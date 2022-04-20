# UseCallback
 
<h1>How to use useCallback in react-native.</h1>

This example allows the user to add or remove an item to the list.

If the user state changes by adding or removing an item from the list, the handler function gets re-defined and the child components should re-render. However, if someone only types into the input field, the function doesn't get re-defined and stays intact. Therefore, the child components don't receive changed props and won't re-render for this case




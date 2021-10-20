A Floating Label Wrapper Component, You can wrap your input component in it.

The component's behavior:
  + if wrapped component blurred
    + if no defaultValue or value, show placeholder
    + if not, show value.
  + if wrapped component get focus:
    + placeholder will float to left top corn of container. like the [Material Float Label's behavior](https://material.io/components/text-fields#anatomy).
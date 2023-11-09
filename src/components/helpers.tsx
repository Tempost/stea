export function optionsFromObject<T extends object>(input: T) {
  return Object.keys(input).map(value => {
    return (
      <option
        key={value}
        value={value}
      >
        {value}
      </option>
    );
  });
}

export const randomColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
};

export const stringToColor = (input: string): string => {
  let hash = 0;

  // Generate a hash from the string
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert the hash to a hexadecimal color
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff; // Extract 8 bits of the hash
    color += ("00" + value.toString(16)).slice(-2); // Convert to hex
  }

  return color;
};

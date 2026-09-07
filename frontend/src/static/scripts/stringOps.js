
export const getTabTitle = (n, title) => {
  const x = n + 1; 
  let numString = ""; 
  if (x < 10) {
    numString += "0";
  }
  numString += x; 
  return `${numString} · ${title}`;
}



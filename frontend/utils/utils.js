export function numberWithSpaces(x) {
  if (!x) return x;
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export function isNegative(nbr) {
  return nbr < 0;
}

export function removeNeg(nbr) {
  let res = String(nbr);

  if (res.charAt(0) === "-") {
    return nbr.substring(1);
  }
  return res;
}

export function truncateEthAddress(address) {
  if (!address || typeof address !== "string") {
    return "";
  }
  const prefix = address.slice(0, 4);
  const suffix = address.slice(-4);
  return `${prefix}...${suffix}`;
}

export function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

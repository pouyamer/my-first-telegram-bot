const getHhmmssFormat = time => {
  // 0 => 00:00:00
  // 60 => 00:01:00
  // 3600 => 01:00:00
  const hh = Math.floor(time / 3600)
  const mm = Math.floor((time % 3600) / 60)
  const ss = Math.floor((time % 3600) % 60)
  return ""
    .concat(hh < 10 ? "0" : "")
    .concat(hh, ":")
    .concat(mm < 10 ? "0" : "")
    .concat(mm, ":")
    .concat(ss < 10 ? "0" : "")
    .concat(ss)
}
const getOperatingSystemName = function (platform) {
  switch (platform) {
    case "win32":
      return "Windows"
    case "darwin":
      return "MacOS"
    case "linux":
      return "Linux"
    default:
      return platform
  }
}

const toTwoDigitFormat = number => (number < 10 ? `0${number}` : number)

// export wirh common js
module.exports = {
  getOperatingSystemName,
  getHhmmssFormat,
  toTwoDigitFormat
}

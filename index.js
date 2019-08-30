/**
 * load file from remote
 * @param {string} url - audio file url
 * @param {string=''} responseType
 * @returns
 */
function loadFile(url, responseType = '') {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        resolve(xhr)
      }
    }
    xhr.onerror = reject
    xhr.open('GET', url, true)
    xhr.responseType = responseType
    xhr.send('')
  })
}

/**
 * convert buffer to hex
 * @param {ArrayBuffer} buffer
 * @returns
 */
function buf2hex(buffer) {
  // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('')
}

// audio file signature map
const hexMap = {
  '494433': 'mp3',
  '664c614300000022': 'flac',
  '2321414d52': 'amr',
  'fff1': 'aac',
  'fff9': 'aac',
  '4f67675300020000000000000000': 'oga',
  '52494646xxxxxxxx57415645666d7420': 'wav',
  '3026b2758e66cf11a6d900aa0062ce6c': 'wma'
}

const isAAC = hex => !!hexMap[hex.slice(0, 4)]
const isMP3 = hex => !!hexMap[hex.slice(0, 6)]
const isAMR = hex => !!hexMap[hex.slice(0, 10)]
const isFLAC = hex => !!hexMap[hex.slice(0, 16)]
const isWAV = hex => !!hexMap[hex.slice(0, 32)]
const isWMA = hex => !!hexMap[hex.slice(0, 32)]
const isOGA = hex => !!hexMap[hex.slice(0, 28)]

/**
 * get audio file type from remote server
 * @param {string} url - audio file url
 * @returns {Promise}
 * @example
 * getAudioType('https://0345-1400187352-1256635546.cos.ap-shanghai.myqcloud.com/rychou/e3801cfc517873a5a5471241e1da1869')
 * .then(type => { console.log(type) })
 * // output 'aac'
 */
export default function getAudioType(url) {
  return loadFile(url, 'arraybuffer').then(xhr => getAudioTypeFromBuffer(xhr.response))
}

/**
 * get audio file type from array buffer
 * @export
 * @param {ArrayBuffer} buffer
 * @returns {String} type of file
 */
export function getAudioTypeFromBuffer(buffer){
  const hex = buf2hex(buffer)
  if (isAAC(hex)) {
    return 'aac'
  } else if (isAMR(hex)) {
    return 'amr'
  } else if (isMP3(hex)) {
    return 'mp3'
  } else if (isFLAC(hex)) {
    return 'flac'
  } else if (isWAV(hex)) {
    return 'wav'
  } else if (isWMA(hex)) {
    return 'wma'
  } else if (isOGA(hex)) {
    return 'oga'
  } else {
    return false
  }
}

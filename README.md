# audio-type-detect

> Detect an audio file type from remote url or ArrayBuffer.

According to the [magic number](<https://en.wikipedia.org/wiki/Magic_number_(programming)>) of a file, we can detect the type of an audio file with or without a file suffix.

## Install

```shell
npm install audio-type-detect --save
```

## Usage

**detect from url**

```js
import getAudioType from 'audio-type-detect'

// an aac audio file without file suffix
const url = 'https://0345-1400187352-1256635546.cos.ap-shanghai.myqcloud.com/rychou/e3801cfc517873a5a5471241e1da1869'

getAudioType(url).then(type => {
  console.log(type)
})

// ouput aac
```

**detect from buffer**

```js
import { getAudioTypeFromBuffer } from 'audio-type-detect'
// an aac audio file without file suffix
const url = 'https://0345-1400187352-1256635546.cos.ap-shanghai.myqcloud.com/rychou/e3801cfc517873a5a5471241e1da1869'

const xhr = new XMLHttpRequest();
xhr.open('GET', 'url');
xhr.responseType = 'arraybuffer';
xhr.send();
xhr.onload = () => {
    console.log(getAudioTypeFromBuffer(xhr.response));
    // output aac
};
```

## API

**getAudioType(url) -> { Promise }**

get audio file type from an url.

Parameters：

| Name | Type   | Description         |
| ---- | ------ | ------------------- |
| url  | String | The audio file url. |

Returns:

return a `Promise` object

- `getAudioType(url).then(type => {}) ` the type( `String` ) of file.  if detect failure, it return `false`
- `getAudioType(url).catch(error => {})`

**getAudioTypeFromBuffer(buffer) -> { String }**

get audio file type from an array buffer.

Parameters：

| Name | Type   | Description         |
| ---- | ------ | ------------------- |
| url  | String | The audio file url. |

Returns:

return the type( `String` ) of file.  if detect failure, it return `false`

### Supported file type

`mp3`, `flac`, `aac`, `oga`, `wav`, `wma`, `amr`

### Related

- [margic number table](https://www.garykessler.net/library/file_sigs.html)
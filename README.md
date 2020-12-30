### Face Recognition Brain web page
from udemy lecture

#### Front(React)

#### Backend(Node)

* $ npm init (package.json)
* $ npm install body-parser (req.body할 때 필요)
* $ npm install express (node_modules)
* $ npm install nodemon
* package.json 에 추가

``` json
"scripts": {
    "start": "nodemon server.js"
}
```

* express 기본 골격
``` js
const express = require('express')
const app = express()

app.listen(3000, () => { //listen 이후에 실행
    console.log('app is running on port 3000')
})
```

* $ npm install bcrypt-nodejs (bcrypt : 같은 값이라도 매번 암호화 된 값이 다름)
> <a href='https://www.npmjs.com/package/bcrypt-nodejs'>npm bcrypt-nodejs</a>

* $ npm install cors (localhost에서 테스트하기위해. 보안관련)
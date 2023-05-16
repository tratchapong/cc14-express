function use(...args) {
  console.log(args.length)
  let path, cb
  let n = args.length
  switch(n) {
    case 1 :  
      path = "*" 
      cb = args[0]
      break
    case 2 : 
      path = args[0]
      cb = args[1]
      break
    default :
      [path, ...cb] = args
  }
  console.log('path :', path)
  console.log('cb :', cb)
  
}
use()
use((req, res) => {console.log('first')})
use('/test',(req, res) => {console.log('first')})
use(1,2,3)
use(1,2,3,4)


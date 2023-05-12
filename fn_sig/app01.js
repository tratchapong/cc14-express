function middleware(...args) {
  let req, res, next, err

  if(args.length < 2 || args.length > 4) 
    return console.log('please check your arguments')
  switch(args.length) {
    case 2 : 
      [req, res] = args
      break
    case 3 :
      [req, res, next] = args
      break
    case 4 :
      [err, req, res, next] = args
  }
  console.log('err', err)
  console.log('req', req)
  console.log('res', res)
  console.log('next', next)
  console.log('-----')
}

middleware(1)
middleware(1,2)
middleware(1,2,3)
middleware(1,2,3,4)
middleware(1,2,3,4,5)
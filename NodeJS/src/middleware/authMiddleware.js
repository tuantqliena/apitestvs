import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    console.log('req.headers', req.headers)
    const token = req.headers.token.split(' ')[1]
    console.log('access_token 111', token)

    if(!token){
        console.log('Loi Auth Middeleware 1')
        return res.status(404).json({
            message: 'Token is invalid'
        })
    }
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, user) {
        // jwt.verify(access_token, 'access_token', function(err, user) {
        console.log('user ne nha 1', user)
        console.log('Loi Auth Middeleware 2_1: ', err, user)
        if(err){
            console.log('Loi Auth Middeleware 2', err, user)
            return res.status(404).json({
                message: 'The user is not authentication'
            })
        }

        console.log('user ne nha', user)
        
        if(user.isAdmin){
            console.log('Loi Auth Middeleware 3')
            next()
        } else{
            console.log('Loi Auth Middeleware 4')
            return res.status(404).json({
                message: 'The user is not authentication'
            })
        }
    })
}

export default authMiddleware
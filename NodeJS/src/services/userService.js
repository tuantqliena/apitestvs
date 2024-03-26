import {User} from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createUserService = (datas) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(datas.email)
            console.log('isEmail', isEmail)
            if(isEmail){
                const isCheckEmail = await User.find({email: datas.email})
                console.log('isCheckEmail', isCheckEmail)
                if(isCheckEmail.length) {
                    resolve({
                        status: 'Loi Roi Ne 4',
                        message: 'The Email is Duplicated'
                    })
                } else {
                    const hashpassword = bcrypt.hashSync(datas.password, 10);

                    datas.password = hashpassword
                    
                    // const newUser = await User.create({
                    //     email: datas.email,
                    //     password: hashpassword,
                    //     nameDesc: datas.nameDesc,
                    //     name2: datas.name2,
                    //     isAdmin: datas.isAdmin
                    // })
                    const newUser = await User.create(datas)
                    
                    resolve({
                        status: 'OK 1',
                        // data: rest
                        data: {
                            email: newUser.email,
                            nameDesc: newUser.nameDesc
                        }
                    })
                }
            } else {
                resolve({
                    status: 'Loi Roi Ne 3',
                    message: 'The Email is Invalid'
                })
            } 
        } catch (err) {
            reject({
                status: 'Loi Roi Ne 5',
                message: err
            })
        }
    })
}

// export const createUserService = ({email, password, nameDesc}) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
//             console.log('isEmail', isEmail)
//             if(isEmail){
//                 const isCheckEmail = await User.find({email: email})
//                 console.log('isCheckEmail', isCheckEmail)
//                 if(isCheckEmail.length) {
//                     resolve({
//                         status: 'Loi Roi Ne 4',
//                         message: 'The Email is Duplicated'
//                     })
//                 } else {
//                     const hashpassword = bcrypt.hashSync(password, 10);
//                     const newUser = await User.create({
//                         email,
//                         password: hashpassword,
//                         nameDesc
//                     })

//                     resolve({
//                         status: 'OK 1',
//                         // data: rest
//                         data: {
//                             email: newUser.email,
//                             nameDesc: newUser.nameDesc
//                         }
//                     })
//                 }
//             } else {
//                 resolve({
//                     status: 'Loi Roi Ne 3',
//                     message: 'The Email is Invalid'
//                 })
//             } 
//         } catch (err) {
//             reject({
//                 status: 'Loi Roi Ne 5',
//                 message: err
//             })
//         }
//     })
// }

const generateAccessToken = (datas) => {
    const access_token = jwt.sign(datas, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'})
    return access_token
}

const generateRefreshToken = (datas) => {
    const access_token = jwt.sign(datas, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '365d'})
    return access_token
}

export const loginUserService = ({email, password}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
            console.log('isEmail', isEmail)
            if(isEmail){
                const userDB = await User.find({email: email})
                if(userDB.length) {
                    // const hashpassword = bcrypt.hashSync(password, 10);
                    const isCheckPass = bcrypt.compareSync(password, userDB[0].password)
                    console.log('Check', isCheckPass, userDB)
                    if(isCheckPass) {
                        // const access_token = generateAccessToken({ isAdmin: userDB[0].isAdmin, _id: userDB[0]._id, email: userDB[0].email })
                        // const refresh_token = generateRefreshToken({ isAdmin: userDB[0].isAdmin, _id: userDB[0]._id, email: userDB[0].email })
                        const access_token = generateAccessToken({ isAdmin: userDB[0].isAdmin, _id: userDB[0]._id, email: userDB[0].email })
                        const refresh_token = generateRefreshToken({ isAdmin: userDB[0].isAdmin, _id: userDB[0]._id, email: userDB[0].email })
                        console.log('access_token', access_token)
                        console.log('refresh_token', refresh_token)
                        const {password, ...rest} = userDB
                        resolve({
                            status: 'Resolve 1',
                            data: rest,
                            data1: {
                                email: userDB[0].email,
                                nameDesc: userDB[0].nameDesc,
                                access_token,
                                refresh_token
                            }
                        })
                    } 

                    resolve({
                        status: 'Loi Roi Ne 7',
                        message: 'The Password is Invalid'
                    })
                } 
            } else {
                resolve({
                    status: 'Loi Roi Ne 3',
                    message: 'The Email is Invalid'
                })
            } 
        } catch (err) {
            reject({
                status: 'Loi Roi Ne 5',
                message: err
            })
        }
    }).catch((e) => console.log(e))
}

export const refreshTokenService = (token) => {
    console.log('token ne: ', token)
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, function(err, user) {
                console.log('check ne: ', err, user)
                if(err){
                    console.log('aa')
                    resolve(404).json({
                        message: 'The user is not authentication'
                    })
                }
                console.log('USER ne nha', user)
                if(user){
                    console.log('USER', user)
                    const newAccessToken = generateAccessToken({ isAdmin: user.isAdmin, _id: user._id, email: user.email })
                    resolve({
                        status: 'OK',
                        access_token: newAccessToken
                    })
                } else{
                    console.log('bb')
                    resolve(404).json({
                        message: 'The user is not authentication'
                    })
                }
            })
        } catch (err) {
            console.log('cc')
            reject({
                status: 'Loi refreshTokenService Roi Ne',
                message: err
            })
        }
    }).catch((e) => console.log(e))
}

export const getDetailUserService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findUser = await User.findById(id)
            if(findUser) {
                resolve({
                    status: 'Resolve 3',
                    data: findUser
                })
                    
            } 

            resolve({
                status: 'Loi Roi Ne 10',
                message: 'The findUser is Invalid'
            })
        } catch (err) {
            reject({
                status: 'Loi Roi Ne 9',
                message: err
            })
        }
    }).catch((e) => console.log(e))
}

export const searchUserService = (email, nameDesc) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const findUser = await User.find({nameDesc: nameDesc})
            const findUser = await User.find({email, nameDesc})
            if(findUser) {
                resolve({
                    status: 'Resolve 13',
                    data: findUser
                })    
            } 

            resolve({
                status: 'Loi Roi Ne 12',
                message: 'The findUser is Invalid'
            })
        } catch (err) {
            reject({
                status: 'Loi Roi Ne 11',
                message: err
            })
        }
    }).catch((e) => console.log(e))
}

export const updateUserService = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkDataUpdate = await User.findOne(data)
            if(checkDataUpdate) {
                resolve({
                    status: 'Resolve Err 17',
                    data: 'Data Dupicated. Please input another data'
                })  
            }
            //ko cap nhat lai bien updateUser
            // const updateUser = await User.findByIdAndUpdate(id, data)
            //cap nhat lai bien updateUser
            const updateUser = await User.findByIdAndUpdate(id, data, {new: true})
            if(updateUser) {
                // const getUserNew = await getDetailUserService(id)
                resolve({
                    status: 'Resolve 16',
                    data: updateUser
                })    
            } 

            resolve({
                status: 'Loi Roi Ne 15',
                message: 'The updateUser is Invalid'
            })
        } catch (err) {
            reject({
                status: 'Loi Roi Ne 14',
                message: err
            })
        }
    }).catch((e) => console.log(e))
}

export const deleteUserService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteUser = await User.findByIdAndDelete(id)
            if(deleteUser) {
                // const getUserNew = await getDetailUserService(id)
                resolve({
                    status: 'Resolve 19',
                    data: deleteUser
                })    
            } 

            resolve({
                status: 'Loi Roi Ne 18',
                message: 'The deleteUser is Invalid'
            })
        } catch (err) {
            reject({
                status: 'Loi Roi Ne 17',
                message: err
            })
        }
    }).catch((e) => console.log(e))
}

export const getAllUserService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const findAll = await User.find()
            if(findAll) {
                resolve({
                    status: 'Resolve 23',
                    data: findAll
                })
                    
            } 

            resolve({
                status: 'Loi Roi Ne 22',
                message: 'The findAll is Invalid'
            })
        } catch (err) {
            reject({
                status: 'Loi Roi Ne 21',
                message: err
            })
        }
    }).catch((e) => console.log(e))
}

export const deleteManyUserService = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            var findAll = await User.deleteMany({_id: ids})

            if(findAll) {
                resolve({
                    status: 'Resolve 29',
                    data: findAll
                })
                    
            } 

            resolve({
                status: 'Loi Roi Ne 28',
                message: 'The deleteManyUserService is Invalid'
            })
        } catch (err) {
            reject({
                status: 'Loi Roi Ne 27',
                message: err
            })
        }
    }).catch((e) => console.log(e))
}

export const deleteAllUserService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const findAll = await User.deleteMany()
            if(findAll) {
                resolve({
                    status: 'Resolve 26',
                    data: findAll
                })
                    
            } 

            resolve({
                status: 'Loi Roi Ne 25',
                message: 'The deleteAllUserService is Invalid'
            })
        } catch (err) {
            reject({
                status: 'Loi Roi Ne 24',
                message: err
            })
        }
    }).catch((e) => console.log(e))
}
import { createUserService, loginUserService, getDetailUserService
        , searchUserService, updateUserService, deleteUserService
        , getAllUserService, deleteManyUserService, deleteAllUserService
        , refreshTokenService } from '../services/userService.js'

export const userController = (req, res) => {
    console.log('req.params', req.params)
}

export const userdetailsController = async (req, res) => {
    const {id} = req.params
    
    if(id) {
        const response = await getDetailUserService(id)
        return res.json(response)
    }

    return res.json({
        status: 'err',
        message: 'The id is required'
    })
}

export const createUserController = async (req, res) => {
    // console.log('req.body', req.body)
    // const {email, password, nameDesc} = req.body
    const datas = req.body
    // console.log(data)
    // const email = data.email
    // console.log(email)

    if(datas.email && datas.password && datas.nameDesc){
        // console.log('data ne', datas)
        const response = await createUserService(datas)
        return res.json(response)
    } else{
        return res.json({
            status: 'Loi Roi Ne 2',
            message: 'The Email or Pass or Name is Invalid'
        })
    }
}

// export const createUserController = async (req, res) => {
//     // console.log('req.body', req.body)
//     const {email, password, nameDesc} = req.body

//     if(email && password && nameDesc){
//         const response = await createUserService({email, password, nameDesc})
//         return res.json(response)
//     } else{
//         return res.json({
//             status: 'Loi Roi Ne 2',
//             message: 'The Email or Pass or Name is Invalid'
//         })
//     }
// }

export const loginUserController = async (req, res) => {
    const {email, password} = req.body

    if(email && password){
        const response = await loginUserService({email, password})
        return res.json(response)
    } else{
        return res.json({
            status: 'Loi loginUserController',
            message: 'The Email or Pass or Name is Invalid'
        })
    }
}

export const searchUserController = async (req, res) => {
    try {
        const {email} = req.query
        const {nameDesc} = req.query
    
        if(email && nameDesc) {
            const response = await searchUserService(email, nameDesc)
            return res.json(response)
        }

        return res.json({
            status: 'err',
            message: 'The id is required'
        })
    } catch (err) {
        console.log(err)
        return res.json({
            status: 'Loi searchUserController',
            message: err
        })
    }
}

export const updateUserController = async (req, res) => {
    try {
        const {id} = req.params
        const data = req.body
    
        if(id) {
            const response = await updateUserService(id, data)
            return res.json(response)
        }

        return res.json({
            status: 'err',
            message: 'The id is required updateUserController'
        })
    } catch (err) {
        console.log(err)
        return res.json({
            status: 'Loi updateUserController',
            message: err
        })
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const {id} = req.params
    
        if(id) {
            const response = await deleteUserService(id)
            return res.json(response)
        }

        return res.json({
            status: 'err',
            message: 'The id is required deleteUserController'
        })
    } catch (err) {
        console.log(err)
        return res.json({
            status: 'Loi deleteUserController',
            message: err
        })
    }
}

export const getAllUserController = async (req, res) => {
    try {
        const response = await getAllUserService()
        return res.status(200).json({
            status: 'OK',
            data: response
        })
    } catch (err) {
        console.log(err)
        return res.json({
            status: 'Loi getAllUserController',
            message: err
        })
    }
}

export const deleteManyUserController = async (req, res) => {
    const {id} = req.query
    try {
        const response = await deleteManyUserService(id)
        return res.status(200).json({
            status: 'OK',
            data: response
        })
    } catch (err) {
        console.log(err)
        return res.json({
            status: 'Loi deleteAllUserController',
            message: err
        })
    }
}

export const deleteAllUserController = async (req, res) => {
    try {
        const response = await deleteAllUserService()
        return res.status(200).json({
            status: 'OK',
            data: response
        })
    } catch (err) {
        console.log(err)
        return res.json({
            status: 'Loi deleteAllUserController',
            message: err
        })
    }
}

export const refreshTokenUserController = async (req, res) => {
    try {
        const refreshToken = req.headers.token.split(' ')[1]

        if(refreshToken){
            const response = await refreshTokenService(refreshToken)
            return res.json(response)
        } else{
            return res.json({
                message: 'The Refresh Token Name is not valid'
            })
        }
    } catch (err) {
        return res.json({
            status: 'Loi refreshTokenUserController',
            message: err
        })
    }
}
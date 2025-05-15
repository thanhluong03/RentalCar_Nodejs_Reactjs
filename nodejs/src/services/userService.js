import { where } from "sequelize";
import db from "../models/index";
import { raw } from "body-parser";
import user from "../models/user";



let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
            where: { email: userEmail },
        });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
    
            if (isExist) {
            let user = await db.User.findOne({
                attributes: ['id', 'email', 'roleId', 'password', 'first_name', 'last_name'], 
                where: { email: email },
                raw: true,
            });
            if (user){
                let check = user.password === password;
                if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'ok';
                        delete user.password;
                        userData.user = user;
                } else {
                userData.errCode = 3;
                userData.errMessage = "Wrong password";
                }
            } else {
                userData.errCode = 2;
                userData.errMessage = "User is not found!!";
            }
        } else {
            userData.errCode = 1;
            userData.errMessage = "Your Email isn't exist in your system!!";
        }
    
        resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise (async(resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if(check === true) {
                resolve ({
                    errCode: -1,
                    errMessage: 'Your email is already in used'
                })
            } else {
                await db.User.create({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    age: data.age,
                    gender: data.gender,
                    driver_licence: data.avatar,
                    phone: data.phone,
                    email: data.email,
                    password: data.password,
                    roleId: data.roleId
                })

                resolve ({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise (async(resolve, reject) => {
        try{
            let users = '';
            if(userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
                if(users && users.driver_licence){
                    users.driver_licence = new Buffer(users.driver_licence, 'base64').toString('binary');
                }
            }

            if(userId && userId !=='ALL'){
                users = await db.User.findOne({
                    where: {id: userId},
                    attributes: {
                        exclude: ['password']
                    }
                })
                if(users && users.driver_licence){
                    users.driver_licence = new Buffer(users.driver_licence, 'base64').toString('binary');
                }
            }
            resolve (users)
        } catch (e) {
            reject(e);
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!!'
                });
            } else {
                let whereCondition = { type: typeInput };
                if (typeInput === 'ROLE') {
                    whereCondition.keyMap = 'R2';
                }

                let allcode = await db.Allcode.findAll({
                    where: whereCondition
                });

                resolve({
                    errCode: 0,
                    data: allcode
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let deleteUser = (userId) => {
    return new Promise( async(resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: {id: userId}
        })
        if(!foundUser) {
            resolve({
            errCode: 2,
            errMessage: `The user isn't exist`
        })
        }
        else {
            await db.User.destroy({
            where: {id: userId}
        })
        }
        resolve({
            errCode: 0,
            errMessage: `The user is delete`
        })
    })
}
module.exports = {
    handleUserLogin,
    createNewUser,
    getAllUsers,
    getAllCodeService,
    deleteUser
}
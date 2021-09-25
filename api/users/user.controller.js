const { create, getUser, getuserById, updateUser, deleteUser, getUserByUserEmail } = require('./user.service');
const { hashSync, genSaltSync,compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken')

module.exports = {
    createUser: (req, res) => {
        let body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    sucess: 0,
                    message: 'Database connection error,'
                })
            }
            return res.status(200).json({
                sucess: 1,
                data: results
            })
        })
    },
    getUser: (req, res) => {
        getUser((err, results) => {
            if (err) {
                return;
            }
            return res.json({
                sucess: 1,
                data: results
            });
        });
    },
    getuserById: (req, res) => {
        const id = req.params.id;
        getuserById(id, (err, results) => {
            if (err) {
                return;
            }
            if (!results) {
                return res.json({
                    status: 0,
                    message: 'No data found'
                })
            }
            return res.json({
                sucess: 1,
                data: results
            })
        })
    },
    updateUser: (req, res) => {
        let body = req.body;
        let salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                return;
            }
            return res.json({
                sucess: 1,
                message: 'Data updated successfully'
            });
        });
    },
    deleteUser: (req, res) => {
        let body = req.body;
        deleteUser(body, (err, results) => {
            if (err) {
                return res.json({
                    sucess: 0,
                    message: 'Something went wrong'
                });
            }
            return res.json({
                sucess: 1,
                message: 'Data deleted sucessfully'
            })
        })
    },
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
          if (err) {
            console.log(err);
          }
          if (!results) {
            return res.json({
              success: 0,
              data: "Invalid email or password"
            });
          }
          const result = compareSync(body.password, results.password);
          if (result) {
            results.password = undefined;
            const jsontoken = sign({ result: results }, "qwe1234", {
              expiresIn: "1h"
            });
            return res.json({
              success: 1,
              message: "login successfully",
              token: jsontoken
            });
          } else {
            return res.json({
              success: 0,
              data: "Invalid email or password"
            });
          }
        });
      }
}
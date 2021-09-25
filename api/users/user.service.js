const poll = require('../../config/database');

module.exports = {
    create: (data, callback) => {
        poll.query(`insert into test_registration (firstname,lastname,gender,email,password,number)
        values(?,?,?,?,?,?)`,
            [data.firstname, data.lastname, data.gender, data.email, data.password, data.number],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            })
    },
    getUser: callback => {
        poll.query(`select id,firstname,lastname,email from test_registration`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            })
    },
    getuserById: (id, callback) => {
        poll.query(`select id,firstname,lastname,email from test_registration where id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            })
    },
    updateUser: (data, callback) => {
        poll.query(`update test_registration set firstname=?,lastname=?,email=?,password=?,number=? where id=?`,
            [data.firstname, data.lastname, data.email, data.password, data.number, data.id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            })
    },
    deleteUser: (data, callback) => {
        poll.query(`delete from test_registration where id=?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null,results)
            })
    },
    getUserByUserEmail: (email, callBack) => {
        poll.query(
          `select * from test_registration where email = ?`,
          [email],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      }
}
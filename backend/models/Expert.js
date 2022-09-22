const db=require('../configure/mysqlConnection');
const Joi=require("joi");

const Expert={
    schema: {
        name:Joi.string().min(3).max(100).required(),
        email:Joi.string().max(100).email().required(),
        password:Joi.string().min(8).max(255).required(),
        phone_num:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        institution_name:Joi.string().min(3).max(100).required(),
        reg_num:Joi.string().alphanum().min(3).max(255).required()
    },
    async getAllExperts(){
        try {
            const [rows] = await db.query("SELECT * FROM `law_docs_label`.`expert`;");
            return { DBdata:rows };
        } catch (error) {
            console.error(error.sqlMessage);
            return { DBerror: "Database Error Occured." };
        }
    },
    async getExpertByID(e_id){
        try {
            const [rows] = await db.query("SELECT * FROM `law_docs_label`.`expert` WHERE (`e_id` = ?);",[e_id]);
            return { DBdata:rows };
        } catch (error) {
            console.error(error.sqlMessage);
            return { DBerror: "Database Error Occured." };
        }
    },
    async getExpertByEmail(email){
        try {
            const [rows] = await db.query("SELECT * FROM `law_docs_label`.`expert` WHERE (`email` = ?);",[email]);
            return { DBdata:rows };
        } catch (error) {
            console.error(error.sqlMessage);
            return { DBerror: "Database Error Occured." };
        }
    },
    async addNewExpert({name,email,password,phone_num,institution_name,reg_num}){
        try {
            const queryString="INSERT INTO `law_docs_label`.`expert` (`name`,`email`, `password`, `phone_num`, `institution_name`, `reg_num`) VALUES (?, ?, ?, ?, ?, ?);";
            const [rows] = await db.query(queryString,[name,email,password,phone_num,institution_name,reg_num]);
            return { DBdata: rows };
        } catch (error) {
            console.error(error.sqlMessage);
            return { DBerror:"Database Error Occured." };
        }
    },
    async updateExpertData({e_id,name,email,password,phone_num,institution_name,reg_num}){
        try {
            const queryString="UPDATE `law_docs_label`.`expert` SET `name` = ?, `email` = ?, `password` = ?, `phone_num` = ?, `institution_name` = ?, `reg_num` = ? WHERE (`e_id` = ?);"
            const [rows] = await db.query(queryString,[name,email,password,phone_num,institution_name,reg_num,e_id]);
            return { DBdata: { message:rows.affectedRows>0 ? "Update Successful." : "Update Unsuccessful."} };
        } catch (error) {
            console.error(error.sqlMessage);
            return { DBerror: "Database Error Occured." };
        }  
    },
    async deleteExpert(e_id){
        try {
            const queryString="DELETE FROM `law_docs_label`.`expert` WHERE `e_id` = ?;";
            const [rows] = await db.query(queryString,[e_id]);
            return { DBdata: { message:rows.affectedRows>0 ? "Deletion Successful." : "Deletion Unsuccessful."} };
        } catch (error) {
            console.error(error.sqlMessage);
            return { DBerror: "Database Error Occured." };
        }
        
    }
}

module.exports = Expert;
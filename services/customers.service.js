const db = require('../db')

module.exports.getAllCustomers = async () => {
    const [records] = await db.query("SELECT * FROM customers")
    return records;
}

module.exports.getCustomerById = async (id) => {
    const [[record]] = await db.query("SELECT * FROM customers WHERE id = ?", [id])
    return record;
}


module.exports.deleteCustomer = async (id) => {
    const [{affectedRows}] = await db.query("DELETE FROM customers WHERE id = ?", [id])
    return affectedRows;
}

module.exports.addOrEditCustomer = async (obj, id = 0) => {
    const [[[{affectedRows}]]] = await db.query("CALL usp_customer_add_or_edit(?,?,?,?,?,?,?)", 
    [id, obj.name, obj.email, obj.password, obj.contacts, obj.age, obj.isActive, obj.createdAT])
    return affectedRows;
}
const express = require('express'),
router = express.Router()

const service = require('../services/customers.service');


//http://localhost:3000/api/customers/
router.get('/', async (req, res) => {
    const customers = await service.getAllCustomers()
    //res.send('Hello Elliot')
    res.send(customers)
})

router.get('/:id', async (req, res) => {
    const customer = await service.getCustomerById(req.params.id)
    if (!customer || Array.isArray(customer) && customer.length == 0)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send(customer)
    
})



router.delete('/:id', async (req, res) => {
    const affectedRows = await service.deleteCustomer(req.params.id)
    if (affectedRows == 0)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
    res.send('deleted successfully')
    
})

router.post('/', async (req, res) => {
    await service.addOrEditCustomer(req.body)
    res.status(201).send('created successfully')
})


router.put('/:id', async (req, res) => {
    const affectedRows = await service.addOrEditCustomer(req.body, req.params.id)
    if (affectedRows == 0)
        res.status(404).json('no record with given id :' + req.params.id)
    else 
        res.send('updated successfully.')
    
})

module.exports = router;
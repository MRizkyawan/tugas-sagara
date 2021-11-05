const {product} = require ('../models')


module.exports = {
    createProduct : async (req,res) => {
        const body = req.body
        const user = req.user
        try {
            const check = await product.create({
                userId : user.id,
                name: body.name,
                price: body.price,
                photo: req.file.path
              });
        
              if (!check) {
                return res.status(400).json({
                  status: "failed",
                  message: "Unable to save the data to database",
                });
              }
              return res.status(200).json({
                status: "success",
                message: "Successfully saved to database",
                data: check,
              });
        
        
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"        
            })
    }
},
getProduct: async(req, res) => {
    try {
        const userProduct = await product.findAll()
        if (!userProduct) {
            res.status(400).json({
                status: "failed",
                message: "data not found",
                data: []
            })


        }
        return res.status(200).json({
            status: "success",
            message: "Successfully get data",
            data: userProduct
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "failed",
            message: "Internal server error"
        })
    }
},
updateProduct: async(req, res) => {
    const body = req.body;
    try {
        const updatedProduct = await product.update({...body }, {
            where: {
                id: req.params.id,
            },
        });

        if (!updatedProduct[0]) {
            return res.status(400).json({
                status: "failed",
                message: "Unable to update database",
            });
        }

        const data = await product.findOne({
            where: {
                id: req.params.id,
            },
        });

        return res.status(200).json({
            status: "success",
            message: "Data updated successfully",
            data: data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "failed",
            message: "Internal Server Error",
        });
    }
},
deleteProduct: async(req, res) => {
    const id = req.params.id
    try {
        const deleteProduct = await product.destroy({
            where: {
                id: id
            }
        })

        if (!deleteProduct) {
            return res.status(400).json({
                status: "failed",
                message: "unable to delete data",

            })
        }
        const data = await product.findAll()

        res.status(200).json({
            status: "success",
            message: "success deleted data",
            data: data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "failed",
            message: "Internal server error"
        })
    }
}


}
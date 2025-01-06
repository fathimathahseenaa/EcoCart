const productModel = require('../models/productModel'); 

exports.getProducts = async (req, res, next)=>{
    const query = req.query.keyword?{ name : { //find products by search
        $regex: req.query.keyword,
        $options: 'i' //case sensitive
     }}:{}
   
    const products = await productModel.find(query);
    res.json({
        success: true,
        products
    })

}

exports.getSingleProducts = async (req, res, next )=>{
    //console.log(req.params.id, 'ID')
    try{
    const product = await productModel.findById(req.params.id);

    res.json({
        success: true,
        product
    })
} catch (error) {
    res.status(404).json({
          success: false,
         message: 'Unable to get Product with that ID'
     })
}


}

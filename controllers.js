exports.getChallenge = async function getChallenge(req, res, next) {
    const fs = require('fs');
    //fs.readFileSync('./challenge.txt');
    fs.readFile("challenge.txt", "utf8", function(err, data){
            if(err) throw err;
            res.send(data);
    });
}

exports.getOrder = async function getOrder(req, res, next) {

    console.log('received request: %o', new Date());

    const checkOrder = async (order) => {
        try {
            if (!order.ok) {
                res.status(400).json({status: 'bad request'});
                alreadyResponded = true;
            } else {
                const data = await order.json();
                response.status = data.status;
            }
        } catch(e) {
            res.status(404).json({status: 'not found'});
            alreadyResponded = true;
        }
    };
    const checkShipping = async (shipping) => {
        try {
            if (!shipping.ok) {
                response.shipping_info = {status: 'bad request'};
                res.status(400).json(response);
                alreadyResponded = true;
            } else {
                const data = await shipping.json();
                response.shipping_info = [
                    {
                        shipping_method: data[0].shipping_method, 
                        tracking_number: data[0].tracking_number, 
                        tracking_carrier: data[0].tracking_carrier
                    }
                ];
            }
        } catch(e) {
            response.shipping_info = {status: 'not found'};
        }
    };

    let alreadyResponded = false;

    let init = {
        method: 'GET',
        headers: {
            "Accept": 'application/json'
        },
    };

    let response = {
        status: null,
        shipping_info: null
    };
    
    let store;    
    if (req.params.env === 'dev') {
        store = "9x4ctn3ioy";
	init.headers = {
            "Accept": 'application/json',
            "X-Auth-Token": "8jg43j8rstvheyzfjcsvd8adxh483kn"
        }
    } else {
        store = "3xaaslonk2";
	init.headers = {
            "Accept": 'application/json',
            "X-Auth-Token": "3snz4aqwlheh6zjmdaezg5fn7plbc4h"
        }
    }
    
    let orders = `https://api.bigcommerce.com/stores/${store}/v2/orders/${req.params.orderId}`;
    let shipments = `https://api.bigcommerce.com/stores/${store}/v2/orders/${req.params.orderId}/shipments`;

    const responseOrder = await fetch(orders, init);
    const responseShipment = await fetch(shipments, init);

    await checkOrder(responseOrder);
    if (!alreadyResponded) {
        await checkShipping(responseShipment);
    }
    if (!alreadyResponded) {
        res.status(200).json(response);
    }

}
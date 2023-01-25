exports.getOrder = async function getOrder(req, res, next) {

    /*const axios = require('axios');
    
    const options = {
        headers: {
            "Accept": 'application/json',
            "X-Auth-Token": "8jg43j8rstvheyzfjcsvd8adxh483kn"
        }
    };
        
    let orderId = 720;

    axios.get(`https://api.bigcommerce.com/stores/9x4ctn3ioy/v2/orders/${orderId}/shipments`, options)
        .then((res) => {
            console.log(`Status: ${res.status}`);
            console.log('Body: ', res.data);
        }).catch((err) => {
            console.error(err);
        });*/

    console.log('parameters');
    console.log(req.params);

    let store;
    if (req.params.env === 'dev') {
        store = "9x4ctn3ioy";
    } else {
        store = "3xaaslonk2";
    }

    let resource = `https://api.bigcommerce.com/stores/${store}/v2/orders/${req.params.orderId}/shipments`;
        let init = {
            method: 'GET',
            headers: {
                "Accept": 'application/json',
                "X-Auth-Token": "8jg43j8rstvheyzfjcsvd8adxh483kn"
            },
        }

        const response = await fetch(resource, init);
        console.log(response);

        try {
            if (!response.ok) {
                console.log(response.status, response.statusText);
                res.status(400).json({status: 'bad request'});
             } else {
                const data = await response.json();
                console.log(data);
                res.status(200).json(data);
             }
        } catch(e) {
            res.status(404).json({status: 'not found'});
        }
        
        

}


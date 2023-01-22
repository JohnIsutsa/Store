const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { async } = require('rxjs');

const app = express();
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors({ origin:true, credentials:true}))

const stripe = require('stripe')('sk_test_poxidMe3ArqBFmzB0Y5gLds700JXfwTWEO');

app.post("/checkout", async(req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {allowed_countries: ['KE', 'GH', 'UG', 'TZ', 'NG']},
            shipping_options: [
                {
                  shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {amount: 0, currency: 'usd'},
                    display_name: 'Free shipping',
                    delivery_estimate: {
                      minimum: {unit: 'business_day', value: 5},
                      maximum: {unit: 'business_day', value: 7},
                    },
                  },
                },
            ],
            line_items: req.body.items.map((item) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        images: [item.product]
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: "http://localhost:4242/success.html",
            cancel_url: "https://localhost:4242/cancel.html",
        });

        return res.status(200).json(session);
    } catch (error) {
        next(error);
    }
});

app.listen(4242, () => console.log('App is running on 4242'));
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Paid Institutions
    |--------------------------------------------------------------------------
    |
    | Institutions listed here must complete an online payment (Xendit) after
    | submitting a Skillsoft registration. Keys are institution codes accepted
    | by the lead API. All other institutions keep the free registration flow.
    |
    | Amounts are set here on the server only; the client never sends a price.
    |
    */

    'institutions' => [
        'earist' => [
            'amount' => (float) env('XENDIT_EARIST_FEE', 850),
            'currency' => 'PHP',
            // Public HTTPS origin of the EARIST site. Used for Xendit return URLs.
            'return_origin' => env('XENDIT_EARIST_RETURN_ORIGIN'),
        ],
    ],

];

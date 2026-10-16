<?php

$configuredOrigins = array_filter(array_map(
    'trim',
    explode(',', (string) env('CORS_ALLOWED_ORIGINS', 'http://localhost:5173,http://localhost:5174'))
));

return [
    'paths' => ['api/skillsoft-leads'],
    'allowed_methods' => ['POST', 'OPTIONS'],
    'allowed_origins' => array_values($configuredOrigins),
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['Content-Type', 'Accept'],
    'exposed_headers' => [],
    'max_age' => 600,
    'supports_credentials' => false,
];

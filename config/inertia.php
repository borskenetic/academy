<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Server Side Rendering
    |--------------------------------------------------------------------------
    |
    | SSR stays disabled: pages render client-side inside the Blade root view.
    | Enable it (and run `npm run build:ssr` plus the SSR node server) only if
    | server-rendered HTML is ever required for SEO.
    |
    */

    'ssr' => [
        'enabled' => (bool) env('INERTIA_SSR_ENABLED', false),
        'url' => env('INERTIA_SSR_URL', 'http://127.0.0.1:13714'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Pages
    |--------------------------------------------------------------------------
    |
    | Page components live in lowercase `resources/js/pages`, so both the
    | application and the test view finder are pointed there (the package
    | default expects `resources/js/Pages`).
    |
    */

    'ensure_pages_exist' => true,

    // Component names include their folder (e.g. "pages/Home"), so the finder
    // is rooted at resources/js.
    'page_paths' => [
        resource_path('js'),
    ],

    'page_extensions' => [
        'js',
        'jsx',
        'svelte',
        'ts',
        'tsx',
        'vue',
    ],

    'testing' => [
        'ensure_pages_exist' => true,

        'page_paths' => [
            resource_path('js'),
        ],

        'page_extensions' => [
            'js',
            'jsx',
            'svelte',
            'ts',
            'tsx',
            'vue',
        ],
    ],

    'history' => [
        'encrypt' => (bool) env('INERTIA_ENCRYPT_HISTORY', false),
    ],

];
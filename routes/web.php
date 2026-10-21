<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $indexPath = public_path('birthday-site/index.html');

    abort_unless(
        is_file($indexPath),
        503,
        'The birthday site has not been built. Run npm ci and npm run build:laravel from birthday-site/.',
    );

    return response()->file($indexPath);
});

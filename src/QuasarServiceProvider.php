<?php

namespace Laltu\Quasar;

use Illuminate\Support\ServiceProvider;
use Laltu\Quasar\Commands\InstallQuaserProject;

class QuasarServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     */
    public function boot()
    {
        /*
         * Optional methods to load your package assets
         */
         $this->loadTranslationsFrom(__DIR__.'/../resources/lang', 'quasar');
         $this->loadViewsFrom(__DIR__.'/../resources/views', 'quasar');
         $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
         $this->loadRoutesFrom(__DIR__.'/routes.php');

        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__.'/../config/config.php' => config_path('routes.php'),
            ], 'config');

            // Publishing the views.
            /*$this->publishes([
                __DIR__.'/../resources/views' => resource_path('views/vendor/quasar'),
            ], 'views');*/

            // Publishing assets.
            $this->publishes([
                __DIR__ . '/../public' => public_path('vendor/quasar'),
            ], ['assets', 'laravel-assets']);

            // Publishing the translation files.
            /*$this->publishes([
                __DIR__.'/../resources/lang' => resource_path('lang/vendor/quasar'),
            ], 'lang');*/
        }

        // Registering package commands.
        $this->commands([
            InstallQuaserProject::class
        ]);
    }

    /**
     * Register the application services.
     */
    public function register()
    {
        // Automatically apply the package configuration
        $this->mergeConfigFrom(__DIR__.'/../config/config.php', 'quasar');

        // Register the main class to use with the facade
        $this->app->singleton('quasar', function () {
            return new QuasarManager;
        });
    }
}

<?php

namespace Laltu\Quasar\Facades;

use Illuminate\Support\Facades\Facade;
use Laltu\Quasar\Services\ConnectorService;

class LicenseConnector extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return ConnectorService::class;
    }
}
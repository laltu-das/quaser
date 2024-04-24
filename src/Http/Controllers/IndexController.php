<?php

namespace Laltu\Quasar\Http\Controllers;

class IndexController
{
    public function __invoke()
    {
        return view('quasar::layout', [
            'quasarScriptVariables' => [
                'appName' => config('app.name'),
            ],
        ]);
    }
}

<?php

namespace Laltu\Quasar\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Laltu\Quasar\Services\EnvironmentManager;
use Laltu\Quasar\Services\PermissionsChecker;
use Illuminate\Routing\Controller;
use Symfony\Component\Console\Output\BufferedOutput;

class InstallationController extends Controller
{
    public function showServerRequirements()
    {
        $requirements = [
            'PHP >= 8.2' => version_compare(PHP_VERSION, '8.2.0', '>='),
            'BCMath PHP Extension' => extension_loaded('bcmath'),
            'Ctype PHP Extension' => extension_loaded('ctype'),
            'Fileinfo PHP Extension' => extension_loaded('fileinfo'),
            'JSON PHP Extension' => extension_loaded('json'),
            'Mbstring PHP Extension' => extension_loaded('mbstring'),
            'OpenSSL PHP Extension' => extension_loaded('openssl'),
            'PDO PHP Extension' => extension_loaded('pdo'),
            'Tokenizer PHP Extension' => extension_loaded('tokenizer'),
            'XML PHP Extension' => extension_loaded('xml'),
        ];

        return response()->json(['data' => $requirements]);
    }

    public function showFolderPermissions(PermissionsChecker $permissionsChecker)
    {
        $permissions = $permissionsChecker->check();

        return response()->json(['data' => $permissions]);
    }

    public function showEnvironmentVariables(EnvironmentManager $environmentManager)
    {
        $envVariables = $environmentManager->getEnvContent();

        return response()->json(['data' => $envVariables]);
    }

    public function downloadProject(Request $request)
    {
        $output = new BufferedOutput;

        Artisan::call('install:quaser-project', ['token' => $request->token,'envatoItemId' => $request->envatoItemId], $output);

        $content = $output->fetch();

        return response()->json(['data' => $content]);
    }
}

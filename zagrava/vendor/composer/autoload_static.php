<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit1bf4ed8629d3e24c7ac6955ac1d37688
{
    public static $prefixLengthsPsr4 = array (
        'O' => 
        array (
            'OomphInc\\ComposerInstallersExtender\\' => 36,
        ),
        'C' => 
        array (
            'Composer\\Installers\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'OomphInc\\ComposerInstallersExtender\\' => 
        array (
            0 => __DIR__ . '/..' . '/oomphinc/composer-installers-extender/src',
        ),
        'Composer\\Installers\\' => 
        array (
            0 => __DIR__ . '/..' . '/composer/installers/src/Composer/Installers',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit1bf4ed8629d3e24c7ac6955ac1d37688::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit1bf4ed8629d3e24c7ac6955ac1d37688::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}

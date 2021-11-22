Define import alias to esbuild

## Resolve container

By default, the plugin will try to resolve aliases to its proper location which
is necessary when trying to alias a package (`react` -> `preact/compat`),
however this can cause issues with certain plugins.

This can be turned off in the plugin's configuration.

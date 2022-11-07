The global API for this application is accessible via, `turtle` from there all other features can be accessed.

Plugins are written as normal NodeJS Modules, that must be able to be required normally.

* `turtle.config`:
    This exposes the configuration for the application. Where any valid configuration key should be able
    to be requested like so `turtle.config.refreshTime`

* `turtle.dalek`:
    This API is where any tasks that need to be gracefully stopped should be put.
    If you need to run a function during the shutdown of your plugin or serve, add that function
    to the `dalek` registry like so `turtle.dalek.add(funcName)` and it will be called during the shutdown sequence.

    - `dalek.add(funcName)`:
        Adds the listed function into the `dalek` registry.
    - `dalek.now()`:
        Exterminates all functions listed within the `dalek` registry and shuts down the server.

* `turtle.web`:
    API Object for the different web related aspects.

    - `web.frontend`:

    - `web.backend`:

* `turtle.plugin`:

* `turtle.utils`:
    Exposes the many utility functions within `turtle`. With functions recommended for proper logging and so on.

    - `utils.log`:
        The recommended logging utility.

        - `utils.log.debugLog(value)`:
            The way to log debug statements, will only save/output if enabled in the user settings.
        - `utils.log.infoLog(value)`:
            Logs other none error statements, that are more important to be seen by admins.

    - `utils.timer`
        A baked in timing utility for `turtle`

        The timing utility comes with a few timers baked in, that allow plugins to easily respect the user settings.

        - "refresh"

        To setup a `refresh` timer use

        ```javascript
        turtle.utils.timer.on("refresh", function() {
          // Refresh cache, external data, so on
        });
        ```

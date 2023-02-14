const colors = require('colors');

module.exports = {
    PLAYING: colors.bold.green('[INFO]: Playing...'),
    INCORRECT_SETTINGS: colors.bold.red(`[INFO]: Username or password is not correct - ${colors.white('Go to VLC > Tools > Preferences > All > Main interfaces > Lua > Lua HTTP > Password')}`),
    NOTHING_PLAYING: colors.yellow(colors.bold.yellow("[INFO]:"), "Nothing currently playing..."),
    INVALID_IP: colors.red(colors.bold.red("[ERROR]:"), "Invalid IP Address..."),
    ERROR: colors.red(colors.bold.red("[ERROR]: "), colors.red("An error has occurred.\n")),
    CONFIG_RELOADED: colors.blue(colors.bold.blue("[INFO]: "), "Config file reloaded!\n"),
    VLC_ERROR: colors.red(colors.bold.red("[ERROR]:"), "Connection refused... check the settings.json"),
    NO_MOVIE_PLAYING: colors.yellow(colors.bold.yellow("[INFO]:"), "No movie currently playing..."),
    INCORRECT_PORT: colors.red(colors.bold.red("[ERROR]:"), "Incorrect port..."),
    CONNECTION_TIMEOUT: colors.red(colors.bold.red("[ERROR]:"), "Connection timed-out...")
}


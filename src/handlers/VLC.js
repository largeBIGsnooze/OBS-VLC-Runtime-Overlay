const request = require('request');
const status = require('../utils/status-messages')

module.exports = class VLC {
    static IS_PLAYING;
    static getJSON(options) {
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    switch (error.code) {
                        case 'ENOTFOUND': reject(status.INVALID_IP); break;
                        case 'ECONNREFUSED': reject(status.VLC_ERROR); break;
                        case 'ETIMEDOUT': reject(status.ERROR); break;
                        case 'ERR_SOCKET_BAD_PORT': reject(status.INCORRECT_PORT); break;
                        default: console.error(error.code); break;
                    }
                } else
                    try {
                        this.IS_PLAYING = true;
                        const data = JSON.parse(body)
                        if (!data)
                            reject(status.INVALID_IP)
                        if (data.state === 'stopped') {
                            this.IS_PLAYING = false;
                            reject(status.NO_MOVIE_PLAYING)
                        }

                        const title = data?.information?.category.meta.filename;
                        const curr = data?.time;
                        const len = data?.length;

                        //const playlist = data.children[0].children
                        //   .filter(movie => movie.type === 'leaf')
                        //   .map(movie => ({ movie: movie.name, duration: movie.duration })); 

                        // get currentMovie() {
                        //     return data.children[0].children.filter(movie => movie.current).shift().name
                        // }
                        resolve({
                            title: title,
                            time: VLC.getRuntime(curr),
                            length: VLC.getRuntime(len),
                            //playlist: playlist,
                            //currentMovie: currentMovie
                        })
                    } catch (_) {
                        reject(status.INCORRECT_SETTINGS)
                    }
            })
        })
    }


    static formatTitle = (title, settings) => {
        const PARENTHESES_ENABLED = (settings.surround_year_with_parentheses) ? title.replace(/(?!\()(\b\d{4}\b)(?!\))/g, '($1)') : title;
        const FILTERS = settings.filters.reduce((acc, filter) => acc.replaceAll(filter, ' '), PARENTHESES_ENABLED);
        return FILTERS.replace(/\s+/g, ' ')
    }

    static parseTags(tags, settings, callback) {
        try {
            let data = settings.format;
            for (const tag in tags) data = data.replace(tag, tags[tag])
            callback(data)
        } catch (_) {
            return;
        }
    }

    static getRuntime(time) {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = ('0' + (time % 60)).slice(-2);
        minutes = ('0' + (minutes % 60)).slice(-2);
        return { seconds, minutes, hours };
    }
    static HHmmss(h, m, s) {
        let delimiter = ':';
        if (h == 0) {
            delimiter = '';
            h = ''
        }
        return `${h}${delimiter}${m}:${s}`;
    }

    static handleError(error) {
        console.error(error.message);
    }

    static initTags(data, title) {
        return {
            "{title}": title,
            "{h:m:s}": VLC.HHmmss(data.time.hours, data.time.minutes, data.time.seconds),
            "{h:m:s-length}": VLC.HHmmss(data.length.hours, data.length.minutes, data.length.seconds),
            "{br}": "\n"
        };
    }

}
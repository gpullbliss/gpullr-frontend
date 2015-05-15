// moment.js locale configuration
// locale : abbreviation french (fr-short)

/* jshint ignore:start */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['moment'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory((typeof global !== 'undefined' ? global : this).moment); // node or other global
    }
}(function (moment) {
    return moment.defineLocale('fr-short', {
        months : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
        monthsShort : 'ja._f._mars_av._mai_juin_juil._ao._s._o._n._d.'.split('_'),
        weekdays : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysShort : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
        weekdaysMin : 'D_L_Ma_Me_J_V_S'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'LT:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY LT',
            LLLL : 'dddd D MMMM YYYY LT'
        },
        calendar : {
            sameDay: '[Aujourd\'hui à] LT',
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'dans %s',
            past : 'il y a %s',
            s : 'secs',
            m : '1 m',
            mm : '%d m',
            h : '1 h',
            hh : '%d h',
            d : '1 j',
            dd : '%d j',
            M : '1 M',
            MM : '%d M',
            y : '1 a',
            yy : '%d a'
        },
        ordinalParse: /\d{1,2}(er|)/,
        ordinal : function (number) {
            return number + (number === 1 ? 'er' : '');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
}));
/* jshint ignore:end */

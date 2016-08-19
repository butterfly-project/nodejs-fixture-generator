'use strict';

var _ = require('lodash');
var fs = require('fs');
var db = {
    firstname: JSON.parse(fs.readFileSync('text-generator/firstname.json', 'utf8')),
    lastname: JSON.parse(fs.readFileSync('text-generator/lastname.json', 'utf8')),
    loremipsum: JSON.parse(fs.readFileSync('text-generator/loremipsum.json', 'utf8'))
};

const getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};
const words = function (text, count) {
    return text.split(' ').slice(0, count).join(' ');
};
const addFirstNull = function (number) {
    number = number.toString();

    if (number.length < 2) {
        number = '0' + number;
    }

    return number;
};

module.exports = {
    words: function (count) {
        return words(db.loremipsum.long, count);
    },
    paragraph: function () {
        const
            countVariants = db.loremipsum.more.length,
            variant = getRandomInt(0, countVariants);

        return db.loremipsum.more[variant];
    },
    caption: function (countWords) {
        if (undefined === countWords) {
            countWords = getRandomInt(3, 10);
        }

        return words(this.paragraph(), countWords);
    },
    firstname: function (chars) {
        return undefined === chars
            ? db.firstname['all'][getRandomInt(0, db.firstname['all'].length)]
            : db.firstname[chars][getRandomInt(0, db.firstname[chars].length)];
    },
    lastname: function (chars) {
        return undefined === chars
            ? db.lastname['all'][getRandomInt(0, db.lastname['all'].length)]
            : db.lastname[chars][getRandomInt(0, db.lastname[chars].length)];
    },
    date: function (format) {
        const
            day = addFirstNull(getRandomInt(1, 31)),
            month = addFirstNull(getRandomInt(1, 13)),
            year = getRandomInt(1900, 2020);

        return _.replace(_.replace(_.replace(
            format, 'd', day),
            'm', month),
            'y', year);
    }
};

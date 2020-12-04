
const moment = require('moment')
const formatMessage = function(name,text,self=false){
    return {
        name,
        text,
        time: moment().format('hh:mm a'),
        self
    }
}

module.exports = formatMessage
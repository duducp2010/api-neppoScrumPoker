const dbuser = 'dudu';
const dbpassword = 'edinei6';
const database = 'teste-jwt';
const port = '61210';
const url_server = 'ds161210.mlab.com';

module.exports = {
    'url': 'mongodb://' + dbuser + ':' + dbpassword + '@' + url_server + ':' + port + '/' + database
    //'url': 'mongodb://localhost/neppo'
};
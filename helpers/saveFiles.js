const fs = require( 'fs' );


const path = './db/data.json';

const saveFiles = ( data ) => {

    fs.writeFileSync( path, JSON.stringify( data ));
};

const readFiles = () => {
    if( !fs.existsSync( path ) ) {
        return null;
    };
    const tasksList = fs.readFileSync( path, { encoding: 'utf-8' });
    const data = JSON.parse( tasksList );
    return data;
};

module.exports = {
    saveFiles,
    readFiles
};

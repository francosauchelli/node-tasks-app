require( 'colors' );

const messages = () => {

    return new Promise( resolve => {
        console.clear();
        
        console.log( '============================='.cyan );
        console.log( '      Choose an option'.cyan );
        console.log( '=============================\n'.cyan );
        
        console.log( `${ '1.'.cyan } Create task` );
        console.log( `${ '2.'.cyan } List tasks` );
        console.log( `${ '3.'.cyan } List completed tasks` );
        console.log( `${ '4.'.cyan } List pending tasks` );
        console.log( `${ '5.'.cyan } Completed task(s)` );
        console.log( `${ '6.'.cyan } Delete task` );
        console.log( `${ '0.'.cyan } Exit\n` );

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        
        readline.question('Choose an option:', ( opt ) =>{
            readline.close();
            resolve( opt );
        });
    });
};

const pause = () => {

    return new Promise( resolve => {
        
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        readline.question( `Press ${ 'ENTER'.green } to continue.`, () => {
            readline.close();
            resolve();
        });
    });
};

module.exports = {
    messages,
    pause
};
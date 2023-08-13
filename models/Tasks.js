const color = require( 'colors' );


const Task = require( './Task' );

class Tasks {
    _list = {};

    get listArr () {
        const list = [];

        Object.keys( this._list ).forEach( key => {
            const task = this._list[key];
            list.push( task );
        });
        return list;
    }

    constructor ( ) {
        this._list = {};
    };
    
    createTask ( description = '' ) {
        const task = new Task( description );
        this._list[ task.id ] = task;
    };

    deleteTask ( id = '' ) {
        if( this._list[ id ] ) {
            delete this._list[ id ]
        };
    };

    getTasksFromArray ( list = [] ) {
        list.forEach( task => {
            this._list[ task.id ] = task;
        });

        return this._list;
    };

    listTasks () {
        // let listedTasks = "You didn't create any task yet.";

        // if ( Object.keys( this._list ).length > 0 ) {
        //     listedTasks = '';

        //     /*  
        //         se podría haber utilizado this.listArr.forEach( task => ...)
        //         en ese caso, se podría trabajar directamente con la tarea y no con la llave,
        //         entonces se podría desestructurar, por ejemplo const { description } = task 
        //     */
        //     Object.keys( this._list ).forEach( ( key, i ) => {
        //         const index = i + 1;
        //         const description = this._list[ key ].description;
        //         const taskState = this._list[ key ].completedIn
        //                             ? 'completed'.green
        //                             : 'pending'.red;

        //         const colorState = this._list[ key ].completedIn ? color.green : color.red;

        //         listedTasks += `${ index }. `.green
        //             + `${ description }: ${ taskState }\n`;
        //     });
        // };

        // console.log( listedTasks );

        console.log();

        if( this.listArr.length = 0 ) return console.log( "You didn't complete any task yet." );

        this.listArr.forEach( ( task, i ) => {
            const index = i + 1;
            const { description, completedIn } = task;
            const state = completedIn
                            ? 'completed'.green
                            : 'pending'.red;

            console.log( `${ index }. `.green + `${ description }: ${ state }` );
        });
    };


    listPendingCompleted ( completed = true ) {
        console.log();

        if( this.listArr.length = 0 ) return console.log( "You didn't complete any task yet." );

        let index = 0;
        this.listArr.forEach( ( task ) => {

            const { description, completedIn } = task;

            if( completed ) {
                if( completedIn ) {
                    index += 1;
                    console.log( `${ index }. `.green + `${ description }: ${ completedIn.toString().green }` );
                    // también podría ser console.log( `${ index.toString().green }. ${ description }.` );
                    // también podría ser console.log( `${ ( index + '.' ).green } ${ description }.` );
                };
            } else {
                if( !completedIn ) {
                    index += 1;
                    console.log( `${ index }. `.green + `${ description }: ${ 'pending'.red }` );
                };
            };
        });
    };

    toggleCompletePending( ids = [] ) {

        let completeCounter = 0;
        ids.forEach( id => {

            const task = this._list[ id ];
            if( !task.completedIn ) {
                task.completedIn = new Date().toISOString();
                completeCounter += 1;
            };

        });

        let pendingCounter = 0;
        this.listArr.forEach( task => {
            if( !ids.includes( task.id ) ) {
                if( task.completedIn !== null ) pendingCounter += 1;
                this._list[ task.id ].completedIn = null;
            };
        });

        if( completeCounter > 0 ) {
            console.log( `${ completeCounter.toString().yellow } new task(s) ${ 'completed'.green }` );
        };
        if( pendingCounter > 0 ) {
            console.log( `${ pendingCounter.toString().yellow } task(s) changed to ${ 'pending'.red }` );
        };
    };
};

module.exports = Tasks;
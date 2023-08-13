// const { messages, pause } = require( './helpers/messages' );
const { 
    confirmation,
    deleteTaskById,
    describeTask, 
    inquirerMenu,
    pause,
    showCheckList,
} = require( './helpers/inquirerMenu.js' );
const { saveFiles, readFiles } = require( './helpers/saveFiles.js' );

const Tasks = require('./models/Tasks.js');


const main = async() => {

    let opt = '';

    // Task instance
    const tasks = new Tasks();
    console.log( tasks );

    const tasksDB = readFiles();

    if( tasksDB ) {
        tasks.getTasksFromArray( tasksDB );
        
    };

    
    do {
        // Prints menu
        // options created with npm inquire
        opt = await inquirerMenu();

        // options created manually
        // opt = await messages();
        
        switch ( opt ) {
            case '1':
                const description = await describeTask();
                tasks.createTask( description );

                break;

            case '2':
                tasks.listTasks() ;
                break;
            
            case '3':
                tasks.listPendingCompleted( true );
                break;
            
            case '4':
                tasks.listPendingCompleted( false );
                break;

            case '5':
                const ids = await showCheckList( tasks.listArr );
                await tasks.toggleCompletePending( ids );
                break;

            case '6':
                const taskId = await deleteTaskById( tasks.listArr );

                if( taskId !== '0' ) {
                    const deletingConfirm = await confirmation( 'Are you sure?' );
                    if( deletingConfirm ) {
                        tasks.deleteTask( taskId );
                        console.log( 'Task deleted.' );
                    };
                };

                break;
        };

        saveFiles( tasks.listArr );

        await pause();

    } while ( opt !== '0' );
}

main();
const inquirer = require( 'inquirer' );
require( 'colors' );

const choices = [
    {
        name: `${ '1.'.cyan } Create task`,
        value: '1'
    },
    {
        name: `${ '2.'.cyan } List tasks`,
        value: '2'
    },
    {
        name: `${ '3.'.cyan } List completed tasks`,
        value: '3'
    },
    {
        name: `${ '4.'.cyan } List pending tasks`,
        value: '4'
    },
    {
        name: `${ '5.'.cyan } Completed task(s)`,
        value: '5'
    },
    {
        name: `${ '6.'.cyan } Delete task`,
        value: '6'
    },
    {
        name: `${ '7.'.cyan } Exit`,
        value: '0'
    }
];


const inquirerMenu = async() => {
    
    console.clear();
    
    console.log( '============================='.cyan );
    console.log( '      Choose an option' );
    console.log( '=============================\n'.cyan );
    
    const mainMenu = [
        {
            type: 'list',
            name: 'option',
            message: 'What do you want to do?',
            choices: choices
        }
    ];

    const { option } = await inquirer.prompt( mainMenu );
    return option;
};


const describeTask = async() => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message: 'Enter a task:',
            validate( value ) {
                if( value.length < 3 ) {
                    return 'You must enter at least 3 characters.'
                }
                return true;
            }
        }
    ];

    const { description } = await inquirer.prompt( question );
    return description;
};

const deleteTaskById = async( tasksList ) => {
    console.log();
    
    const choices = tasksList.map( ( task, i ) => {
        const index = ( i + 1 );
        return {
            name: `${ ( index + '.').green } ${ task.description }`,
            value: task.id
        };
    });
    
    choices.unshift({
        name: `${ '0.'.green } Cancelar`,
        value: '0'
    });


    const deleteMenu = [
        {
            type: 'list',
            name: 'id',
            message: 'Wich task do you want to delete?',
            choices
        }
    ];
    
    const { id } = await inquirer.prompt( deleteMenu );
    return id;
};

const showCheckList = async( tasksList = [] ) => {
    console.log();
    
    const choices = tasksList.map( ( task, i ) => {
        const index = ( i + 1 );
        return {
            checked: task.completedIn ? true : false,
            name: `${ ( index + '.').green } ${ task.description }`,
            value: task.id
        };
    });

    const checkList = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select the completed tasks.',
            choices
        }
    ];
    
    const { ids } = await inquirer.prompt( checkList );
    return ids;
};

const confirmation = async( message = '' ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        }
    ];

    const { ok } = await inquirer.prompt( question );
    return ok;
};

const pause = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${ 'ENTER'.green } to continue.`
        }
    ]

    console.log( '\n' );
    await inquirer.prompt( question );
};

module.exports = {
    confirmation,
    describeTask,
    deleteTaskById,
    inquirerMenu,
    pause,
    showCheckList,
};
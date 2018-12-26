const  EventEmitter = require("events");

class Server extends EventEmitter {
    constructor(client) {
        super();
        this.idCount = 0;
        this.tasks = [];
        process.nextTick(() => {
            this.emit('response', 'Type a command (help to list commands)');  
        });

        client.on('command', (command, args) => {

            switch(command) {
                case 'help':
                case 'ls':
                case 'add':
                case 'delete':
                    this[command](args);
                    break;
                default:
                this.emit('response', 'Unknown command for help enter "help" command');
            }
        });
    }
    help(){
        this.emit('response', `Available Commands :
        add task
        ls
        delete :id`);
    }
    add(args){

        this.tasks.push({id: this.idCount, content: args.join(' ')});
        this.idCount++;
        this.emit('response', 'task added : '+ args.join(' '));
    }
    ls(){
        this.emit('response',this.getTasksAsString());
    }
    delete(args){
        this.tasks = this.tasks.filter(item => item.id != args[0]);
        this.emit('response', 'task with id '+ args[0]+ ' deleted');
    }
    getTasksAsString() {
        if(this.tasks.length === 0 )return 'No Tasks To Show';
        return this.tasks.reduce( (acc, item) => {
            return acc +item.id + ' : ' + item.content + '\n';
        }, '');
    }
}

module.exports = (client) => new Server(client);
const fs = require('fs');
const EventEmitter = require('events');


class WithLogs extends EventEmitter {
    start(asyncFunc, ...args) {
        this.emit('started');
        asyncFunc( ...args, (err, data) => {
            if(err) {
                return this.emit('error', err);
            }
            this.emit('data', data);
            this.emit('end');
        });
    }

}

const withTime = new WithLogs();
withTime.on('started', () => console.log('started'));
withTime.on('data', (data) => {
    console.log(data);
});
withTime.on('end', () => console.log('end'));

withTime.start(fs.readFile, './hey.txt');
setInterval(() =>{},500);

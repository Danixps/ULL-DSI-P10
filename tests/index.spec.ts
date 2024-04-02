import {expect} from 'chai';
import 'mocha';
import {connect} from 'net';
import {EventEmitter} from 'events';
import {MessageEventEmitterClient} from '../src/eventEmitterClient.js';

describe('MessageEventEmitterClient', () => {
  it('Should emit a message event once it gets a complete message', (done) => {
    const socket = new EventEmitter();
    const client = new MessageEventEmitterClient(socket);

    client.on('message', (message) => {
      expect(message).to.be.eql({ 'type': 'command', 'content': 'ls' });
      expect(message).to.be.eql({ 'type': message.type, 'content': message.content });
      done();
    });

    socket.emit('data', '{"type": "command" ');
    socket.emit('data', ', "content": "ls"}');
    socket.emit('data', '\n');
  });
});
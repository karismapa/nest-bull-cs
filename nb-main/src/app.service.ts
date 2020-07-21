import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class AppService {
    constructor(@InjectQueue('message') private messageQueue: Queue) {}
    
    async sendMessage() {
        // const msg = Array(100).fill({ foo: 'bar' })

        const msg = []
        for (let i = 0; i < 3; i++) {
            msg.push({ foo: 'bar', num: i })
        }
        for(const payload of msg) {
            await this.messageQueue.add(payload)
        }

        this.messageQueue.on('completed', () => { console.log('DONE GAN') })
    }

    async sendNamedMessage() {
        await this.messageQueue.add('namedTopic', {
            foo: 'namedBar'
        })
    }
}

import { Injectable } from '@nestjs/common';
import { Queue, Job } from 'bull';
import { InjectQueue, OnQueueCompleted, OnQueueEvent, BullQueueEvents } from '@nestjs/bull';

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

        // this.messageQueue.on('global:completed', () => { console.log('DONE GAN') })
    }

    @OnQueueCompleted()
    async completedGan() {
        console.log('DONEEEEE')
    }

    @OnQueueEvent('global:completed')
    onCompleted(job: Job) {
        // this.logger.log(
        // `Completed job ${job.id} of type ${job.name} with result ${job.returnvalue}`,
        // );

        console.log(`Completed job ${job.id} of type ${job.name} with result ${job.returnvalue}`)
    }

    async sendNamedMessage() {
        await this.messageQueue.add('namedTopic', {
            foo: 'namedBar'
        })
    }
}

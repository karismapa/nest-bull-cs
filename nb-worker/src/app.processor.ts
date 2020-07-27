import { Processor, Process, InjectQueue, OnQueueCompleted, OnQueueEvent, BullQueueEvents } from "@nestjs/bull";
import { Job, Queue } from 'bull';

@Processor('message')
export class AppConsumer {
    constructor(@InjectQueue('message') private messageQueue: Queue) {}

    @Process()
    async transcode(job: Job<unknown>) {
        console.log(job.data)
        
        console.log(`${JSON.stringify(job.data)} done`)

        return 'someRETURNVALUE';
    }

    @Process('namedTopic')
    async transcodeNT(job: Job<unknown>) {
        console.log(`${JSON.stringify(job.data)}, topic: namedTopic`)
        await this.messageQueue.add(job.data)
    }

    // @OnQueueCompleted()
    // async completedGan() {
    //     console.log('DONEEEEE')
    // }

    sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    @OnQueueEvent(BullQueueEvents.COMPLETED)
    onCompleted(job: Job) {
        // this.logger.log(
        // `Completed job ${job.id} of type ${job.name} with result ${job.returnvalue}`,
        // );

        console.log(`Completed job ${job.id} of type ${job.name} with result ${job.returnvalue}`)
    }

    // @OnQueueActive()
    // onActive(job: Job) {
    //     console.log(
    //     `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    //     );
    // }
}
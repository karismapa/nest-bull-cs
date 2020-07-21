import { Processor, Process, OnQueueActive, InjectQueue } from "@nestjs/bull";
import { Job, Queue } from 'bull';

@Processor('message')
export class AppConsumer {
    constructor(@InjectQueue('message') private messageQueue: Queue) {}

    @Process()
    async transcode(job: Job<unknown>) {
        console.log(job.data)
        
        // let progress = 0;
        // for (let i = 0; i < 100; i++) {
        //     // await doSomething(job.data);
        //     progress += 10;
        //     job.progress(progress);
        // }

        // await this.sleep(1000)
        
        console.log(`${JSON.stringify(job.data)} done`)

        // job.remove().catch(err => console.log(err)) 
        

        return {};
    }

    @Process('namedTopic')
    async transcodeNT(job: Job<unknown>) {
        console.log(`${JSON.stringify(job.data)}, topic: namedTopic`)
        await this.messageQueue.add(job.data)
    }

    sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    // @OnQueueActive()
    // onActive(job: Job) {
    //     console.log(
    //     `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    //     );
    // }
}
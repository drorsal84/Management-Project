export class Job{

    constructor(
        public jobId: number,
        public jobNumber: number,
        public custName: string,
        public custAddress: string,
        public jobDescription: string,
        public jobOrigin: string,
        public jobType: string,
        public jobRemarks: string,
        public matCost: number,
        public laborCost: number,
        public custPayment: number,
        public profit: number,
        public profitPerc: number,
        public dateOfOffer: Date,
        public dateOfInstall: Date,
        public dateOfCompleat: Date,
        public jobStage: string,
        public jobReceived: boolean,
        public jsonJobProducts: Job[] = [],
    )
    {}
}
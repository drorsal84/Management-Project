export class Offer{

    constructor(
        public offerId: number,
        public offerNumber: number,
        public offerCustName: string,
        public offerCustAddress: string,
        public offerDescription: string,
        public offerOrigin: string,
        public offerType: string,
        public offerRemarks: string,
        public offerCustPayment: number,
        public dateOfOffer: Date,
        public offerStage: string,
        public offerReceived: boolean,
        public jsonOfferProducts: Offer[] = [],
    )
    {}
}
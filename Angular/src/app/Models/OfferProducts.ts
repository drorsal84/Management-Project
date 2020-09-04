export class OfferProduct{

    constructor(
        public offerProductId : number, // Used for sql database
        public offerProductNumber : number,
        public offerProductName : string,
        public offerProductQuantity : number,
        public offerProductCost : number,
        public offerProductSubtotal : number,
        public oId ? : number,
    )
    {}

    
}
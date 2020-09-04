export class JobProduct{

    constructor(
        public jobProductId : number, // Used for sql database
        public jobProductNumber : number,
        public jobProductName : string,
        public jobProductQuantity : number,
        public jobProductCost : number,
        public jobProductSubtotal : number,
        public jId ? : number,
        public jobProductInst ? : string,
       // public jobProdTotal ? : number,
    )
    {}

    
}
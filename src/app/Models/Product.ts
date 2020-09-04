export class Product{

    constructor(
        public productId: number,
        public productCat: string,
        public productName: string,
        public productColor: string,
        public productManuf: string,
        public productCatalogNum: string,
        public productQuan: number,
        public productOnSaleQuan: number,
        public productCost: number,
        public productOnSaleCost: number,
        public productTotalCost: number,
        public productOnSaleTotalCost: number,
        public productCombinedTotalCost: number,
        public productImgFile: string,
    )
    {}
}
export default interface Product {
    id?: string;
    name?: string;
    detail?: string;
    unitPrice?: number;
    bundleSizes?: string; // Comma-separated string, e.g., "6,12,24"
    bundlePrice?: number;
    img?: string;
    stock?: number;
}
export interface GetItemsRequestModel {
    name?: string;
    category?: string;
    tag?: string;
    LastEvaluatedKey?: {[key: string]: any};
    dateDirection?: 'latest' | 'oldest'
}
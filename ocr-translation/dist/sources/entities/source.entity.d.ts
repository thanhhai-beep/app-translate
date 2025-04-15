export declare enum SourceType {
    MANGADEX = "MANGADEX",
    MANGABAT = "MANGABAT",
    MANGAFOX = "MANGAFOX",
    MANMANAPP = "MANMANAPP",
    CUSTOM = "CUSTOM"
}
export declare class Source {
    id: string;
    name: string;
    type: SourceType;
    baseUrl: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

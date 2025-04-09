export declare enum CredentialType {
    GOOGLE_CLOUD = "GOOGLE_CLOUD",
    AWS = "AWS",
    FIREBASE = "FIREBASE",
    OTHER = "OTHER"
}
export declare class Credential {
    id: string;
    type: CredentialType;
    name: string;
    config: Record<string, any>;
    isActive: boolean;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

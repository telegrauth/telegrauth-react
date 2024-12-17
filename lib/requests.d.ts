export declare const defaultInitRequest: (authServer: string) => (appId: string, state?: string) => Promise<any>;
export declare const defaultStateRequest: (authServer: string) => (requestId: string) => Promise<{
    code: any;
    state: any;
    fixedCallbackUrl: any;
    successUrl: any;
    failUrl: any;
} | null>;

export type InitRequestFn = (appId: string, state?: string) => Promise<{
    botName: string;
    authRequestId: string;
}>;
export type StateRequestFn = (requestId: string) => Promise<{
    code: string;
    state: string | null;
    fixedCallbackUrl?: string | null;
    successUrl?: string | null;
    failUrl?: string | null;
} | null>;

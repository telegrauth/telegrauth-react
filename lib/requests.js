export const defaultInitRequest = (authServer) => async (appId, state) => {
    const qs = new URLSearchParams(typeof state !== 'undefined' ? { appId, state } : { appId });
    const rawResponse = await fetch(`${authServer}/init?${qs.toString()}`);
    const response = await rawResponse.json();
    if (response.result) {
        return response.data;
    }
    else {
        throw new Error(response.error);
    }
};
export const defaultStateRequest = (authServer) => async (requestId) => {
    const qs = new URLSearchParams({ requestId });
    const rawResponse = await fetch(`${authServer}/state?${qs.toString()}`);
    const response = await rawResponse.json();
    if (response.result) {
        if (response.data.code) {
            return {
                code: response.data.code,
                state: typeof response.data.state !== 'undefined' ? response.data.state : null,
                fixedCallbackUrl: response.data.fixedCallbackUrl ?? undefined,
                successUrl: response.data.successUrl ?? undefined,
                failUrl: response.data.failUrl ?? undefined,
            };
        }
        else {
            return null;
        }
    }
    else {
        throw new Error(response.error);
    }
};
//# sourceMappingURL=requests.js.map
export function deDefaultify<T>(module: T): T {
    const anyModule: any = module;
    if (anyModule.__useDefault) {
        return anyModule.default as T;
    }

    return module;
}
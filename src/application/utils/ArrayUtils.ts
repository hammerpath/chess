export const unfold = (f: (next: any, done : () => any, state : any) => any, initState: any): Array<any> =>
    f((value: any, nextState: any) => [value, ...unfold(f, nextState)],
        () => [],
        initState
    );
export const debounce = (fn: Function, ms = 300) => {
    let timer: ReturnType<typeof setTimeout>;

    return function (this: any, ...args: any[]) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), ms);
    };
};

function accurateInterval(fn: any, time: number) {
    let cancel: any, nextAt: number, timeout: any, wrapper: any, _ref: any[];
    nextAt = new Date().getTime() + time;
    timeout = null;
    if (typeof time === 'function') _ref = [time, fn], fn = _ref[0], time = _ref[1];
    wrapper = ():any =>{
        nextAt += time;
        timeout = setTimeout(wrapper, nextAt - new Date().getTime());
        return fn();
    };
    cancel = ():void =>{
        return clearTimeout(timeout);
    };
    setTimeout(wrapper, nextAt - new Date().getTime());
    return {
        cancel: cancel
    };
}

export default accurateInterval;


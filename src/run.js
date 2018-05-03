const Kefir = require('kefir');

const $$cmd = Symbol('brk.cmd');
const deltaToStream = (state$, action$) => delta => delta(state$, action$);

module.exports = function run(reducer, initial, deltas) {
    const loop = {
        running: false,
        queue: [],
        state: initial
    };

    const state$ = new Kefir.Property();
    const action$ = new Kefir.stream();

    const deltas$ = Kefir.merge(deltas.map(deltaToStream(state$, action$)));

    const dispatch = action => {
        if (!loop.running) {
            loop.running = true;
            const result = reducer(loop.state, action);

            if (result[$$cmd]) {
                const [state, action] = result;
                loop.queue.push(() => dispatch(action));
                loop.state = state;
            } else {
                loop.state = result;
            }

            state$._emitValue(loop.state);
            action$._emitValue(action);
            loop.running = false;

            while (loop.queue.length > 0) {
                loop.queue.pop()();
            }
        } else {
            loop.queue.push(() => dispatch(action));
        }
    }

    const sub = deltas$.observe(dispatch);

    return function stop() {
        sub.unsubscribe();
    };
};

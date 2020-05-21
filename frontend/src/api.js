import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');

export function getSwimmersList(cb) {
    socket.emit("call", {
        action: "swimmers.list"
    }, cb);

    socket.on("swimmers-updated", cb);

    return;
};

export function addSwimmer(params) {
    socket.emit("call", {
        action: "swimmers.add",
        params,
    });

    return;
};

export function updateSwimmer(params) {
    socket.emit("call", {
        action: "swimmers.update",
        params,
    });

    return;
};

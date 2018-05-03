import Kefir from 'kefir';
import appleLoader from '../appleLoader';

export default io => (action$, state$) => Kefir.stream(emitter => {
    const players = [];
    const appleData = appleLoader.load();
    const apples = appleData.apples;
    const appleCollisionCoords = appleData.appleCollisionCoords;
    const eatenApples = [];
    const appleScoreValue = 10;

    io.on('connection', socket => {
        socket.on('join game', playerState => {
            const player = playerState;
            player.id = players.length;
            players.push(player);
            socket.emit('set player id', player.id);
            socket.emit('init apples', apples);

            console.log(`Player ${player.id} joined.`);
            socket.broadcast.emit('player joined', player);
            socket.broadcast.emit('player list update', players);
        });

        socket.on('update player state', playerState => {
            players[players.findIndex(player => player.id === playerState.id)] = playerState;

            // Check if apple was eaten
            const appleCollision = appleCollisionCoords[`${playerState.positionX}.${playerState.positionY}`];
            if (appleCollision && eatenApples.findIndex(appleId => appleCollision.appleId === appleId) === -1) {
                console.log(`Apple ${appleCollision.appleId} was eaten!`);
                eatenApples.push(appleCollision.appleId);
                apples.splice(apples.findIndex(apple => apple.id === appleCollision.appleId), 1);
                playerState.score += appleScoreValue;
                socket.emit('update score', playerState.score);
                socket.emit('init apples', apples);
                socket.broadcast.emit('init apples', apples);
            }

            socket.broadcast.emit('player list update', players);
        });

        // Disconnect logic
        socket.on('disconnect', playerState => {
            socket.emit('player disconnected', playerState);
            players.splice(players.findIndex(player => player.id === playerState.id), 1);
            socket.broadcast.emit('player list update', players);
        });
    });
})

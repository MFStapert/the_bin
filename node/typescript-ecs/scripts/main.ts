import { Game } from './game';

window.onload = () => {
    setInterval(() => {
        Game.getInstance().update();
    }, 1);
};

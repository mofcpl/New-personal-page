import "./main.scss";
import "./fontello/css/fontello.css"

import {world} from "./fireflies"

console.log("Hello");

const worldOfFlies = new world("canvas")
worldOfFlies.grow();
worldOfFlies.run();
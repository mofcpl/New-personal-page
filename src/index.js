

import "./main.scss";
import "./fontello/css/fontello.css"

import {world} from "./fireflies"
import "./subpages"
import "./contact"

const worldOfFlies = new world("canvas")
worldOfFlies.grow();
worldOfFlies.run();


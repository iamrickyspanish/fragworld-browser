/// <reference types="node" />

import { IncomingMessage } from "http";

declare function query(req: IncomingMessage): any;
export default query;

// declare module "micro-query" {
// }

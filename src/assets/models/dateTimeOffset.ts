import { deDefaultify  } from "../lib/utils";
import * as m from "moment";

export interface DateTimeOffset {
    date: Date;
    offset: number;
}

export function Now(): DateTimeOffset {
    const moment = deDefaultify(m);

    return {
        date: moment().toDate(),
        offset: moment().utcOffset()
    };
}

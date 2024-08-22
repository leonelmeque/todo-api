import { CorsOptions } from 'cors';
import { constants } from './constants';

export const corsOptions: CorsOptions = {
  origin: function(origin, callback) {
    let corsOptions: unknown;

    if (constants.WHITELIST.indexOf(origin || "") !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }

    callback(null, corsOptions as Parameters<typeof callback>[1])
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: '*',
}

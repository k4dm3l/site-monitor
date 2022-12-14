export default class Cors {
  static setCorsConfiguration() {
    const corsOptions = {
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'Authorization',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Credentials',
        'x-company-id',
      ],
      credentials: true,
      methods: ['POST', 'PUT', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
      origin: '*',
      preflightContinue: false,
    };

    return corsOptions;
  }
}

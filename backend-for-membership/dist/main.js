"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const allowedOrigins = ['http://127.0.0.1:3000', 'http://127.0.0.1:3001'];
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: allowedOrigins,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    });
    await app.listen(9090);
}
bootstrap();
//# sourceMappingURL=main.js.map
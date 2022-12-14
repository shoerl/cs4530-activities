import Express from 'express';
import * as http from 'http';
import CORS from 'cors';
import swaggerUi from 'swagger-ui-express';
import { ValidateError } from 'tsoa';
import fs from 'fs/promises';
import { RegisterRoutes } from '../generated/routes';
import { initialize } from './transcriptManager';
export class InvalidParametersError extends Error {
    message;
    constructor(message) {
        super(message);
        this.message = message;
    }
}
const app = Express();
app.use(CORS());
const server = http.createServer(app);
initialize();
app.use(Express.json());
app.use('/docs', swaggerUi.serve, async (_req, res) => {
    const swaggerSpec = await fs.readFile('generated/swagger.json', 'utf-8');
    return res.send(swaggerUi.generateHTML(JSON.parse(swaggerSpec)));
});
RegisterRoutes(app);
app.use((err, _req, res, next) => {
    if (err instanceof ValidateError) {
        return res.status(422).json({
            message: 'Validation Failed',
            details: err?.fields,
        });
    }
    if (err instanceof InvalidParametersError) {
        return res.status(400).json({
            message: 'Invalid parameters',
            details: err?.message
        });
    }
    if (err instanceof Error) {
        console.trace(err);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
    return next();
});
server.listen(process.env.PORT || 8081, () => {
    const address = server.address();
    console.log(`Listening on ${address.port}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRXhCLE9BQU8sU0FBUyxNQUFNLG9CQUFvQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckMsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzdCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFakQsTUFBTSxPQUFPLHNCQUF1QixTQUFRLEtBQUs7SUFDeEMsT0FBTyxDQUFTO0lBRXZCLFlBQW1CLE9BQWU7UUFDaEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztDQUNGO0FBSUQsTUFBTSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7QUFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ2hCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFdEMsVUFBVSxFQUFFLENBQUM7QUFHYixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBR3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQXFCLEVBQUUsR0FBcUIsRUFBRSxFQUFFO0lBQ3ZGLE1BQU0sV0FBVyxHQUFHLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN6RSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuRSxDQUFDLENBQUMsQ0FBQztBQUdILGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUdwQixHQUFHLENBQUMsR0FBRyxDQUNMLENBQ0UsR0FBWSxFQUNaLElBQXFCLEVBQ3JCLEdBQXFCLEVBQ3JCLElBQTBCLEVBQ0QsRUFBRTtJQUMzQixJQUFJLEdBQUcsWUFBWSxhQUFhLEVBQUU7UUFDaEMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMxQixPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTTtTQUNyQixDQUFDLENBQUM7S0FDSjtJQUNELElBQUcsR0FBRyxZQUFZLHNCQUFzQixFQUFDO1FBQ3ZDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDMUIsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixPQUFPLEVBQUUsR0FBRyxFQUFFLE9BQU87U0FDdEIsQ0FBQyxDQUFBO0tBQ0g7SUFDRCxJQUFJLEdBQUcsWUFBWSxLQUFLLEVBQUU7UUFDeEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzFCLE9BQU8sRUFBRSx1QkFBdUI7U0FDakMsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxPQUFPLElBQUksRUFBRSxDQUFDO0FBQ2hCLENBQUMsQ0FDRixDQUFDO0FBR0YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsR0FBRyxFQUFFO0lBQzNDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQWlCLENBQUM7SUFFaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUMsQ0FBQyxDQUFDLENBQUMifQ==
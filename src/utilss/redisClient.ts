import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

redisClient.connect()
.then(() => {
  console.log('Connected to Redis');
})
.catch((err) => {
  console.error('Failed to connect to Redis:', err);
});


export default redisClient;
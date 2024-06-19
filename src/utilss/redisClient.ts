import { createClient } from 'redis';

const redisClient = createClient({
  url: `${process.env.REDIS_URL}:${process.env.REDIS_PORT}`
});

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

(async () => {
  await redisClient.connect()
  .then(() => {
    console.log('Connected to Redis');
  })
  .catch((err) => {
    console.error('Failed to connect to Redis:', err);
  });
})();


export default redisClient;
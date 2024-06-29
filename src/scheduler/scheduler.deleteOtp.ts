import cron from "node-cron";
import prisma from '../../prisma/prisma';

const deleteExpiredOtps = async () => {
  try {
    await prisma.oTP.deleteMany({
      where: {
        expiredAt: {
          lt: new Date(),
        },
      },
    });
    console.log('Expired OTPs deleted successfully');
  }
  catch (error) {
    console.error('Error deleting expired OTPs:', error);
  }
};

// For testing '* * * * *'
cron.schedule('0 * * * *', deleteExpiredOtps);


export default deleteExpiredOtps;
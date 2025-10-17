const express = require('express');
const router = express.Router();

// Import route modules
const userRoutes = require('./routes/User/user.routes.js');
const roleRoutes = require('./routes/Master/role.routes.js');
const countryRoutes = require('./routes/Master/country.routes.js');
const stateRoutes = require('./routes/Master/state.routes.js');
const cityRoutes = require('./routes/Master/city.routes.js');
const categoryRoutes = require('./routes/Master/category.routes.js');
const appCategoryRoutes = require('./routes/Master/app_category.routes.js');
const walletRoutes = require('./routes/Master/wallet.routes.js');
const classShareUserRoutes = require('./routes/Master/class_share_user.routes.js');
const classViewUserRoutes = require('./routes/Master/class_view_user.routes.js');
const classJoinUserRoutes = require('./routes/Master/class_join_user.routes.js');

// Import Astrologer route modules
const bookingAstrologerRoutes = require('./routes/Astrologer/booking_astrologer.routes.js');
const astrologerClassRoutes = require('./routes/Astrologer/astrologer_class.routes.js');

// Import Admin route modules
const otpTypeRoutes = require('./routes/Master/otp_type.routes.js');
const otpRoutes = require('./routes/Master/otp.routes.js');
const statusRoutes = require('./routes/Master/status.routes.js');
const notificationTypeRoutes = require('./routes/Master/notification_type.routes.js');
const notificationRoutes = require('./routes/Master/notification.routes.js');

// Import new route modules
const horoscopeQuizRoutes = require('./routes/Master/horoscope_quiz.routes.js');
const horoscopeQuizMapUserRoutes = require('./routes/User/horoscope_quiz_map_user.routes.js');
const giftRoutes = require('./routes/Master/gift.routes.js');
const horoscopeQuizClaimGiftRoutes = require('./routes/Master/horoscope_quiz_claim_gift.routes.js');
const planRoutes = require('./routes/Master/plan.routes.js');
const planSubscriptionByUserRoutes = require('./routes/Master/plan_subscription_by_user.routes.js');

// Import Master route modules

// Import middleware
const { sendSuccess } = require('../utils/response.js');

/**
 * @route   GET /api
 * @desc    API health check
 * @access  Public
 */
router.get('/', (req, res) => {
  sendSuccess(res, {
    message: 'Welcome to Node.js API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString()
  }, 'API is running successfully');
});

/**
 * @route   GET /api/health
 * @desc    Health check endpoint
 * @access  Public
 */
router.get('/health', (req, res) => {
  sendSuccess(res, {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: new Date().toISOString(),
    environment: 'development'
  }, 'Health check passed');
});

// Mount route modules
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/countries', countryRoutes);
router.use('/states', stateRoutes);
router.use('/cities', cityRoutes);

// Mount Admin route modules
router.use('/master/otp-types', otpTypeRoutes);
router.use('/master/otps', otpRoutes);
router.use('/master/status', statusRoutes);
router.use('/master/notification-types', notificationTypeRoutes);
router.use('/master/notifications', notificationRoutes);

// Mount Master route modules
router.use('/master/category', categoryRoutes);
router.use('/master/app-category', appCategoryRoutes);
router.use('/master/wallet', walletRoutes);
router.use('/master/class-share-user', classShareUserRoutes);
router.use('/master/class-view-user', classViewUserRoutes);
router.use('/master/class-join-user', classJoinUserRoutes);

// Mount new Master route modules
router.use('/master/horoscope-quiz', horoscopeQuizRoutes);
router.use('/master/gift', giftRoutes);
router.use('/master/horoscope-quiz-claim-gift', horoscopeQuizClaimGiftRoutes);
router.use('/master/plan', planRoutes);
router.use('/master/plan-subscription-by-user', planSubscriptionByUserRoutes);

// Mount new User route modules
router.use('/users/horoscope-quiz-map-user', horoscopeQuizMapUserRoutes);

// Mount Astrologer route modules
router.use('/astrologer/booking', bookingAstrologerRoutes);
router.use('/astrologer/class', astrologerClassRoutes);

module.exports = router;

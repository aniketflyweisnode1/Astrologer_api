const express = require('express');
const router = express.Router();
// Import controllers
const { createUser, getAllUsers, getUserById, updateUser, updateUserByIdBody, deleteUser, login, logout, getProfile, updateProfile, changePassword, sendOTP, verifyOTP, updateNotificationSettings, updatePrivacySettings } = require('../../controllers/user.controller'); 
  // Import middleware
const { auth, authRateLimit } = require('../../../middleware/auth');
const { validateBody, validateQuery, validateParams } = require('../../../middleware/validation');
// Import validators
const { createUserSchema, updateUserSchema, updateUserByIdBodySchema, loginSchema, getUserByIdSchema, getAllUsersSchema, changePasswordSchema, sendOTPSchema, verifyOTPSchema, updateNotificationSettingsSchema, updatePrivacySettingsSchema } = require('../../../validators/user.validator');




router.post('/create',  validateBody(createUserSchema), createUser);
router.post('/login', authRateLimit, validateBody(loginSchema), login);
router.post('/logout', auth, logout);
// OTP-based login routes
router.post('/send-otp', authRateLimit, validateBody(sendOTPSchema), sendOTP);
router.post('/verify-otp', authRateLimit, validateBody(verifyOTPSchema), verifyOTP);
router.get('/getAll',  getAllUsers);
router.get('/getProfile', auth, getProfile);
router.put('/updateProfile', auth, validateBody(updateUserSchema), updateProfile);    
router.put('/changePassword', auth, validateBody(changePasswordSchema), changePassword);   
router.get('/getUserById/:id', auth, validateParams(getUserByIdSchema), getUserById);
router.put('/updateUserById', auth, validateBody(updateUserByIdBodySchema), updateUserByIdBody);
router.delete('/deleteUserById/:id',  auth, validateParams(getUserByIdSchema), deleteUser);
router.put('/updateNotificationSettings', auth, validateBody(updateNotificationSettingsSchema), updateNotificationSettings);
router.put('/updatePrivacySettings', auth, validateBody(updatePrivacySettingsSchema), updatePrivacySettings);

module.exports = router;

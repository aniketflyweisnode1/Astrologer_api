const express = require('express');
const router = express.Router();

const { 
  getAllWallets, 
  getWalletById, 
  getWalletByAuth, 
  deleteWallet 
} = require('../../controllers/wallet.controller');

const { getWalletByIdSchema, getAllWalletsSchema } = require('../../../validators/wallet.validator');
const { auth } = require('../../../middleware/auth');
const { validateQuery, validateParams } = require('../../../middleware/validation');

// Get all wallets
router.get('/getAll', validateQuery(getAllWalletsSchema), getAllWallets);

// Get wallet by ID (with auth)
router.get('/getWalletById/:id', auth, validateParams(getWalletByIdSchema), getWalletById);

// Get wallet by authenticated user (with auth)
router.get('/getWalletByAuth', auth, getWalletByAuth);

// Delete wallet by ID (with auth)
router.delete('/deleteWalletById/:id', auth, validateParams(getWalletByIdSchema), deleteWallet);

module.exports = router;


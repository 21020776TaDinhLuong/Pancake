import express from 'express'
const router = express.Router()
import {
getCares,
updateCare,
deleteCare,
createCare,
getCareById
} from '../controllers/careController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getCares).post(protect, createCare)
router
  .route('/:id')
  .get(getCareById)
  .delete(protect, deleteCare)
  .put(protect, updateCare)


export default router

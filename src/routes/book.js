import * as controllers from '../controllers'
import express from 'express'
import verifyToken from '../middleware/verify_token'
import { isCreatorOrAdmin } from '../middleware/verify_role'
import uploadCloud from '../middleware/uploader'

const router = express.Router()

router.get('/', controllers.getBooks)

router.use(verifyToken)
router.use(isCreatorOrAdmin)
router.post('/', uploadCloud.single('image'), controllers.createNewBook)
router.put('/', uploadCloud.single('image'), controllers.updateBook)
router.delete('/', controllers.deleteBook)

module.exports = router
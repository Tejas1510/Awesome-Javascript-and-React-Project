import express from 'express';
import { getData, createResource, deleteResource, updateResource }from '../controller/controller.js'
const router = express.Router();

const a ="My name is Tejas Tapas"

router.get('/',getData)
router.post('/',createResource)
router.patch('/:id',updateResource)
router.delete('/:id',deleteResource)
export default router
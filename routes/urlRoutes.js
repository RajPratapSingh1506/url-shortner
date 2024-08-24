const express=require('express');
const urlController=require('./../controller/urlController')

const router=express.Router();

router.post('/',urlController.generateNewShortId);
router.get('/analytics/:shortId',urlController.getAnalytics);
router.get('/:shortId',urlController.getRedirectUrl);


module.exports=router;

const express = require('express');
const router = express.Router();
const controller = require('../controller/garbage.controller');

/**
 * @swagger
 * components:
 *      schemas:
 *          Garbage:
 *              type: object
 *              requeird: 
 *                  - type
 *              properties:
 *                  id:
 *                      type: string
 *                      description: the auto generated id
 *                  type:
 *                      type: string
 *                      description: garbage type
 *                  color:
 *                      type: string
 *                      description: garbage color
 *                  location:
 *                       type: object
 *                       description: garbage location in the world
 *                       properties:
 *                           lat:
 *                               type: integer
 *                           lon:
 *                                type: integer
 *                  createdDate:
 *                      type: string
 *                      description: garbage created date
 *                  updatedDate:
 *                      type: string
 *                      description: garbage updated date
 *              example:
 *                  id: d5fE_asz
 *                  type: 1
 *                  color: red
 *                  location: 
 *                      lat: 34.4523
 *                      lon: 33.2153
*/

/**
  * @swagger
  * tags:
  *   name: Garbage
  *   description: The garbag managing API
  */

/**
 * @swagger
 * /garbage:
 *   get:
 *     summary: Returns the list of all the garbages
 *     tags: [Garbage]
 *     responses:
 *       200:
 *         description: The list of the garbages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Garbage'
 */
router.get('/', controller.get);
router.get('/:id', controller.findOne);

/**
 * @swagger
 * /garbage:
 *   post:
 *     summary: Create a new garbage
 *     tags: [Garbage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Garbage'
 *     responses:
 *       201:
 *         description: The garbage was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Garbage'
 *       500:
 *         description: Some server error
 */
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/:id/location', controller.updateLocation);
router.delete('/:id', controller.remove);

router.post('/:id/collect', controller.collect);
router.put('/:id/collectedDate', controller.updateCollectedDate);
router.get('/:id/collections', controller.getCollections);
router.get('/:id/latest-collect', controller.getLatestCollect);

module.exports = router;
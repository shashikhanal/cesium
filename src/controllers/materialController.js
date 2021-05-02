import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import { materialService } from '../dependencies/materialDependency.js';

const router = Router();

/**
 * Read materials
 */
router.get('/:id/materials', async (req, res, next) => {
  try {
    const constructionSiteId = req.params.id;
    const response = await materialService.getMaterials(constructionSiteId);

    if (response) {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: true,
        message: `Materials successfully received for site, ${constructionSiteId} !`,
        count: response.length,
        total_cost: response.total_cost,
        data: response.data
      });
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Please, try again!'
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Create materials
 */
router.post('/:id/materials', async (req, res, next) => {
  try {
    const response = await materialService.saveMaterials(req.body);

    if (response) {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: true,
        message: `Materials successfully saved for the site, ${req.params.id} !`,
        count: response.rowCount
      });
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Please, try again!'
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Update materials
 */
router.put('/:id/materials', async (req, res, next) => {
  try {
    const response = await materialService.updateMaterials(req.body);

    if (response) {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: true,
        message: `Materials successfully updated!`
      });
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Please, try again!'
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Delete materials
 */
router.delete('/:id/materials/:materialIds', async (req, res, next) => {
  try {
    const materialIds = JSON.parse(req.params.materialIds);
    const response = await materialService.deleteMaterials(materialIds);

    if (response) {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: true,
        message: `Materials successfully deleted for ids: ${JSON.stringify(materialIds)}!`,
        count: response
      });
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Please, try again!'
    });
  } catch (err) {
    next(err);
  }
});

export default router;
